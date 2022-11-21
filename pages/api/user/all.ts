// pages/api/user/all.ts

import { withIronSessionApiRoute } from "iron-session/next";
import prisma from "../../../lib/prisma";
import { sessionOptions } from "../../../lib/session";
import { exclude } from "../../../utils/utils";

export default withIronSessionApiRoute(async (_, res) => {
  const users = await prisma.user.findMany({
    include: { communities: true, projects: true, task_submissions: true },
  });

  const res_users = [];
  for (const user of users) {
    const u = exclude<typeof users[0], "token">(user);
    u.projects = u.projects.filter(p => !p.isPrivate);
    res_users.push(u);
  }

  res.json(res_users);
}, sessionOptions);
