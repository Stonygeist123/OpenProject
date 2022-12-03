// pages/api/user/index.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiResponse } from "next/types";
import prisma from "../../../lib/prisma";
import { sessionOptions } from "../../../lib/session";
import bcrypt from "bcrypt";
import { exclude } from "../../../utils/utils";
import { Community, Project, TaskSubmission } from "../../../prisma/client";

type ResUser = {
  projects: Project[];
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
      user: ResUser | null;
    }>
  ) => {
    if (req.query["username"] === undefined) {
      if (req.session.user) {
        req.query["username"] = req.session.user.username;
        req.query["password"] = "";
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
        select: { projects: true, communities: true, task_submissions: true, image: true, name: true, created_at: true, password: true },
      });

      if (user === null)
        res.json({
          allowed: false,
          found: false,
          message: "User not found.",
          user: null,
        });
      else {
        if (req.session.user && user && bcrypt.compareSync(req.query["password"] as string, user.password))
          return res.json({
            allowed: true,
            found: true,
            message: "Full access permitted.",
            user: exclude<ResUser & { password: string }, "password">(user),
          });
        else {
          res.json({
            user: exclude<ResUser & { password: string }, "password">(user),
            allowed: false,
            found: true,
            message: "Full access denied.",
          });
        }
      }
    }
  },
  sessionOptions
);
