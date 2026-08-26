import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Dashboard from './Dashboard'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

describe('Dashboard', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
    global.fetch = vi.fn()
    localStorage.clear()
  })

  it('loads notes and renders the extracted preview text from the TipTap content', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ([
        {
          _id: '1',
          title: 'Groceries',
          content: {
            type: 'doc',
            content: [
              { type: 'paragraph', content: [{ type: 'text', text: 'Milk, eggs, bread' }] },
            ],
          },
        },
      ]),
    })

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )

    expect(await screen.findByText('Groceries')).toBeInTheDocument()
    expect(await screen.findByText('Milk, eggs, bread')).toBeInTheDocument()
  })

  it('clears the stored user and redirects to /login when the dashboard request fails', async () => {
    localStorage.setItem('USER', JSON.stringify({ fullName: 'Test User' }))
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Unauthorized' }),
    })

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/login'))
    expect(localStorage.getItem('USER')).toBeNull()
  })
})
