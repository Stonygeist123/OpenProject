// pages/api/project/message/create.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "../../../../../lib/prisma";
import { sessionOptions } from "../../../../../lib/session";

export default withIronSessionApiRoute(
  async (
    req: NextApiRequest & {
      body: {
        content: string;
        region: string;
        isProject: boolean;
      };
    },
    res: NextApiResponse<{
      allowed: boolean;
      found: boolean;
      msg: Message | null;
      message: string;
    }>
  ) => {
    let { content, region, isProject }: { content?: string; region?: string; isProject?: boolean } = req.body;
    if (!req.session.user)
      res.json({
        allowed: false,
        found: false,
        msg: null,
        message: "User needs to be logged in.",
      });
    else {
      if (content === undefined || content.trim().length == 0)
        res.json({
          allowed: false,
          found: false,
          msg: null,
          message: "No content provided.",
        });
      else {
        if (region === undefined || isProject === undefined)
          return res.json({
            allowed: false,
            found: false,
            msg: null,
            message: "Expected region and isProject in body.",
          });

        const user = await prisma.user.findFirst({ where: { token: req.session.user.token } });
        if (user) {
          const region_name = (
            isProject
              ? await prisma.project.findFirst({ where: { id: parseInt(region) } })
              : await prisma.community.findFirst({ where: { name: region } })
          )?.name;

          if (region_name === null)
            return res.json({
              allowed: true,
              found: false,
              msg: null,
              message: `Could not find ${isProject ? `project with id "${region_name}"` : `community with name "${region}"`}.`,
            });

          const msg = await prisma.message.create({
            include: { project: true, community: true },
            data: {
              content,
              username: req.session.user.username,
              ...(isProject ? { projectId: parseInt(region) } : { communityName: region }),
            },
          });

          res.json({
            allowed: true,
            found: false,
            msg,
            message: `Successfully created message in ${isProject ? "project" : "community"} "${region_name}".`,
          });
        } else
          res.json({
            allowed: false,
            found: false,
            msg: null,
            message: "User needs to be logged in.",
          });
      }
    }
  },
  sessionOptions
);
