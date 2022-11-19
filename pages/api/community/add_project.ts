// pages/api/community/create.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next/types";
import { sessionOptions } from "../../../lib/session";
import prisma from "../../../lib/prisma";

export default withIronSessionApiRoute(
  async (
    req: NextApiRequest & {
      body: {
        name: string;
        community_name: string;
      };
    },
    res: NextApiResponse<{
      message: string;
      allowed: boolean;
      found: boolean;
      project: Project | null;
    }>
  ) => {
    let { name, community_name }: { name?: string; community_name?: string } = req.body;
    if (req.session.user === undefined)
      res.json({
        allowed: false,
        found: false,
        message: "User needs to be logged in.",
        project: null,
      });
    else {
      const user = await prisma.user.findFirst({ where: { token: req.session.user.token } });
      if (user === null)
        return res.json({
          allowed: false,
          found: false,
          message: "User doesn't exist.",
          project: null,
        });
      else {
        if (name === undefined)
          return res.json({
            allowed: false,
            found: false,
            message: "Project name is needed.",
            project: null,
          });

        if (community_name === undefined)
          return res.json({
            allowed: false,
            found: false,
            message: "Community name is needed.",
            project: null,
          });

        const project = await prisma.project.findFirst({ where: { name }, include: { contributors: true } });
        if (project === null)
          return res.json({
            allowed: false,
            found: false,
            message: `Project "${name}" doesn't exist.`,
            project: null,
          });
        else {
          if (project.owner !== user.name && project.contributors.some(c => c.name === user.name))
            return res.json({
              allowed: false,
              found: true,
              message: `User "${user.name}" is neither owner nor contributor of project "${name}".`,
              project: null,
            });
          else {
            const community = await prisma.community.findFirst({ where: { name: community_name }, include: { subscribers: true } });
            if (community && community.subscribers.some(u => u.name !== user.name))
              return res.json({
                allowed: false,
                found: true,
                message: `You do need permission to add project "${name}" to community "${community_name}".`,
                project,
              });
            else {
              return res.json({
                allowed: false,
                found: true,
                message: `Successfully added project "${name}" to community "${community_name}".`,
                project: await prisma.project.update({
                  where: { id: project.id },
                  data: {
                    community_name,
                  },
                }),
              });
            }
          }
        }
      }
    }
  },
  sessionOptions
);
