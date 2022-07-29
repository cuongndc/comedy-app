import { createIPX, createIPXMiddleware } from 'ipx'
export default defineEventHandler(() => {
  return createIPXMiddleware(createIPX({}))
})
