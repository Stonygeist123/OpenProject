// pages/api/project/[id]/message/threads.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiResponse } from "next/types";
import fetchJson from "../../../../../lib/fetchJson";
import prisma from "../../../../../lib/prisma";
import { sessionOptions } from "../../../../../lib/session";

export default withIronSessionApiRoute(
  async (
    req,
    res: NextApiResponse<{
      message: string;
      found: boolean;
      allowed: boolean;
      threads: Thread<true>[];
    }>
  ) => {
    if (req.query["id"] === undefined)
      return res.json({
        found: true,
        allowed: false,
        message: "No id provided.",
        threads: [],
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
        threads: [],
      });
    else {
      const messages = await prisma.message.findMany({ where: { projectId: project.id, replyID: null }, include: { author: true, project: true } });
      const getThreads = async (msg: Omit<Msg, "community">): Promise<Thread<true>> => {
        let thread: Thread<true>;
        const { messages: msgs } = await fetchJson<{
          message: string;
          found: boolean;
          allowed: boolean;
          messages: Omit<Msg, "community">[];
        }>(`/api/message/${msg.id}/replies`);

        const replies: Thread<true>[] = [];
        for (const r of msgs) replies.push(await getThreads(r));
        thread = {
          top: msg,
          replies,
        };

        return thread;
      };

      const threads: Thread<true>[] = [];
      for (const msg of messages) threads.push(await getThreads(msg));

      if (req.session.user) {
        const user = await prisma.user.findFirst({
          where: { token: req.session.user?.token as string },
        });

        if (user && (project.owner == user.name || project.contributors.some(u => u.name == user.name)))
          res.json({
            allowed: true,
            found: true,
            message: "Full access permitted.",
            threads,
          });
        else if (!project.isPrivate)
          res.json({
            allowed: false,
            found: true,
            message: "Access permitted.",
            threads,
          });
        else
          res.json({
            found: true,
            allowed: false,
            message: "No project found.",
            threads: [],
          });
      } else {
        if (project.isPrivate)
          res.json({
            allowed: false,
            found: false,
            message: "No project found.",
            threads: [],
          });
        else
          res.json({
            allowed: false,
            found: true,
            message: "Access permitted.",
            threads,
          });
      }
    }
  },
  sessionOptions
);
