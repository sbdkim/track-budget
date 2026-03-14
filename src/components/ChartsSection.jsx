import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatCurrency } from '../utils/transactions'

const pieColors = ['#0f766e', '#0ea5a4', '#f59e0b', '#f97316', '#84cc16', '#3b82f6']

function ChartsSection({
  categoryBreakdown,
  monthlySummary,
  hasTransactions,
  hasVisibleTransactions,
}) {
  if (!hasTransactions) {
    return (
      <section className="panel empty-panel">
        <div className="section-heading">
          <div>
            <p className="section-label">Charts</p>
            <h2>Build your first spending story</h2>
          </div>
        </div>
        <p className="empty-copy">
          Add an income or expense entry to unlock charts and summaries. This app
          keeps everything local, so it is safe to experiment.
        </p>
      </section>
    )
  }

  if (!hasVisibleTransactions) {
    return (
      <section className="panel empty-panel">
        <div className="section-heading">
          <div>
            <p className="section-label">Charts</p>
            <h2>No chart data for the current filters</h2>
          </div>
        </div>
        <p className="empty-copy">
          Try a different month, category, or transaction type to see your charts again.
        </p>
      </section>
    )
  }

  return (
    <section className="panel charts-panel">
      <div className="section-heading">
        <div>
          <p className="section-label">Charts</p>
          <h2>Spending overview</h2>
        </div>
      </div>

      <div className="chart-grid">
        <article className="chart-card">
          <h3>Spending by category</h3>
          {categoryBreakdown.length === 0 ? (
            <p className="chart-empty">Expense entries will appear here.</p>
          ) : (
            <ResponsiveContainer height={280} width="100%">
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  dataKey="value"
                  innerRadius={55}
                  outerRadius={92}
                  paddingAngle={3}
                >
                  {categoryBreakdown.map((item, index) => (
                    <Cell
                      fill={pieColors[index % pieColors.length]}
                      key={item.name}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          )}
          <div className="legend-list">
            {categoryBreakdown.map((item, index) => (
              <div className="legend-row" key={item.name}>
                <span
                  className="legend-dot"
                  style={{ backgroundColor: pieColors[index % pieColors.length] }}
                />
                <span>{item.name}</span>
                <strong>{formatCurrency(item.value)}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="chart-card">
          <h3>Monthly income vs expenses</h3>
          <ResponsiveContainer height={280} width="100%">
            <BarChart data={monthlySummary}>
              <CartesianGrid stroke="#dbe5dd" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="income" fill="#0f766e" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expenses" fill="#f97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>
      </div>
    </section>
  )
}

export default ChartsSection
