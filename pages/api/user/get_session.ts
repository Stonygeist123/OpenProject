// pages/api/user/get_session.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";

export default withIronSessionApiRoute(async (req, res) => {
  if (req.session.user) res.json({ user: req.session.user });
  else res.json({ user: null });
}, sessionOptions);
