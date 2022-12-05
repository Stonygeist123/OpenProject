// pages/api/project/create/message.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "../../../../../lib/prisma";
import { sessionOptions } from "../../../../../lib/session";

/*
model Task {
  id            Int      @id @unique @default(autoincrement())
  project       Project  @relation(fields: [projectId], references: [id])
  name          String
  description   String
  prerequisites Json
  files         Json
  created_at    DateTime @default(now())
  projectId     Int
}
*/

export default withIronSessionApiRoute(
  async (
    req: NextApiRequest & {
      body: {
        name: string;
        description: string;
        projectId: number;
        preqs: Array<{ title: string; description: string }>;
      };
    },
    res: NextApiResponse<{
      allowed: boolean;
      found: boolean;
      task: Task | null;
      message: string;
    }>
  ) => {
    let { name, description, projectId, preqs }: { name?: string; description?: string; projectId?: number; preqs?: Array<{ title: string }> } =
      req.body;

    if (!req.session.user)
      res.json({
        allowed: false,
        found: false,
        task: null,
        message: "User needs to be logged in.",
      });
    else {
      if (projectId === undefined)
        return res.json({
          allowed: false,
          found: false,
          task: null,
          message: 'No "projectId" provided.',
        });

      if (name === undefined)
        return res.json({
          allowed: false,
          found: false,
          task: null,
          message: 'No "name" provided.',
        });

      if (description === undefined)
        return res.json({
          allowed: false,
          found: false,
          task: null,
          message: 'No "description" provided.',
        });

      const project = await prisma.project.findFirst({ where: { id: projectId }, include: { tasks: true, contributors: true } });
      if (project === null)
        return res.json({
          allowed: false,
          found: false,
          task: null,
          message: `Could not find project with id ${projectId}.`,
        });

      if (project.owner !== req.session.user.username && !project.contributors.some(c => c.name === req.session.user?.username))
        return res.json({
          allowed: false,
          found: true,
          task: null,
          message: `No permission to create task in project "${project.name}".`,
        });

      let task = await prisma.task.findFirst({ where: { projectId, name }, include: { project: true } });
      if (task)
        return res.json({
          allowed: false,
          found: true,
          task: null,
          message: `Task "${name}" already exists in project "${project.name}".`,
        });

      task = await prisma.task.create({
        data: {
          name,
          description,
          prerequisites: preqs ?? [],
          files: [],
          projectId,
        },
        include: { project: true },
      });

      res.json({
        allowed: true,
        found: false,
        task,
        message: `Successfully created task "${name}" in project "${project.name}" (ID = ${task.id}).`,
      });
    }
  },
  sessionOptions
);
