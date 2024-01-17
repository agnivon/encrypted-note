import { NextRequest, NextResponse } from "next/server";
import { corsOptions } from "./config";

export async function middleware(request: NextRequest) {
  if (process.env.NODE_ENV === "test") {
    // Response
    const response = NextResponse.next();

    // Allowed origins check
    const origin = request.headers.get("origin") ?? "";
    if (
      corsOptions.allowedOrigins.includes("*") ||
      corsOptions.allowedOrigins.includes(origin)
    ) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    }

    // Set default CORS headers
    response.headers.set(
      "Access-Control-Allow-Credentials",
      corsOptions.credentials.toString()
    );
    response.headers.set(
      "Access-Control-Allow-Methods",
      corsOptions.allowedMethods.join(",")
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      corsOptions.allowedHeaders.join(",")
    );
    response.headers.set(
      "Access-Control-Expose-Headers",
      corsOptions.exposedHeaders.join(",")
    );
    response.headers.set(
      "Access-Control-Max-Age",
      corsOptions.maxAge?.toString() ?? ""
    );

    // Return
    return response;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:path*",
};
