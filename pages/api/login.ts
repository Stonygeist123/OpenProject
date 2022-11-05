// pages/api/login.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(async (req, res) => {
  const { username, password } = req.body;
  try {
    req.session.user = {
      username,
      password,
      isLoggedIn: true,
    };

    await req.session.save();
    res.status(200).json(req.session.user);
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
}, sessionOptions);
