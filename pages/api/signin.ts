import bcrypt from "bcrypt";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  if (
    email === undefined ||
    email === "" ||
    password === "" ||
    password === undefined
  ) {
    return res.send(new Error("Email/Password empty or undefined"));
  }
  let user;
  try {
    user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {
    res.status(401);
    res.json({ error: "Could not find user with provided email" });
    return;
  }
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        time: Date.now(),
      },
      "hello",
      { expiresIn: "8h" }
    );
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("BAMAKO_ACCESS_TOKEN", token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );
    return res.send(user);
  }
};
