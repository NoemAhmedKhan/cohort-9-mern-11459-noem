import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Login from './Login'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

describe('Login', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
    global.fetch = vi.fn()
  })

  it('submits credentials and navigates to /dashboard on success', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ message: 'ok' }),
    })
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    await user.type(screen.getByLabelText(/email address/i), 'user@gmail.com')
    await user.type(screen.getByLabelText('Password'), 'Passw0rd!')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/login',
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ email: 'user@gmail.com', password: 'Passw0rd!' }),
      })
    )
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
  })

  it('does not navigate when the server rejects the login', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Invalid credentials' }),
    })
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    await user.type(screen.getByLabelText(/email address/i), 'user@gmail.com')
    await user.type(screen.getByLabelText('Password'), 'wrongpass1!')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it.todo('shows an error and does not call fetch for a non-@gmail.com email')
})
