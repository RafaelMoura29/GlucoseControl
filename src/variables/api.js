  
import axios from 'axios'

const api = axios.create({baseURL: 'https://glucosecontrolapp.herokuapp.com'})

export default api;