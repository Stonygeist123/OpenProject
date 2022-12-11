// pages/api/message/[id]/replies.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiResponse } from "next/types";
import prisma from "../../../../lib/prisma";
import { sessionOptions } from "../../../../lib/session";

export default withIronSessionApiRoute(
  async (
    req,
    res: NextApiResponse<{
      message: string;
      found: boolean;
      allowed: boolean;
      messages: Msg[];
    }>
  ) => {
    if (req.query["id"] === undefined)
      return res.json({
        found: true,
        allowed: false,
        message: "No id provided.",
        messages: [],
      });

    const msg = await prisma.message.findFirst({
      where: { id: parseInt(req.query["id"] as string) },
      select: { projectId: true },
    });

    if (msg === null)
      return res.json({
        found: false,
        allowed: false,
        message: "No message found which could be replied to.",
        messages: [],
      });

    const messages = await prisma.message.findMany({
      where: { replyID: parseInt(req.query["id"] as string) },
      include: { author: true, community: true, project: true },
    });

    if (messages.length === 0)
      res.json({
        found: false,
        allowed: false,
        message: "No message found which have replied to provided message.",
        messages: [],
      });
    else {
      if (msg.projectId !== null) {
        const project = await prisma.project.findUnique({
          where: { id: msg.projectId },
          select: { isPrivate: true, contributors: true, owner: true },
        });

        if (project?.isPrivate) {
          if (
            req.session.user &&
            (project.owner == req.session.user.username || project.contributors.some(u => u.name === req.session.user!.username))
          )
            return res.json({
              allowed: true,
              found: true,
              message: "Access permitted.",
              messages,
            });

          res.json({
            allowed: false,
            found: true,
            message: "No permission to read these messages.",
            messages: [],
          });
        }
      }

      return res.json({
        allowed: true,
        found: true,
        message: "Access permitted.",
        messages,
      });
    }
  },
  sessionOptions
);
