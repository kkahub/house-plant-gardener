export const convertJson = (xml) => {
  let obj = {}

  // Create the return object
  if (xml.nodeType === 1) {
    // element
    // do attributes
    if (xml.attributes.length > 0) {
      for (let j = 0; j < xml.attributes.length; j += 1) {
        obj['@attributes'] = {}
        const attribute = xml.attributes.item(j)
        const nodeVal = attribute.nodeValue
        // <![CDATA[, ]]>를 포함하고 있는 경우
        if (attribute.nodeValue.includes('<![CDATA[')) {
          obj['@attributes'][attribute.nodeName] = attribute.nodeValue
            .replace('<![CDATA[', '')
            .replace(']]>', '')
        }
        obj['@attributes'][attribute.nodeName] = attribute.nodeValue
      }
    }
  } else if (xml.nodeType === 3) {
    // text
    obj = xml.nodeValue
  }

  // do children
  // If just one text node inside
  if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
    obj = xml.childNodes[0].nodeValue
  } else if (xml.hasChildNodes()) {
    for (let i = 0; i < xml.childNodes.length; i += 1) {
      const item = xml.childNodes.item(i)
      const nodeName = item.nodeName
      if (typeof obj[nodeName] === 'undefined') {
        obj[nodeName] = convertJson(item)
      } else {
        if (typeof obj[nodeName].push === 'undefined') {
          const old = obj[nodeName]
          obj[nodeName] = []
          obj[nodeName].push(old)
        }
        obj[nodeName].push(convertJson(item))
      }
    }
  }
  return obj
}
