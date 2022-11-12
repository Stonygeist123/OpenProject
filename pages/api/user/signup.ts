// pages/api/user/signup.ts

import { withIronSessionApiRoute } from "iron-session/next";
import prisma from "../../../lib/prisma";
import { sessionOptions } from "../../../lib/session";
import bcrypt from "bcrypt";
import { exclude } from "../../../utils/utils";
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
      user: Omit<Omit<User, "token">, "password"> | null;
      message: string;
      allowed: boolean;
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
      });

    const { username, password }: { username: string; password: string } = req.body;
    let user = await prisma.user.findFirst({
      where: { name: username },
    });

    try {
      if (user !== null)
        return res.json({
          user: exclude<Omit<User, "token">, "password">(exclude<User, "token">(user)),
          allowed: false,
          message: `The name "${username}" already exists.`,
        });

      user = await prisma.user.create({
        include: { communities: true, projects: true, task_submissions: true },
        data: {
          name: username,
          password: bcrypt.hashSync(password, 15),
          image: "",
          communities: {},
          projects: {},
          task_submissions: {},
          token: await bcrypt.hash(password, 20),
        },
      });

      req.session.user = {
        username,
        token: user.token,
        isLoggedIn: true,
      };
      await req.session.save();
      res.json({
        user: exclude<Omit<User, "token">, "password">(exclude<User, "token">(user)),
        allowed: true,
        message: `The name "${username}" already exists.`,
      });
    } catch (e) {
      console.error((e as Error).message);
      res.json({ user: null, allowed: false, message: (e as Error).message });
    }
  },
  sessionOptions
);
