// pages/api/user/signup.ts

import { withIronSessionApiRoute } from "iron-session/next";
import prisma from "../../../lib/prisma";
import { sessionOptions } from "../../../lib/session";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(
  async (
    req: NextApiRequest & {
      body: {
        username: string;
        password: string;
      };
    },
    res: NextApiResponse<{
      user: UserSession | null;
      message: string;
      allowed: boolean;
      found: boolean;
    }>
  ) => {
    if (req.body["username"] === undefined || req.body["password"] === undefined)
      return res.json({
        user: null,
        message: `${
          req.body["username"] === undefined && req.body["password"] === undefined
            ? "Username and password"
            : req.body["username"] === undefined
            ? "Username"
            : "Password"
        } is missing.`,
        allowed: false,
        found: false,
      });

    const { username, password }: { username: string; password: string } = req.body;
    let user = await prisma.user.findFirst({
      where: { name: username },
    });

    try {
      if (user !== null)
        return res.json({
          user: null,
          allowed: false,
          found: true,
          message: `A user with the name "${username}" does already exist.`,
        });

      user = await prisma.user.create({
        include: { communities: true, projects: true, task_submissions: true },
        data: {
          name: username,
          password: bcrypt.hashSync(password, 5),
          image: "",
          communities: {},
          projects: {},
          task_submissions: {},
          token: bcrypt.hashSync(password, 6),
        },
      });

      req.session.user = {
        username,
        token: user.token,
        isLoggedIn: true,
      };
      await req.session.save();
      res.json({
        user: req.session.user,
        allowed: true,
        message: `Successfully created user.`,
        found: false,
      });
    } catch (e) {
      console.error((e as Error).message);
      res.json({ user: null, allowed: false, message: (e as Error).message, found: false });
    }
  },
  sessionOptions
);
