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
        replyID?: number;
      };
    },
    res: NextApiResponse<{
      allowed: boolean;
      found: boolean;
      msg: Message | null;
      message: string;
    }>
  ) => {
    let { content, replyID }: { content?: string; replyID?: number } = req.body;
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
        const idS = req.query["id"] as string | undefined;
        if (idS === undefined)
          return res.json({
            allowed: false,
            found: false,
            msg: null,
            message: "Expected region and isProject in body.",
          });

        const id = parseInt(idS);
        const user = await prisma.user.findFirst({ where: { token: req.session.user.token } });
        if (user) {
          const region_name = (await prisma.project.findFirst({ where: { id } }))?.name;

          if (region_name === null)
            return res.json({
              allowed: false,
              found: false,
              msg: null,
              message: `Could not find project with id "${id}".`,
            });

          if (replyID) {
            console.log(replyID);
            const reply = await prisma.message.findFirst({
              select: { projectId: true },
              where: { id: replyID },
            });

            if (reply === null || reply === null)
              return res.json({
                allowed: false,
                found: false,
                msg: null,
                message: `Could not find message with id "${replyID}" to reply to.`,
              });

            if (!reply.projectId || reply.projectId !== id)
              return res.json({
                allowed: false,
                found: false,
                msg: null,
                message: `The project ids of the replied message and the reply have to match - got "${id}" and "${reply.projectId ?? "none"}"`,
              });

            const msg = await prisma.message.create({
              include: { project: true, community: true },
              data: {
                content,
                username: req.session.user.username,
                projectId: id,
              },
            });

            res.json({
              allowed: true,
              found: false,
              msg,
              message: `Successfully created message in project "${region_name}" (replyID = ${replyID}).`,
            });
          } else {
            const msg = await prisma.message.create({
              include: { project: true, community: true },
              data: {
                content,
                username: req.session.user.username,
                projectId: id,
              },
            });

            res.json({
              allowed: true,
              found: false,
              msg,
              message: `Successfully created message in project "${region_name}".`,
            });
          }
        }
      }
    }
  },
  sessionOptions
);
