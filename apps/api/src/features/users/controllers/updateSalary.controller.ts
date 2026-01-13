import { Context } from "hono";

import { NotFoundError } from "../../../core/utils/errors";
import User from "../model/user.model";

const updateSalary = async (c: Context) => {
  const userId = c.get("user")._id;

  const { salary } = await c.req.json();

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { takeHomePay: salary },
    { new: true }
  );

  if (!updatedUser) {
    throw new NotFoundError("User not found");
  }

  return c.json(updatedUser, 200);
};

export default updateSalary;
