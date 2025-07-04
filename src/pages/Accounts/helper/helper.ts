import type { Account } from "@/types/globalTypes";

type AccountTypeGroup = Record<Account["type"], Account[]>;

/**
 * Groups accounts by their type
 */
export const groupAccountsByType = (accounts: Account[]): AccountTypeGroup => {
  return accounts.reduce((acc, account) => {
    const type = account.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(account);
    return acc;
  }, {} as AccountTypeGroup);
};

/**
 * Creates a summary account for a group of accounts of the same type
 */
export type SummaryAccount = Omit<Account, "_id"> & { id: string };

export const createSummaryAccount = (
  type: Account["type"],
  accounts: Account[],
  label: string
): SummaryAccount => {
  const total = accounts.reduce((sum, acc) => sum + acc.amount, 0);
  const institutions = [
    ...new Set(accounts.map((acc) => acc.institution).filter(Boolean)),
  ];

  return {
    id: `summary-${type}`,
    name: label,
    type,
    institution:
      institutions.slice(0, 2).join(", ") +
      (institutions.length > 2 ? "..." : ""),
    amount: total,
    acceptsFunds: false,
    createdBy: accounts[0].createdBy,
    createdAt: accounts[0].createdAt,
  };
};

/**
 * Transforms grouped accounts into summary accounts
 */
export const createSummaryAccounts = (
  accountsByType: AccountTypeGroup,
  getLabel: (type: Account["type"]) => string
): SummaryAccount[] => {
  return Object.entries(accountsByType).map(([type, accounts]) =>
    createSummaryAccount(
      type as Account["type"],
      accounts,
      getLabel(type as Account["type"])
    )
  );
};

// Check if the item has a mongo id
export function hasMongoId(item: unknown): item is { _id: string } {
  return (
    typeof item === "object" &&
    item !== null &&
    "_id" in item &&
    typeof (item as Record<string, unknown>)._id === "string"
  );
}
