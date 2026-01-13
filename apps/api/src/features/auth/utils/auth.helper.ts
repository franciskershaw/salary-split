import { Context } from "hono";
import { setCookie } from "hono/cookie";
import { ContentfulStatusCode } from "hono/utils/http-status";

import {
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_OPTIONS,
} from "../../../core/utils/constants";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../core/utils/jwt";
import { IUser } from "../../users/model/user.model";

const sendTokensAndUser = async (
  c: Context,
  user: IUser,
  status: ContentfulStatusCode = 200
) => {
  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  setCookie(
    c,
    REFRESH_TOKEN_COOKIE_NAME,
    refreshToken,
    REFRESH_TOKEN_COOKIE_OPTIONS
  );

  return c.json({ ...user, accessToken }, status);
};

export { sendTokensAndUser };
