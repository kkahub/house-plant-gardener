import _ from 'lodash'
import { type PlantShotData, type PlantShotCovert } from '@/types/plants'

export const useConvertJson = () => {
  const toArr = (o: PlantShotData[]) => {
    const obj: PlantShotData[] = _.cloneDeep(o)
    // console.log(obj)
    const resultObj: PlantShotCovert[] = []

    obj.map((item: PlantShotData) => {
      const keys = Object.keys(item)
      const values = Object.values(item)
      const arrVal = values.map((val) => {
        return val[0].includes('|') === false ? val[0] : val[0].split('|')
      })

      const convertObj = {} as PlantShotCovert
      for (let i = 0; i < keys.length; i++) {
        convertObj[keys[i]] = arrVal[i]
      }
      resultObj.push(convertObj)
    })
    return resultObj
  }

  return {
    toArr
  }
}
