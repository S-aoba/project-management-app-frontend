import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
    })

    const user = await res.json()

    if (user['message'] === 'Unauthenticated.') {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Error during authentication check:', error)
    return NextResponse.redirect(new URL('/error', request.url))
  }
}

export const config = {
  matcher: ['/projects/:path*'],
}
