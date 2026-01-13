import { Hono } from "hono";

import { authenticate } from "../../../../core/middleware/auth.middleware";
import { validateObjectId } from "../../../../core/middleware/validateObjectId.middleware";
import { validate } from "../../../../core/utils/validate";
import updateAmount from "../controllers/updateAmount.controller";
import { updateAmountSchema } from "../validation/updateAmount.validation";

const updateAmountRoutes = new Hono();

updateAmountRoutes.patch(
  "/:feature/:itemId",
  authenticate,
  validateObjectId("itemId"),
  validate("json", updateAmountSchema),
  updateAmount
);

export default updateAmountRoutes;
