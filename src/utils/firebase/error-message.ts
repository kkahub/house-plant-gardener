import ERROR_CODE_JSON from './error-code.json'
import type { ErrorCodeTypes } from '@/types/error-code'

export const getErrorMessage = (code: string) => {
  const msg: ErrorCodeTypes = ERROR_CODE_JSON
  return msg[code] || `관리자에게 문의해주세요.(${code})`
}
