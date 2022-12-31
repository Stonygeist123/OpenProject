// pages/api/user/index.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiResponse } from "next/types";
import prisma from "../../../lib/prisma";
import { sessionOptions } from "../../../lib/session";
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
    if (req.body["token"] === undefined)
      return res.json({
        allowed: false,
        found: false,
        message: "No token provided.",
        user: null,
      });
    else {
      const user = await prisma.user.findFirst({
        where: { token: req.body["token"] as string },
        select: { projects: true, communities: true, task_submissions: true, image: true, name: true, created_at: true, password: true },
      });

      if (user === null)
        res.json({
          allowed: false,
          found: false,
          message: "User not found.",
          user: null,
        });
      else
        return res.json({
          allowed: true,
          found: true,
          message: "Full access permitted.",
          user: exclude<ResUser & { password: string }, "password">(user),
        });
    }
  },
  sessionOptions
);
