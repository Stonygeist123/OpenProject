// pages/api/recents/[username].ts

import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiResponse } from "next/types";
import prisma from "../../../lib/prisma";
import { sessionOptions } from "../../../lib/session";

export default withIronSessionApiRoute(
  async (
    req,
    res: NextApiResponse<{
      [key in "projects" | "communities" | "tasks" | "user"]: {
        name: string;
        description: string;
        url: string;
        date: string;
      }[];
    }>
  ) => {
    if (req.query["username"] === undefined)
      return res.json({
        projects: [],
        communities: [],
        tasks: [],
        user: [],
      });

    const user = await prisma.user.findFirst({
      where: { name: req.query["username"] as string },
      include: { communities: true, projects: true },
    });

    if (user === null)
      res.json({
        projects: [],
        communities: [],
        tasks: [],
        user: [],
      });
    else {
      const ps = await prisma.project.findMany({
        where: {
          OR: [
            { owner: user.name },
            {
              contributors: {
                some: {
                  name: user.name,
                },
              },
            },
          ],
        },
        include: {
          tasks: true,
        },
      });

      const { communities: cs } = user;
      const communities: {
        name: string;
        description: string;
        url: string;
        date: string;
      }[] = cs.map(c => ({
        name: `Community ${c.owner === user.name ? "creation" : "contribution"}`,
        description: `${user.name} ${c.owner === user.name ? "created" : "contributed to"} project "${c.name}"`,
        url: `/community/${c.name}`,
        date: c.created_at.toLocaleString(),
      }));

      const projects: {
        name: string;
        description: string;
        url: string;
        date: string;
      }[] = ps.map(p => ({
        name: `Project ${p.owner === user.name ? "creation" : "contribution"}`,
        description: `${user.name} ${p.owner === user.name ? "created" : "contributed to"} project "${p.name}"`,
        url: `/project/${p.id}`,
        date: p.created_at.toLocaleString(),
      }));

      const tasks: {
        name: string;
        description: string;
        url: string;
        date: string;
      }[] = ps
        .map(p => p.tasks)
        .map(ts =>
          ts.map(t => ({
            name: t.name,
            description: t.description,
            url: `project/${t.projectId}`,
            date: t.created_at.toLocaleString(),
          }))
        )
        .flat();

      // yes, like desc, name etc.
      // brb need to eat ok
      // u can try to get the user changes profile chagnes? ok
      // I think we need a last_updated property in description, name and other properties for a user to implement this.
      // Feels like it may affect other code in the frontend too
      // should we skip it for now?
      // brb
      // user.description.

      if (req.session.user) {
        const user = await prisma.user.findFirst({
          where: { token: req.session.user?.token as string },
        });

        if (user && (project.owner == user.name || project.contributors.some(u => u.name == user.name)))
          res.json({
            projects,
            communities,
            tasks,
            user,
          });
        else if (!project.isPrivate)
          res.json({
            allowed: false,
            found: true,
            message: "Access permitted.",
            messages,
          });
        else
          res.json({
            found: true,
            allowed: false,
            message: "No project found.",
            messages: null,
          });
      } else {
        if (project.isPrivate)
          res.json({
            allowed: false,
            found: false,
            message: "No project found.",
            messages: null,
          });
        else
          res.json({
            allowed: false,
            found: true,
            message: "Access permitted.",
            messages,
          });
      }
    }
  },
  sessionOptions
);
