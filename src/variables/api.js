import axios from 'axios'

const api = axios.create({ baseURL: process.env.REACT_APP_API })

api.interceptors.request.use(async config => {
  const token = localStorage.getItem('TOKEN')
  if (token) {
    config.headers.token = token
  }
  return config
})

api.interceptors.response.use(undefined, error => {
  if (!error.response.data.auth) {
    if (
      !(window.location.pathname === '/authentication/recoverPassword') &&
      !(window.location.pathname === '/authentication/login')
    ) {
      console.log('error')
      console.log(error)
      console.log('error.response')
      console.log(error.response)
      console.log('error.response.data')
      console.log(error.response.data)
      console.log('error.response.data.auth')
      console.log(error.response.data.auth)
      /* localStorage.removeItem('TOKEN')
      window.location.href = '/' */
    }
  }
  return Promise.reject(error)
})

export default api
