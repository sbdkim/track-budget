import { useState } from 'react'

function getDefaultFormState(defaultCategory) {
  return {
    type: 'expense',
    amount: '',
    category: defaultCategory,
    date: new Date().toISOString().slice(0, 10),
    description: '',
  }
}

function getInitialFormState(editingTransaction, categoriesByType) {
  if (editingTransaction) {
    return {
      type: editingTransaction.type,
      amount: String(editingTransaction.amount),
      category: editingTransaction.category,
      date: editingTransaction.date,
      description: editingTransaction.description,
    }
  }

  return getDefaultFormState(categoriesByType.expense[0])
}

function TransactionForm({
  editingTransaction,
  categoriesByType,
  onSave,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState(() =>
    getInitialFormState(editingTransaction, categoriesByType),
  )
  const [error, setError] = useState('')

  const categoryOptions = categoriesByType[formData.type]

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentFormData) => {
      if (name === 'type') {
        return {
          ...currentFormData,
          type: value,
          category: categoriesByType[value][0],
        }
      }

      return {
        ...currentFormData,
        [name]: value,
      }
    })

    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const amount = Number(formData.amount)
    const description = formData.description.trim()

    if (!amount || amount <= 0) {
      setError('Enter a positive amount.')
      return
    }

    if (!formData.date) {
      setError('Choose a date.')
      return
    }

    if (!formData.category) {
      setError('Choose a category.')
      return
    }

    onSave({
      type: formData.type,
      amount,
      category: formData.category,
      date: formData.date,
      description,
    })

    setFormData(getDefaultFormState(categoriesByType.expense[0]))
    setError('')
  }

  return (
    <section className="panel form-panel">
      <div className="section-heading">
        <div>
          <p className="section-label">Transactions</p>
          <h2>{editingTransaction ? 'Edit entry' : 'Add a new entry'}</h2>
        </div>
        {editingTransaction ? (
          <button className="ghost-button" onClick={onCancelEdit} type="button">
            Cancel edit
          </button>
        ) : null}
      </div>

      <form className="transaction-form" onSubmit={handleSubmit}>
        <label>
          Type
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>

        <label>
          Amount
          <input
            min="0"
            name="amount"
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            type="number"
            value={formData.amount}
          />
        </label>

        <label>
          Category
          <select name="category" value={formData.category} onChange={handleChange}>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Date
          <input name="date" onChange={handleChange} type="date" value={formData.date} />
        </label>

        <label className="full-width">
          Description
          <input
            maxLength="80"
            name="description"
            onChange={handleChange}
            placeholder="Optional note"
            type="text"
            value={formData.description}
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-button full-width" type="submit">
          {editingTransaction ? 'Save changes' : 'Add transaction'}
        </button>
      </form>
    </section>
  )
}

export default TransactionForm
