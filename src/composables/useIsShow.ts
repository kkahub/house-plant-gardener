export const useIsShow = () => {
  const isShow = (val: unknown) => typeof val === 'string' && val.trim() !== ''

  return { isShow }
}
