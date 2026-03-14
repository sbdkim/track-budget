import { formatCurrency } from '../utils/transactions'

function SummaryCards({
  summary,
  transactionCount,
  totalCount,
  topCategory,
  hasFilters,
}) {
  const cards = [
    { label: 'Income', value: formatCurrency(summary.income), tone: 'income' },
    { label: 'Expenses', value: formatCurrency(summary.expenses), tone: 'expense' },
    { label: 'Net Balance', value: formatCurrency(summary.balance), tone: 'balance' },
    { label: 'Top Spending Category', value: topCategory, tone: 'neutral' },
  ]

  return (
    <section className="summary-grid" aria-label="Budget summary">
      {cards.map((card) => (
        <article className={`summary-card ${card.tone}`} key={card.label}>
          <p>{card.label}</p>
          <strong>{card.value}</strong>
        </article>
      ))}
      <p className="summary-meta">
        Showing {transactionCount} of {totalCount} transaction
        {totalCount === 1 ? '' : 's'}
        {hasFilters ? ' with active filters.' : '.'}
      </p>
    </section>
  )
}

export default SummaryCards
