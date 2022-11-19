// pages/api/community/all.ts

import { withIronSessionApiRoute } from "iron-session/next";
import prisma from "../../../lib/prisma";
import { sessionOptions } from "../../../lib/session";

export default withIronSessionApiRoute(
  async (_, res) =>
    res.json(
      await prisma.community.findMany({
        include: { projects: true, subscribers: true },
      })
    ),
  sessionOptions
);
