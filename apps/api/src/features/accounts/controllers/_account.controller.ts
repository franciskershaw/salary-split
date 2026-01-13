import { createReorderController } from "../../shared/reorder/reorder.controller";
import Account from "../model/account.model";
import addAccount from "./addAccount.controller";
import deleteAccount from "./deleteAccount.controller";
import editAccount from "./editAccount.controller";
import getAccounts from "./getAccounts.controller";

export default {
  getAccounts,
  addAccount,
  reorderAccounts: createReorderController(Account, "account"),
  editAccount,
  deleteAccount,
};
