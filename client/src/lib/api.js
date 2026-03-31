import axios from 'axios'

const fallbackBaseUrl = 'https://hirematch-backend.onrender.com/api'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || fallbackBaseUrl,
  timeout: 30000,
})

export function getErrorMessage(error, fallbackMessage) {
  return error?.response?.data?.message || error?.message || fallbackMessage
}

export default api
