// pages/api/logout.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../utils/ironSessionUtil";

export default withIronSessionApiRoute(
    function logoutRoute(req, res, session) {
        req.session.destroy();
        res.send({ ok: true });
    },
    sessionOptions,
);