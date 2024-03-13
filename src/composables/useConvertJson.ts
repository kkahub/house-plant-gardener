import _ from 'lodash'
import { type PlantShotIndex, type PlantShotConvert } from '@/types/plants'

export const useConvertJson = () => {
  const toArr = (o: (string | PlantShotConvert)[]) => {
    const obj: (string | PlantShotConvert)[] = _.cloneDeep(o)
    const resultObj: PlantShotIndex[] = []

    obj.map((item: string | PlantShotConvert) => {
      const keys: string[] = Object.keys(item)
      const values = Object.values(item)
      const arrVal = values.map((val) => {
        return val[0].includes('|') === false ? val[0] : val[0].split('|')
      })

      const convertObj = {} as PlantShotIndex
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
