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
      allowed: boolean;
      found: boolean;
      project: Project | null;
      message: string;
    }>
  ) => {
    let { name, description, isPrivate }: { name?: string; description?: string; isPrivate?: boolean } = req.body;
    if (!req.session.user)
      res.json({
        allowed: false,
        found: false,
        project: null,
        message: "User needs to be logged in.",
      });
    else {
      if (name === undefined || name.trim().length == 0)
        res.json({
          allowed: false,
          found: false,
          project: null,
          message: "No name provided.",
        });
      else {
        const project = await prisma.project.findFirst({
          where: { name: name as string },
        });

        if (project)
          res.json({
            allowed: false,
            found: true,
            project: null,
            message: `Project "${name}" already exists.`,
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
              found: false,
              project: res_project,
              message: `Successfully created project "${name}".`,
            });
          } else
            res.json({
              allowed: false,
              found: false,
              project: null,
              message: "User needs to be logged in.",
            });
        }
      }
    }
  },
  sessionOptions
);
