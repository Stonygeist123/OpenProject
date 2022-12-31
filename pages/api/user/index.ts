// pages/api/user/index.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiResponse } from "next/types";
import prisma from "../../../lib/prisma";
import { sessionOptions } from "../../../lib/session";
import bcrypt from "bcrypt";
import { exclude } from "../../../utils/utils";
import { Community, Project, TaskSubmission } from "../../../prisma/client";

type ResUser = {
  communities: Community[];
  task_submissions: TaskSubmission[];
  image: string;
  name: string;
  created_at: Date;
};

export default withIronSessionApiRoute(
  async (
    req,
    res: NextApiResponse<{
      message: string;
      allowed: boolean;
      found: boolean;
      user:
        | (ResUser & {
            projects: Project[];
          })
        | null;
    }>
  ) => {
    if (req.query["username"] === undefined) {
      if (req.session.user) {
        const { username: name }: { username: string } = req.session.user;
        req.query["username"] = name;

        const user = await prisma.user.findFirst({
          where: { name },
          select: {
            communities: true,
            task_submissions: true,
            image: true,
            name: true,
            created_at: true,
            token: true,
          },
        });

        if (!user)
          return res.json({
            allowed: false,
            found: false,
            message: "User not found.",
            user: null,
          });

        const projects = await prisma.project.findMany({
          where: { OR: [{ owner: name }, { contributors: { some: { name: name } } }] },
          include: { contributors: true, community: true, messages: true, tasks: true },
        });

        if (req.session.user.token === user?.token)
          return res.json({
            allowed: true,
            found: true,
            message: "Full access permitted.",
            user: { ...exclude<ResUser & { token: string }, "token">(user), projects },
          });
      } else
        return res.json({
          allowed: false,
          found: false,
          message: "No username provided.",
          user: null,
        });
    }

    if (req.query["username"] !== undefined) {
      const user = await prisma.user.findFirst({
        where: { name: req.query["username"] as string },
        select: { communities: true, task_submissions: true, image: true, name: true, created_at: true, password: true },
      });

      if (user === null)
        res.json({
          allowed: false,
          found: false,
          message: "User not found.",
          user: null,
        });
      else {
        const projects = await prisma.project.findMany({
          where: { OR: [{ owner: user.name }, { contributors: { some: { name: user.name } } }] },
          include: { contributors: true, community: true, messages: true, tasks: true },
        });

        if (req.session.user && user && bcrypt.compareSync(req.query["password"] as string, user.password))
          return res.json({
            allowed: true,
            found: true,
            message: "Full access permitted.",
            user: { ...exclude<ResUser & { password: string }, "password">(user), projects },
          });
        else {
          res.json({
            allowed: false,
            found: true,
            message: "Full access denied.",
            user: { ...exclude<ResUser & { password: string }, "password">(user), projects },
          });
        }
      }
    }
  },
  sessionOptions
);
