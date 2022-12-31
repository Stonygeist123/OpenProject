// pages/api/project/[id]/message/top_level.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiResponse } from "next/types";
import prisma from "../../../../../lib/prisma";
import { sessionOptions } from "../../../../../lib/session";

export default withIronSessionApiRoute(
  async (
    req,
    res: NextApiResponse<{
      allowed: boolean;
      found: boolean;
      message: string;
      messages: Omit<Msg, "community">[];
    }>
  ) => {
    if (req.query["id"] === undefined)
      return res.json({
        found: true,
        allowed: false,
        message: "No id provided.",
        messages: [],
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
        messages: [],
      });
    else {
      const messages = await prisma.message.findMany({
        where: { projectId: project.id, replyID: null },
        include: { author: true, project: true },
      });

      if (req.session.user) {
        const user = await prisma.user.findFirst({
          where: { token: req.session.user?.token as string },
        });

        if (user && (project.owner == user.name || project.contributors.some(u => u.name == user.name)))
          res.json({
            allowed: true,
            found: true,
            message: "Full access permitted.",
            messages,
          });
        else if (!project.isPrivate)
          res.json({
            allowed: false,
            found: true,
            message: "Access permitted.",
            messages,
          });
        else
          res.json({
            found: true,
            allowed: false,
            message: "No project found.",
            messages: [],
          });
      } else {
        if (project.isPrivate)
          res.json({
            allowed: false,
            found: false,
            message: "No project found.",
            messages: [],
          });
        else
          res.json({
            allowed: false,
            found: true,
            message: "Access permitted.",
            messages,
          });
      }
    }
  },
  sessionOptions
);
