/**
 * Calculate the next due date based on the dueDate number (1-31)
 */
export const getNextDueDate = (dueDate: string | number): Date => {
  const dueDateNum = typeof dueDate === "string" ? parseInt(dueDate) : dueDate;
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // Handle "last day of month" case
  if (dueDateNum === 31) {
    const nextMonth = new Date(currentYear, currentMonth + 1, 0); // Last day of current month
    if (nextMonth.getDate() >= today.getDate()) {
      return nextMonth;
    } else {
      return new Date(currentYear, currentMonth + 2, 0); // Last day of next month
    }
  }

  // Handle specific day of month
  let nextDue = new Date(currentYear, currentMonth, dueDateNum);

  // If the due date has passed this month, move to next month
  if (nextDue < today) {
    nextDue = new Date(currentYear, currentMonth + 1, dueDateNum);
  }

  return nextDue;
};

/**
 * Get status information including text and styling based on days until due
 */
export const getStatusInfo = (
  dueDate: string | number
): { text: string; className: string } => {
  const nextDue = getNextDueDate(dueDate);
  const today = new Date();
  const diffTime = nextDue.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return {
      text: "Due Today",
      className:
        "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    };
  } else if (diffDays === 1) {
    return {
      text: "Due Tomorrow",
      className:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
    };
  } else if (diffDays <= 7) {
    return {
      text: `${diffDays} days left`,
      className:
        "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
    };
  } else {
    return {
      text: `${diffDays} days left`,
      className:
        "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    };
  }
};

/**
 * Format due date display with proper ordinal suffixes
 */
export const getDueDateDisplay = (dueDate: string | number): string => {
  const dueDateNum = typeof dueDate === "string" ? parseInt(dueDate) : dueDate;

  if (dueDateNum === 31) {
    return "Last day of month";
  }

  const suffix =
    dueDateNum === 1 || dueDateNum === 21 || dueDateNum === 31
      ? "st"
      : dueDateNum === 2 || dueDateNum === 22
        ? "nd"
        : dueDateNum === 3 || dueDateNum === 23
          ? "rd"
          : "th";

  return `${dueDateNum}${suffix} of month`;
};
