import { formatCurrency } from '../utils/transactions'

function TransactionList({
  transactions,
  allTransactions,
  filters,
  availableCategories,
  onFilterChange,
  onResetFilters,
  onEdit,
  onDelete,
}) {
  const hasTransactions = allTransactions.length > 0

  return (
    <section className="panel list-panel">
      <div className="section-heading">
        <div>
          <p className="section-label">History</p>
          <h2>Transactions</h2>
        </div>
        <button className="ghost-button" onClick={onResetFilters} type="button">
          Reset filters
        </button>
      </div>

      <div className="filters-grid">
        <label>
          Type
          <select
            value={filters.type}
            onChange={(event) =>
              onFilterChange((currentFilters) => ({
                ...currentFilters,
                type: event.target.value,
                category: 'all',
              }))
            }
          >
            <option value="all">All</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>

        <label>
          Category
          <select
            value={filters.category}
            onChange={(event) =>
              onFilterChange((currentFilters) => ({
                ...currentFilters,
                category: event.target.value,
              }))
            }
          >
            <option value="all">All categories</option>
            {availableCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Month
          <input
            type="month"
            value={filters.month}
            onChange={(event) =>
              onFilterChange((currentFilters) => ({
                ...currentFilters,
                month: event.target.value,
              }))
            }
          />
        </label>
      </div>

      {!hasTransactions ? (
        <div className="empty-state-card">
          <p className="empty-title">No transactions yet</p>
          <p className="empty-copy">
            Your transaction history will appear here after you add the first entry.
          </p>
        </div>
      ) : null}

      {hasTransactions && transactions.length === 0 ? (
        <div className="empty-state-card">
          <p className="empty-title">No matching entries</p>
          <p className="empty-copy">
            No transactions match the current filters. Reset the filters to see all entries.
          </p>
        </div>
      ) : null}

      <div className="transaction-list">
        {transactions.map((transaction) => (
          <article className="transaction-row" key={transaction.id}>
            <div>
              <div className="transaction-topline">
                <span className={`pill ${transaction.type}`}>{transaction.type}</span>
                <strong>{transaction.category}</strong>
              </div>
              <p className="transaction-meta">
                {transaction.date}
                {transaction.description ? ` - ${transaction.description}` : ''}
              </p>
            </div>

            <div className="transaction-actions">
              <strong className={transaction.type === 'income' ? 'money-in' : 'money-out'}>
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </strong>
              <div className="action-buttons">
                <button onClick={() => onEdit(transaction.id)} type="button">
                  Edit
                </button>
                <button onClick={() => onDelete(transaction.id)} type="button">
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TransactionList
