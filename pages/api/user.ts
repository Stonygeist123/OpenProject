// pages/api/user.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiResponse } from "next/types";
import prisma from "../../lib/prisma";
import { sessionOptions } from "../../lib/session";
import bcrypt from "bcrypt";
import { exclude } from "../../utils/utils";
import { Community, Project, TaskSubmission } from "../../prisma/client";

export default withIronSessionApiRoute(
  async (
    req,
    res: NextApiResponse<{
      message: string;
      allowed: boolean;
      found: boolean;
      user_model:
        | Omit<User, "token">
        | Omit<
            User & {
              projects: Project[];
              communities: Community[];
              task_submissions: TaskSubmission[];
            },
            "token"
          >
        | null;
    }>
  ) => {
    if (req.query["username"] === undefined)
      return res.json({
        allowed: false,
        found: false,
        message: "No username provided.",
        user_model: null,
      });
    else {
      const user = await prisma.user.findFirst({
        where: { name: req.query["username"] as string },
        include: { projects: true, communities: true, task_submissions: true },
      });

      if (user === null)
        res.json({
          allowed: true,
          found: true,
          message: "Full access permitted.",
          user_model: null,
        });
      else {
        if (req.session.user && user && bcrypt.compareSync(req.query["password"] as string, user.password))
          return res.json({
            allowed: true,
            found: true,
            message: "Full access permitted.",
            user_model: exclude<User, "token">(user),
          });
        else {
          const res_user = exclude<
            User & {
              projects: Project[];
              communities: Community[];
              task_submissions: TaskSubmission[];
            },
            "token"
          >(user);

          for (let i = 0; i < res_user.projects.length; ++i) if (user.projects[i].is_private) delete user.projects[i];

          res.json({
            user_model: res_user,
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
