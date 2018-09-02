function prepareDataObject(bulkyObj) {
  let lightObj = {}
  Object.keys(bulkyObj).forEach(prop => {
    if(bulkyObj[prop]) {
      lightObj[prop] = bulkyObj[prop]
    }
  })
  return lightObj
}



export default  {
  prepareDataObject
}