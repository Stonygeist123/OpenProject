import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiResponse } from "next/types";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute((req, res: NextApiResponse<User>) => {
  if (req.session.user)
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  else
    res.json({
      isLoggedIn: false,
      username: "",
      password: "",
    });
}, sessionOptions);
