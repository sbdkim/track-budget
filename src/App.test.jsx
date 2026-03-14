import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the empty state guidance', async () => {
    window.localStorage.clear()

    render(<App />)

    expect(screen.getByText('Budget Tracker App')).toBeInTheDocument()
    expect(
      await screen.findByText(/Add an income or expense entry to unlock charts and summaries/i),
    ).toBeInTheDocument()
  })
})
