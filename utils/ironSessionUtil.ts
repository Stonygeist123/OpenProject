import type { IronSessionOptions } from "iron-session";


type User = {
    id: number,
    admin: boolean,
}
declare module "iron-session" {
    interface IronSessionData {
        user?: User;
    }
}

export const sessionOptions: IronSessionOptions = {
    password: process.env['SECRET_COOKIE_PASSWORD'] as string,
    cookieName: "iron-session/examples/next.js",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
    interface IronSessionData {
        user?: User;
    }
}