// pages/api/login.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../utils/ironSessionUtil";


export default withIronSessionApiRoute(
    async function loginRoute(req, res) {
        // get user from database then:
        req.session.user = {
            id: 230,
            admin: true,
        };
        await req.session.save();
        res.send({ ok: true });
    },
    sessionOptions,
);