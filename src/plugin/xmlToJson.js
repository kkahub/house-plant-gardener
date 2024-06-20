/**
 * nodeType
 * text의 경우 xml.nodeType === 3
 * <!CDATA[[...]] >의 경우 xml.nodeType === 4
 */
export const convertJson = (xml) => {
  let obj = {}

  // Create the return object
  if (xml.nodeType === 1) {
    // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj['@attributes'] = {}
      for (let j = 0; j < xml.attributes.length; j += 1) {
        const attribute = xml.attributes.item(j)
        obj['@attributes'][attribute.nodeName] = attribute.nodeValue
      }
    }
  } else if (xml.nodeType === 3 || xml.nodeType === 4) {
    // text or cdata node type
    obj = xml.nodeValue
  }

  const isTextNode = xml.hasChildNodes() && xml.childNodes.length === 1

  // do children
  // If just one text node inside
  if (isTextNode && xml.childNodes[0].nodeType === 3) {
    obj = xml.childNodes[0].nodeValue
  } else if (isTextNode && xml.childNodes[0].nodeType === 4) {
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
