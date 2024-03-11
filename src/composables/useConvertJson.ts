export const useConvertJson = () => {
  //   const item = str || []

  //   const toArr = (str) => str.split('|')
  const toArr = (o) => {
    const obj = o
    const result = obj.map((item) => {
      const entries = Object.entries(item)
      const values = Object.values(item)
      values.map((val) => {
        console.log(val)
      })
      //   for (let i = 0; i < entries.length; i++) {
      //     if (values[i][0].includes('|')) {
      //       values[i][0].split('|')
      //     }
      //   }
    })
    return result
  }

  return {
    toArr
  }
}
