// pages/api/user/account/get_session.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiResponse } from "next";
import { sessionOptions } from "../../../../lib/session";

export default withIronSessionApiRoute(async (req, res: NextApiResponse<{ user: UserSession | null }>) => {
  if (req.session.user) res.json({ user: req.session.user });
  else res.json({ user: null });
}, sessionOptions);
