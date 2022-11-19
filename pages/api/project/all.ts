// pages/api/project/all.ts

import { withIronSessionApiRoute } from "iron-session/next";
import prisma from "../../../lib/prisma";
import { sessionOptions } from "../../../lib/session";

export default withIronSessionApiRoute(async (_, res) => {
  const projects = await prisma.project.findMany({
    include: { community: true, contributors: true, tasks: true },
  });
  res.json(projects.flatMap(p => (!p.isPrivate ? p : null)));
}, sessionOptions);
