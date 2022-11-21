// pages/api/project/create.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "../../../lib/prisma";
import { sessionOptions } from "../../../lib/session";

export default withIronSessionApiRoute(
  async (
    req: NextApiRequest & {
      body: {
        name: string;
        description: string;
        isPrivate: boolean;
      };
    },
    res: NextApiResponse<{
      message: string;
      allowed: boolean;
      project: Project | null;
    }>
  ) => {
    let { name, description, isPrivate }: { name?: string; description?: string; isPrivate?: boolean } = req.body;
    if (!req.session.user)
      res.json({
        allowed: false,
        message: "User needs to be logged in.",
        project: null,
      });
    else {
      if (name === undefined || name.trim().length == 0)
        res.json({
          allowed: false,
          message: "No name provided.",
          project: null,
        });
      else {
        const project = await prisma.project.findFirst({
          where: { name: name as string },
        });

        if (project)
          res.json({
            allowed: false,
            message: `Project "${name}" already exists.`,
            project: null,
          });
        else {
          const user = await prisma.user.findFirst({ where: { token: req.session.user.token } });
          if (user) {
            const res_project = await prisma.project.create({
              include: { contributors: true, community: true, tasks: true },
              data: {
                name,
                owner: user.name,
                description: description ?? "",
                isPrivate: isPrivate ?? false,
                image: "",
              },
            });

            res.json({
              allowed: true,
              message: `Successfully created project "${name}".`,
              project: res_project,
            });
          } else
            res.json({
              allowed: false,
              message: "User needs to be logged in.",
              project: null,
            });
        }
      }
    }
  },
  sessionOptions
);
