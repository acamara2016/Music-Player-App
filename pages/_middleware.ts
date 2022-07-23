import { NextResponse } from "next/server";

const protectedRoutes = ["/", "/playlist", "/my-library", "/create-playlist"];

export default function middleware(req) {
  if (protectedRoutes.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.BAMAKO_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.redirect("/signin");
    }
  }
}
