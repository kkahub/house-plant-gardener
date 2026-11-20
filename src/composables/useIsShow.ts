import type { XmlValue } from '@/types/common'

export const useIsShow = () => {
  const isShow = (val: XmlValue) => typeof val === 'string' && val.trim() !== ''

  return { isShow }
}
