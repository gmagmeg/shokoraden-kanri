export const getBaseURL = () => {
  return window.location.hostname.includes('127.0.0.1')
    ? `http://${window.location.hostname}:5173/`
    : `/`
}

export const getBaseURLFromServer = () => {
  return process.env.NODE_ENV === 'production'
    ? '/'
    : `http://127.0.0.1:5173/`
}

export const getLatestBooksURL = () => {
  return `${getBaseURLFromServer()}books/${process.env.LATEST_YEAR_MONTH}`
}

export const response = (value: object, addHeaders = {}, options = {}): Response => {
  const headers = {
    headers: {
      "Content-Type": "application/json",
      ...addHeaders
    }
  }
  return new Response(JSON.stringify(value), { ...headers, ...options });
}