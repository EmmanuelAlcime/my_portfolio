const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL || ''

export async function submitContactForm(data) {
  if (!CONTACT_API_URL) {
    // Simulate API call when no endpoint is configured
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return { success: true }
  }

  const response = await fetch(CONTACT_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to send message' }))
    throw new Error(error.message || 'Failed to send message')
  }

  return response.json()
}
