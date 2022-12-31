// pages/api/project/[id]/message/all.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiResponse } from "next/types";
import prisma from "../../../../../lib/prisma";
import { sessionOptions } from "../../../../../lib/session";

export default withIronSessionApiRoute(
  async (
    req,
    res: NextApiResponse<{
      message: string;
      found: boolean;
      allowed: boolean;
      messages: Message[] | null;
    }>
  ) => {
    if (req.query["id"] === undefined)
      return res.json({
        found: true,
        allowed: false,
        message: "No id provided.",
        messages: null,
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
        messages: null,
      });
    else {
      const { messages } = project;
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
            messages: null,
          });
      } else {
        if (project.isPrivate)
          res.json({
            allowed: false,
            found: false,
            message: "No project found.",
            messages: null,
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
