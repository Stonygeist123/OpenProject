// pages/api/user/logout.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";

export default withIronSessionApiRoute((req, res) => {
  if (req.session.user) {
    const name = req.session.user.username;
    req.session.destroy();
    res.json({ message: `User (${name}) was logged out successfully.` });
  } else res.json({ message: "User wasn't logged in." });
}, sessionOptions);
