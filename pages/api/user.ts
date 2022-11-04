import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../utils/ironSessionUtil";

export default withIronSessionApiRoute(
    function userRoute(req, res) {
        res.send({ user: req.session.user });
    },
    sessionOptions,
);