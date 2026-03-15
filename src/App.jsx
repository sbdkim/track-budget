import { Suspense, lazy, useEffect, useState } from 'react'
import './App.css'
import { expenseCategories, incomeCategories, storageKey } from './constants'
import SummaryCards from './components/SummaryCards'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import {
  buildMonthlySummary,
  calculateSummary,
  getTopExpenseCategory,
  getVisibleTransactions,
  groupExpensesByCategory,
} from './utils/transactions'
import { loadTransactions, saveTransactions } from './utils/storage'

const ChartsSection = lazy(() => import('./components/ChartsSection'))

const emptyFilters = {
  type: 'all',
  category: 'all',
  month: '',
}

function App() {
  const [transactions, setTransactions] = useState(() => loadTransactions())
  const [filters, setFilters] = useState(emptyFilters)
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    saveTransactions(transactions)
  }, [transactions])

  const categoriesByType = {
    expense: expenseCategories,
    income: incomeCategories,
  }

  const editingTransaction = transactions.find(
    (transaction) => transaction.id === editingId,
  )

  const visibleTransactions = getVisibleTransactions(transactions, filters)
  const summary = calculateSummary(visibleTransactions)
  const categoryBreakdown = groupExpensesByCategory(visibleTransactions)
  const monthlySummary = buildMonthlySummary(visibleTransactions)
  const topCategory = getTopExpenseCategory(categoryBreakdown)

  const availableCategories = Array.from(
    new Set(
      transactions
        .filter((transaction) => filters.type === 'all' || transaction.type === filters.type)
        .map((transaction) => transaction.category),
    ),
  ).sort((left, right) => left.localeCompare(right))

  const handleSaveTransaction = (transactionInput) => {
    if (editingTransaction) {
      setTransactions((currentTransactions) =>
        currentTransactions.map((transaction) =>
          transaction.id === editingTransaction.id
            ? { ...transaction, ...transactionInput }
            : transaction,
        ),
      )
      setEditingId(null)
      return
    }

    const newTransaction = {
      ...transactionInput,
      id: crypto.randomUUID(),
    }

    setTransactions((currentTransactions) => [
      newTransaction,
      ...currentTransactions,
    ])
  }

  const handleDeleteTransaction = (transactionId) => {
    setTransactions((currentTransactions) =>
      currentTransactions.filter((transaction) => transaction.id !== transactionId),
    )

    if (editingId === transactionId) {
      setEditingId(null)
    }
  }

  return (
    <div className="app-shell">
      <header className="hero-panel">
        <div>
          <p className="eyebrow">Northline Finance</p>
          <h1>Track Budget</h1>
          <p className="hero-copy">
            Track income and expenses, review your spending habits, and keep a
            clear monthly money snapshot right in the browser.
          </p>
        </div>
        <div className="hero-note">
          <p className="hero-note-label">Local-first</p>
          <strong>{storageKey}</strong>
          <p>Your data stays in this browser using local storage.</p>
        </div>
      </header>

      <SummaryCards
        summary={summary}
        transactionCount={visibleTransactions.length}
        totalCount={transactions.length}
        topCategory={topCategory}
        hasFilters={filters.type !== 'all' || filters.category !== 'all' || filters.month}
      />

      <main className="main-grid">
        <div className="left-column">
          <TransactionForm
            key={editingId ?? 'new'}
            editingTransaction={editingTransaction}
            categoriesByType={categoriesByType}
            onSave={handleSaveTransaction}
            onCancelEdit={() => setEditingId(null)}
          />

          <Suspense
            fallback={
              <section className="panel empty-panel">
                <div className="section-heading">
                  <div>
                    <p className="section-label">Charts</p>
                    <h2>Loading charts</h2>
                  </div>
                </div>
                <div className="empty-state-card" role="status" aria-live="polite">
                  <p className="empty-title">Preparing visual summaries</p>
                  <p className="empty-copy">
                    Loading charts and category insights for the current transaction view.
                  </p>
                </div>
              </section>
            }
          >
            <ChartsSection
              categoryBreakdown={categoryBreakdown}
              monthlySummary={monthlySummary}
              hasTransactions={transactions.length > 0}
              hasVisibleTransactions={visibleTransactions.length > 0}
            />
          </Suspense>
        </div>

        <TransactionList
          transactions={visibleTransactions}
          allTransactions={transactions}
          filters={filters}
          availableCategories={availableCategories}
          onFilterChange={setFilters}
          onResetFilters={() => setFilters(emptyFilters)}
          onEdit={setEditingId}
          onDelete={handleDeleteTransaction}
        />
      </main>
    </div>
  )
}

export default App
