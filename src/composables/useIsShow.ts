export const useIsShow = () => {
  const isShow = (val: string) => val !== ' ' && val !== ''

  return { isShow }
}
