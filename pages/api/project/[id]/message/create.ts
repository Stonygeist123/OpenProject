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
      };
    },
    res: NextApiResponse<{
      allowed: boolean;
      found: boolean;
      msg: Message | null;
      message: string;
    }>
  ) => {
    let { content }: { content?: string; region?: string; isProject?: boolean } = req.body;
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
        const region = req.query["id"] as string | undefined;
        if (region === undefined)
          return res.json({
            allowed: false,
            found: false,
            msg: null,
            message: "Expected region and isProject in body.",
          });

        const user = await prisma.user.findFirst({ where: { token: req.session.user.token } });
        if (user) {
          const region_name = (await prisma.project.findFirst({ where: { id: parseInt(region) } }))?.name;

          if (region_name === null)
            return res.json({
              allowed: false,
              found: false,
              msg: null,
              message: `Could not find project with id "${region}".`,
            });

          const msg = await prisma.message.create({
            include: { project: true, community: true },
            data: {
              content,
              username: req.session.user.username,
              projectId: parseInt(region),
            },
          });

          res.json({
            allowed: true,
            found: false,
            msg,
            message: `Successfully created message in project "${region_name}".`,
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
