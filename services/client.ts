import axios from 'axios'
import queryString from 'query-string'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()
const baseURL = `${config.public.NUXT_PUBLIC_SERVICE_URL}/api`

const Client = axios.create({
  baseURL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
})

export default Client
