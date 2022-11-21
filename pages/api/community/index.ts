// pages/api/community/index.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiResponse } from "next/types";
import prisma from "../../../lib/prisma";
import { sessionOptions } from "../../../lib/session";

export default withIronSessionApiRoute(
  async (
    req,
    res: NextApiResponse<{
      message: string;
      found: boolean;
      admin: boolean;
      community: Community | null;
    }>
  ) => {
    if (req.query["name"] === undefined)
      return res.json({
        found: false,
        admin: false,
        message: "No name provided.",
        community: null,
      });
    else {
      const community = await prisma.community.findFirst({
        where: { name: req.query["name"] as string },
        include: { subscribers: true, projects: true },
      });

      if (community === null)
        res.json({
          found: true,
          admin: false,
          message: "No community found.",
          community: null,
        });
      else {
        if (req.session.user) {
          const user = await prisma.user.findFirst({
            where: { token: req.session.user?.token as string },
          });
          if (user && (community.owner == user.name || community.subscribers.some(u => u.name == user.name)))
            res.json({
              admin: true,
              found: true,
              message: "Access permitted.",
              community,
            });
          else {
            community.projects = community.projects.filter(p => !p.isPrivate);
            res.json({
              admin: false,
              found: true,
              message: "Access permitted.",
              community,
            });
          }
        } else {
          community.projects = community.projects.filter(p => !p.isPrivate);
          res.json({
            admin: false,
            found: true,
            message: "Access permitted.",
            community,
          });
        }
      }
    }
  },
  sessionOptions
);
