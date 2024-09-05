export const useCsrfToken = () => {
  const csrfToken = async () => {
    const csrf = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/sanctum/csrf-cookie`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    return csrf
  }

  function getCsrfToken(name: string) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)

    if (parts.length >= 2) {
      return decodeURIComponent(parts[1])
    }
  }

  return { csrfToken, getCsrfToken }
}
