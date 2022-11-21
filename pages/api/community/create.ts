// pages/api/community/create.ts

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
      };
    },
    res: NextApiResponse<{
      message: string;
      allowed: boolean;
      community: Community | null;
    }>
  ) => {
    let { name, description }: { name?: string; description?: string } = req.body;
    if (!req.session.user)
      res.json({
        allowed: false,
        message: "User needs to be logged in.",
        community: null,
      });
    else {
      if (name === undefined || name.trim().length == 0)
        res.json({
          allowed: false,
          message: "No name provided.",
          community: null,
        });
      else {
        const project = await prisma.project.findFirst({
          where: { name: name as string },
        });

        if (project)
          res.json({
            allowed: false,
            message: `Community "${name}" already exists.`,
            community: null,
          });
        else {
          const user = await prisma.user.findFirst({ where: { token: req.session.user.token } });
          if (user) {
            const res_community = await prisma.community.create({
              include: { projects: true, subscribers: true },
              data: {
                name,
                owner: user.name,
                description: description ?? "",
              },
            });

            res.json({
              allowed: true,
              message: `Successfully created community "${name}".`,
              community: res_community,
            });
          } else
            res.json({
              allowed: false,
              message: "User needs to be logged in.",
              community: null,
            });
        }
      }
    }
  },
  sessionOptions
);
