import _ from 'lodash'
import { type HousePlantIndex, type HousePlantConvert } from '@/types/plants'

export const useConvertJson = () => {
  const toArr = (o: (string | HousePlantConvert)[]) => {
    const obj: (string | HousePlantConvert)[] = _.cloneDeep(o)
    const resultObj: HousePlantIndex[] = []

    obj.map((item: string | HousePlantConvert) => {
      const keys: string[] = Object.keys(item)
      const values = Object.values(item)
      const arrVal = values.map((val) => {
        return val[0].includes('|') === false ? val[0] : val[0].split('|')
      })

      const convertObj = {} as HousePlantIndex
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i] + ''
        convertObj[key] = arrVal[i]
      }
      resultObj.push(convertObj)
    })
    return resultObj
  }

  return {
    toArr
  }
}
