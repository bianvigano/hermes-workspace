import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import {
  getSessionTokenFromCookie,
  revokeSessionToken,
} from '../../../server/auth-middleware'

export const Route = createFileRoute('/api/auth/logout')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const cookieHeader = request.headers.get('cookie')
        const token = getSessionTokenFromCookie(cookieHeader)
        if (token) {
          revokeSessionToken(token)
        }
        return json(
          { ok: true },
          {
            headers: {
              'Set-Cookie': 'claude-auth=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0',
            },
          },
        )
      },
    },
  },
})
