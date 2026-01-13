import { Context, Next } from "hono";

import { UnauthorizedError } from "../utils/errors";
import { verifyAccessToken } from "../utils/jwt";

export const authenticate = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    throw new UnauthorizedError("No token provided", "TOKEN_MISSING");
  }

  const decoded = await verifyAccessToken(token);

  if (!decoded) {
    throw new UnauthorizedError(
      "Invalid or expired access token",
      "INVALID_ACCESS_TOKEN"
    );
  }

  c.set("user", decoded);

  await next();
};
