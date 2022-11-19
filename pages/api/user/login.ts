// pages/api/user/login.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";
import { NextApiResponse } from "next";
import { Project, Community, TaskSubmission } from "../../../prisma/client";
import { exclude } from "../../../utils/utils";

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
      user: UserSession | null;
    }>
  ) => {
    try {
      if (req.body["username"] === undefined || req.body["password"] === undefined)
        return res.json({
          user: { isLoggedIn: false, username: "", token: "" },
          allowed: false,
          found: false,
          message: "No password or username provided.",
          user_model: null,
        });

      const { username, password }: { username: string; password: string } = req.body;
      const user = await prisma.user.findFirst({
        where: { name: username },
      });

      if (user === null)
        return res.json({
          message: "User not found.",
          allowed: false,
          found: false,
          user_model: null,
          user: null,
        });
      else if (!bcrypt.compareSync(password, user.password)) {
        return res.json({
          message: "Access denied.",
          allowed: false,
          found: true,
          user_model: null,
          user: null,
        });
      }

      if (bcrypt.compareSync(password, user.password)) {
        req.session.user = {
          username,
          token: user.token,
          isLoggedIn: true,
        };
        await req.session.save();
        res.json({
          user: req.session.user,
          allowed: true,
          found: true,
          message: "Access permitted.",
          user_model: exclude<User, "token">(user),
        });
      } else
        res.json({
          user: null,
          allowed: false,
          found: true,
          message: "Access denied.",
          user_model: null,
        });
    } catch (e) {
      res.json({
        message: (e as Error).message,
        allowed: false,
        found: false,
        user: null,
        user_model: null,
      });
    }
  },
  sessionOptions
);
