// pages/api/message/[id]/history.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiResponse } from "next/types";
import prisma from "../../../../lib/prisma";
import { sessionOptions } from "../../../../lib/session";

const getHistory = async (
  msg: Message & { author: User; community: Community | null; project: Project | null }
): Promise<(Message & { author: User; community: Community | null; project: Project | null })[]> => {
  if (msg.replyID === null) return [msg];
  const reply = await prisma.message.findFirst({
    where: { id: msg.replyID },
    include: { author: true, community: true, project: true },
  });

  if (reply === null) return [];
  return [...(await getHistory(reply)), msg];
};

export default withIronSessionApiRoute(
  async (
    req,
    res: NextApiResponse<{
      message: string;
      found: boolean;
      allowed: boolean;
      history: (Message & { author: User; community: Community | null; project: Project | null })[];
    }>
  ) => {
    if (req.query["id"] === undefined)
      return res.json({
        found: true,
        allowed: false,
        message: "No id provided.",
        history: [],
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
        history: [],
      });
    else {
      if (msg.projectId !== null) {
        const project = await prisma.project.findUnique({
          where: { id: msg.projectId },
          select: { contributors: true, isPrivate: true, owner: true },
        });

        const history = await getHistory(msg);
        if (project?.isPrivate) {
          if (
            req.session.user &&
            (project.owner == req.session.user.username || project.contributors.some(u => u.name === req.session.user!.username))
          )
            return res.json({
              allowed: true,
              found: true,
              message: "Access permitted.",
              history,
            });

          res.json({
            allowed: false,
            found: true,
            message: "No permission to read this message nor the history of it.",
            history: [],
          });
        } else
          res.json({
            allowed: true,
            found: true,
            message: "Access permitted.",
            history,
          });
      }
    }
  },
  sessionOptions
);
