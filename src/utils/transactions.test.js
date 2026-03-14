import {
  buildMonthlySummary,
  calculateSummary,
  getVisibleTransactions,
  groupExpensesByCategory,
} from './transactions'

const sampleTransactions = [
  {
    id: '1',
    type: 'income',
    amount: 3200,
    category: 'Salary',
    date: '2026-03-01',
    description: 'Monthly paycheck',
  },
  {
    id: '2',
    type: 'expense',
    amount: 75,
    category: 'Food',
    date: '2026-03-03',
    description: 'Groceries',
  },
  {
    id: '3',
    type: 'expense',
    amount: 40,
    category: 'Transport',
    date: '2026-02-28',
    description: 'Bus card',
  },
]

describe('transaction utilities', () => {
  it('calculates totals from mixed transactions', () => {
    expect(calculateSummary(sampleTransactions)).toEqual({
      income: 3200,
      expenses: 115,
      balance: 3085,
    })
  })

  it('filters transactions by type and month', () => {
    expect(
      getVisibleTransactions(sampleTransactions, {
        type: 'expense',
        category: 'all',
        month: '2026-03',
      }),
    ).toEqual([sampleTransactions[1]])
  })

  it('groups expense totals by category', () => {
    expect(groupExpensesByCategory(sampleTransactions)).toEqual([
      { name: 'Food', value: 75 },
      { name: 'Transport', value: 40 },
    ])
  })

  it('builds monthly income and expense totals', () => {
    expect(buildMonthlySummary(sampleTransactions)).toEqual([
      { month: '2026-02', income: 0, expenses: 40 },
      { month: '2026-03', income: 3200, expenses: 75 },
    ])
  })
})
