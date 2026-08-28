import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Profile from './Profile'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return { ...actual, useNavigate: () => mockNavigate }
})

describe('Profile', () => {
    beforeEach(() => {
        mockNavigate.mockClear()
        global.fetch = vi.fn()
        localStorage.clear()
    })

    it('loads the profile and displays the fetched name and email', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({ fullName: 'Jane Doe', email: 'jane@gmail.com' }),
        })

        render(
            <MemoryRouter>
                <Profile />
            </MemoryRouter>
        )

        expect(await screen.findByDisplayValue('Jane Doe')).toBeInTheDocument()
        expect(screen.getByDisplayValue('jane@gmail.com')).toBeInTheDocument()
        expect(JSON.parse(localStorage.getItem('USER'))).toEqual({
            fullName: 'Jane Doe',
            email: 'jane@gmail.com',
        })
    })

    it('calls the profile endpoint with credentials included', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({ fullName: 'Jane Doe', email: 'jane@gmail.com' }),
        })

        render(
            <MemoryRouter>
                <Profile />
            </MemoryRouter>
        )

        await waitFor(() =>
            expect(global.fetch).toHaveBeenCalledWith(
                'http://localhost:8080/profile',
                expect.objectContaining({
                    method: 'GET',
                    credentials: 'include',
                })
            )
        )
    })

    it('clears the stored user and redirects to /login on a 401', async () => {
        localStorage.setItem('USER', JSON.stringify({ fullName: 'Stale User' }))
        global.fetch.mockResolvedValueOnce({
            ok: false,
            status: 401,
            json: async () => ({ message: 'Unauthorized' }),
        })

        render(
            <MemoryRouter>
                <Profile />
            </MemoryRouter>
        )

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/login'))
        expect(localStorage.getItem('USER')).toBeNull()
    })

    it.todo('opens EditProfileModal when "Edit Profile" is clicked')
    it.todo('opens ChangePasswordModal when "Change Password" is clicked')
})