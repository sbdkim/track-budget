function sortByDateDescending(left, right) {
  return new Date(right.date) - new Date(left.date)
}

export function getVisibleTransactions(transactions, filters) {
  return [...transactions]
    .filter((transaction) => {
      if (filters.type !== 'all' && transaction.type !== filters.type) {
        return false
      }

      if (filters.category !== 'all' && transaction.category !== filters.category) {
        return false
      }

      if (filters.month && !transaction.date.startsWith(filters.month)) {
        return false
      }

      return true
    })
    .sort(sortByDateDescending)
}

export function calculateSummary(transactions) {
  return transactions.reduce(
    (summary, transaction) => {
      if (transaction.type === 'income') {
        summary.income += transaction.amount
      } else {
        summary.expenses += transaction.amount
      }

      summary.balance = summary.income - summary.expenses
      return summary
    },
    { income: 0, expenses: 0, balance: 0 },
  )
}

export function groupExpensesByCategory(transactions) {
  const totals = transactions.reduce((categoryMap, transaction) => {
    if (transaction.type !== 'expense') {
      return categoryMap
    }

    categoryMap[transaction.category] =
      (categoryMap[transaction.category] ?? 0) + transaction.amount

    return categoryMap
  }, {})

  return Object.entries(totals)
    .map(([name, value]) => ({ name, value }))
    .sort((left, right) => right.value - left.value)
}

export function buildMonthlySummary(transactions) {
  const monthlyMap = transactions.reduce((summaryMap, transaction) => {
    const monthLabel = transaction.date.slice(0, 7)

    if (!summaryMap[monthLabel]) {
      summaryMap[monthLabel] = {
        month: monthLabel,
        income: 0,
        expenses: 0,
      }
    }

    if (transaction.type === 'income') {
      summaryMap[monthLabel].income += transaction.amount
    } else {
      summaryMap[monthLabel].expenses += transaction.amount
    }

    return summaryMap
  }, {})

  return Object.values(monthlyMap).sort((left, right) =>
    left.month.localeCompare(right.month),
  )
}

export function getTopExpenseCategory(categoryBreakdown) {
  if (categoryBreakdown.length === 0) {
    return 'No expense data yet'
  }

  return categoryBreakdown[0].name
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value)
}
