// pages/api/project/[id]/index.ts

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
      admin: boolean;
      messages: Message[] | null;
    }>
  ) => {
    const project = await prisma.project.findFirst({
      where: { id: parseInt(req.query["id"] as string) },
      include: { messages: true, contributors: true },
    });

    if (project === null)
      res.json({
        found: true,
        admin: false,
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
            admin: true,
            found: true,
            message: "Full access permitted.",
            messages,
          });
        else if (!project.isPrivate)
          res.json({
            admin: false,
            found: true,
            message: "Access permitted.",
            messages,
          });
        else
          res.json({
            found: true,
            admin: false,
            message: "No project found.",
            messages: null,
          });
      } else {
        if (project.isPrivate)
          res.json({
            admin: false,
            found: false,
            message: "No project found.",
            messages: null,
          });
        else
          res.json({
            admin: false,
            found: true,
            message: "Access permitted.",
            messages,
          });
      }
    }
  },
  sessionOptions
);
