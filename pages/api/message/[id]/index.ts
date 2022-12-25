// pages/api/message/[id]/index.ts

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
      msg: (Message & { author: User; community: Community | null; project: Project | null }) | null;
    }>
  ) => {
    if (req.query["id"] === undefined)
      return res.json({
        found: true,
        allowed: false,
        message: "No id provided.",
        msg: null,
      });

    const msg = await prisma.message.findFirst({
      where: { id: parseInt(req.query["id"] as string) },
      include: { author: true, community: true, project: true },
    });

    if (msg === null)
      res.json({
        found: false,
        allowed: false,
        message: "No message found.",
        msg: null,
      });
    else {
      if (msg.projectId !== null) {
        const project = await prisma.project.findUnique({
          where: { id: msg.projectId },
          select: { contributors: true, isPrivate: true, owner: true },
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
              msg,
            });

          res.json({
            allowed: false,
            found: true,
            message: "No permission to read this message.",
            msg: null,
          });
        } else
          res.json({
            allowed: true,
            found: true,
            message: "Access permitted.",
            msg,
          });
      }
    }
  },
  sessionOptions
);
