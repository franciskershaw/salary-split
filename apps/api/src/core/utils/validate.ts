import { zValidator } from "@hono/zod-validator";

export const validate = (
  target: "json" | "query" | "param",
  schema: any // Accept any Zod schema - zValidator handles the validation
) => {
  return zValidator(target, schema, (result) => {
    if (!result.success) {
      throw result.error;
    }
  });
};
