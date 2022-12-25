// pages/api/project/[id]/message/threads.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "../../../../../lib/prisma";
import { sessionOptions } from "../../../../../lib/session";

export default withIronSessionApiRoute(
  async (
    req: NextApiRequest & { body: { topID?: number } },
    res: NextApiResponse<{
      message: string;
      found: boolean;
      allowed: boolean;
      thread: Thread<true> | null;
    }>
  ) => {
    if (req.query["id"] === undefined)
      return res.json({
        found: true,
        allowed: false,
        message: "No id provided.",
        thread: null,
      });

    const project = await prisma.project.findFirst({
      where: { id: parseInt(req.query["id"] as string) },
      include: { messages: true, contributors: true },
    });

    if (project === null)
      res.json({
        found: false,
        allowed: false,
        message: "No project found.",
        thread: null,
      });
    else {
      const messages = req.body["topID"]
        ? await prisma.message.findMany({ where: { projectId: project.id, replyID: req.body["topID"] }, include: { author: true, project: true } })
        : await prisma.message.findMany({ where: { projectId: project.id, replyID: null }, include: { author: true, project: true } });

      const topMsg = req.body["topID"]
        ? await prisma.message.findFirst({ where: { projectId: project.id, replyID: req.body["topID"] }, include: { author: true, project: true } })
        : null;
      const thread: Thread<true> = { top: topMsg, replies: messages };

      if (req.session.user) {
        const user = await prisma.user.findFirst({
          where: { token: req.session.user?.token as string },
        });

        if (user && (project.owner == user.name || project.contributors.some(u => u.name == user.name)))
          res.json({
            allowed: true,
            found: true,
            message: "Full access permitted.",
            thread,
          });
        else if (!project.isPrivate)
          res.json({
            allowed: false,
            found: true,
            message: "Access permitted.",
            thread,
          });
        else
          res.json({
            found: true,
            allowed: false,
            message: "No project found.",
            thread: null,
          });
      } else {
        if (project.isPrivate)
          res.json({
            allowed: false,
            found: false,
            message: "No project found.",
            thread: null,
          });
        else
          res.json({
            allowed: false,
            found: true,
            message: "Access permitted.",
            thread,
          });
      }
    }
  },
  sessionOptions
);
