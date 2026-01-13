import { createAddController } from "../../shared/recurring-items/controllers/add.controller";
import { createDeleteController } from "../../shared/recurring-items/controllers/delete.controller";
import { createEditController } from "../../shared/recurring-items/controllers/edit.controller";
import { createGetController } from "../../shared/recurring-items/controllers/get.controller";
import { createReorderController } from "../../shared/reorder/reorder.controller";
import Expense from "../model/expense.model";

const expenseController = {
  addExpense: createAddController(Expense),
  editExpense: createEditController(Expense, "expenseId"),
  deleteExpense: createDeleteController(Expense, "expenseId"),
  getExpenses: createGetController(Expense),
  reorderExpenses: createReorderController(Expense, "expense"),
};

export default expenseController;
