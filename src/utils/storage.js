import { storageKey } from '../constants'

export function loadTransactions() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const rawValue = window.localStorage.getItem(storageKey)

    if (!rawValue) {
      return []
    }

    const parsedValue = JSON.parse(rawValue)

    return Array.isArray(parsedValue) ? parsedValue : []
  } catch {
    return []
  }
}

export function saveTransactions(transactions) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(storageKey, JSON.stringify(transactions))
}
