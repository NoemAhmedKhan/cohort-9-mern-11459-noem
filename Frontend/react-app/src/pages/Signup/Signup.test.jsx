import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Signup from './Signup'

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return { ...actual }
})

describe('Signup', () => {
    beforeEach(() => {
        global.fetch = vi.fn()
    })

    it('submits valid signup data to the server', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            status: 201,
            json: async () => ({ message: 'Account created' }),
        })
        const user = userEvent.setup()

        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        )

        await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
        await user.type(screen.getByLabelText(/email address/i), 'jane@gmail.com')
        await user.type(screen.getByLabelText('Password'), 'Passw0rd!')
        await user.type(screen.getByLabelText(/confirm password/i), 'Passw0rd!')
        await user.click(screen.getByRole('button', { name: /create account/i }))

        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:8080/signup',
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({
                    fullName: 'Jane Doe',
                    email: 'jane@gmail.com',
                    password: 'Passw0rd!',
                }),
            })
        )
    })

    it('does not call fetch when the passwords do not match', async () => {
        const user = userEvent.setup()

        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        )

        await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
        await user.type(screen.getByLabelText(/email address/i), 'jane@gmail.com')
        await user.type(screen.getByLabelText('Password'), 'Passw0rd!')
        await user.type(screen.getByLabelText(/confirm password/i), 'Different1!')
        await user.click(screen.getByRole('button', { name: /create account/i }))

        expect(global.fetch).not.toHaveBeenCalled()
        expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument()
    })

    it('does not call fetch for a non-@gmail.com email', async () => {
        const user = userEvent.setup()

        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        )

        await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
        await user.type(screen.getByLabelText(/email address/i), 'jane@outlook.com')
        await user.type(screen.getByLabelText('Password'), 'Passw0rd!')
        await user.type(screen.getByLabelText(/confirm password/i), 'Passw0rd!')
        await user.click(screen.getByRole('button', { name: /create account/i }))

        expect(global.fetch).not.toHaveBeenCalled()
        expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
    })

    it.todo('shows a password strength error when missing an uppercase letter, digit, or special character')
})