// eslint-disable-next-line
const IS_BROWSER = typeof window === 'object'
var tslib_1 = require('tslib')
var moment = require('moment')

const JSUtils = (function(exports) {
  /**
   * @important Object.fromEntries will not work in IE
   * @see https://gitlab.com/moongoal/js-polyfill-object.fromentries/blob/master/index.js
   * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
   */
  if (!Object.fromEntries) {
    Object.defineProperty(Object, 'fromEntries', {
      value: function(entries) {
        if (!entries || !entries[Symbol.iterator]) {
          throw new Error(
            'Object.fromEntries() requires a single iterable argument'
          )
        }
        var o = {}
        Object.keys(entries).forEach(function(key) {
          var _a = entries[key],
            k = _a[0],
            v = _a[1]
          o[k] = v
        })
        return o
      },
    })
  }
  var URL = !IS_BROWSER ? require('url').URL : window.URL
  var URLSearchParams = !IS_BROWSER
    ? require('url').URLSearchParams
    : window.URLSearchParams
  /**
   * @important Array.prototype.find will not work in IE
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
   */
  if (!Array.prototype.find) {
    // eslint-disable-next-line no-extend-native
    Object.defineProperty(Array.prototype, 'find', {
      value: function(predicate) {
        // eslint-disable-next-line eqeqeq
        if (this == null) {
          throw TypeError('"this" is null or not defined')
        }
        var o = Object(this)
        var len = o.length >>> 0
        if (typeof predicate !== 'function') {
          throw TypeError('predicate must be a function')
        }
        var thisArg = arguments[1]
        var k = 0
        while (k < len) {
          var kValue = o[k]
          if (predicate.call(thisArg, kValue, k, o)) {
            return kValue
          }
          k++
        }
        return undefined
      },
      configurable: true,
      writable: true,
    })
  }

  const isEmptyString = value => {
    return value === ''
  }
  const isEmptyArray = value => {
    return isArray(value) && value.length === 0
  }
  const isEmptyObject = value => {
    return isObject(value) && Object.keys(value).length === 0
  }
  const isEmpty = value => {
    return (
      isNil(value) ||
      isEmptyString(value) ||
      isEmptyArray(value) ||
      isEmptyObject(value)
    )
  }
  const isEqual = (value1, value2) => {
    return value1 === value2
  }
  const isArrayEqual = (array1 = [], array2 = []) => {
    return JSON.stringify(array1) === JSON.stringify(array2)
  }
  const isObjectEqual = (object1, object2) => {
    return JSON.stringify(object1) === JSON.stringify(object2)
  }
  const IsJsonString = str => {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  }
  const getDataType = value => {
    return isNil(value) ? 'nil' : value.constructor.name.toLowerCase()
  }
  const isNil = value => {
    return isUndefined(value) || isNull(value)
  }
  const isUndefined = value => {
    return value === undefined
  }
  const isNull = value => {
    return value === null
  }
  const isString = value => {
    return getDataType(value) === 'string'
  }
  const isNumber = value => {
    return getDataType(value) === 'number'
  }
  const isBoolean = value => {
    return getDataType(value) === 'boolean'
  }
  const isArray = value => {
    return Array.isArray(value)
  }
  const isObject = value => {
    return getDataType(value) === 'object'
  }
  const isTypeEq = (value, expectedType) => {
    return getDataType(value) === expectedType.toLowerCase()
  }

  const getValueFromObject = (obj, key) => {
    var keyList = String(key)
      .split(/[[.\]]/)
      .filter(Boolean)
    var last = keyList[keyList.length - 1]
    var curKey = keyList.shift()
    var curObj = obj
    while (curKey) {
      curObj = curObj[curKey]
      if (isNil(curObj) === true) {
        return {}
      }
      curKey = keyList.shift()
    }
    if (isNumber(last)) {
      return [curObj]
    }
    return curObj
  }
  const mergeObjects = function(rootObject, objectList = []) {
    if (!isEmpty(objectList)) {
      objectList.forEach(function(nestedObj) {
        rootObject = tslib_1.__assign({}, rootObject, nestedObj)
      })
    }
    return rootObject
  }
  const omit = function(rootObject, omitKeyList = []) {
    if (!isEmpty(omitKeyList)) {
      var clonedObject_1 = tslib_1.__assign({}, rootObject)
      omitKeyList.forEach(function(key) {
        delete clonedObject_1[key]
      })
      return clonedObject_1
    }
    return rootObject
  }

  const removeDuplicatesFromArray = (array = []) => {
    var firstItem = array[0]
    var itemType = getDataType(firstItem)
    if (itemType === 'array' || itemType === 'object') {
      var stringifiedArray = Array.from(
        new Set(
          array.map(function(item) {
            return JSON.stringify(item)
          })
        )
      )
      return stringifiedArray.map(function(item) {
        return JSON.parse(item)
      })
    } else {
      return array.filter(function(curItem, index) {
        return array.indexOf(curItem) === index
      })
    }
  }
  const removeItemFromArray = function(array, item) {
    var itemType = getDataType(item)
    var isEqual = function(item1, item2) {
      return item1 === item2
    }
    var equalityCheck =
      itemType === 'array'
        ? isArrayEqual
        : itemType === 'object'
        ? isObjectEqual
        : isEqual
    return array.filter(function(curItem, index) {
      return !equalityCheck(curItem, item)
    })
  }

  const getValidString = function(value) {
    return isEmptyString(value) === false ? value.trim() : value
  }
  const replaceFromString = (value, from, to, shouldReplaceAll = false) => {
    const validString = getValidString(value)
    const regex = new RegExp(from, 'g')
    return validString.replace(shouldReplaceAll ? regex : from, to)
  }
  const hyphenToCamelCase = function(str) {
    return str.replace(/-([a-z])/g, function(item) {
      return item[1].toUpperCase()
    })
  }

  const convertNumberToString = value => {
    return String(value)
  }
  const convertStringToNumber = value => {
    return +value
  }
  const convertStringToBoolean = value => {
    return value === 'true'
  }
  const convertBooleanToString = value => {
    return String(value)
  }
  const convertNumberToBoolean = value => {
    return !!value
  }
  const minifyString = value => {
    return value.replace(/\n/g, '').replace(/\s\s+/g, ' ')
  }

  const isDuplicateObject = (value, nameOfKey) => {
    const valueArr = value.map(function(item) {
      return item[nameOfKey]
    })
    const isDuplicate = valueArr.some(function(item, idx) {
      // eslint-disable-next-line eqeqeq
      return valueArr.indexOf(item) != idx
    })
    return isDuplicate
  }

  const replaceProtocol = (url = '', protocol = '') => {
    const defaultProtocol = protocol ? protocol : 'https'
    if (url && url !== '') {
      var urlObj = new URL(url)
      urlObj.protocol = defaultProtocol
      return String(urlObj)
    } else {
      return url
    }
  }

  var removeProtocol = (url = '') => {
    var _a = new URL(url),
      protocol = _a.protocol,
      href = _a.href
    return href.replace(protocol, '')
  }
  var getFileFormatFromUrl = (url = '') => {
    var hostUrl = url && url.split('?').shift()
    return hostUrl && hostUrl.split('.').pop()
  }
  var isValidFileFormat = function(url, type, allowedFormats) {
    var curType = type || 'image'
    var getTotalAllowedFormats = function() {
      var supportedFormats = {
        image: ['jpg', 'jpeg', 'png', 'bmp'],
        video: ['mp4', 'webm', 'ogg', 'avi', 'mov', 'flv', '3gp'],
        audio: ['mp3'],
        others: ['json', 'js', 'css', 'html'],
      }
      var mergedFormatList = supportedFormats[curType].concat(allowedFormats)
      return removeDuplicatesFromArray(mergedFormatList)
    }
    var totalAllowedFormats = getTotalAllowedFormats()
    var imageFileFormat = getFileFormatFromUrl(url)
    return totalAllowedFormats.includes(imageFileFormat)
  }
  var getQueryParamAsObjectFromUrl = function(url) {
    var searchParams = new URL(url).searchParams
    return Object.fromEntries(searchParams)
  }
  var getHashAsObjectFromUrl = function(url) {
    var _a
    var _b = new URL(url).hash,
      hash = _b === void 0 ? '' : _b
    var _c = hash.split('='),
      key = _c[0],
      value = _c[1]
    return key && value ? ((_a = {}), (_a[key] = value), _a) : {}
  }
  var makeUrl = (url, queryParamObj, hashObject, shouldAppend = false) => {
    var _a = new URL(url),
      origin = _a.origin,
      pathname = _a.pathname,
      searchParams = _a.searchParams,
      hash = _a.hash
    var hashUrl = hash
    var baseUrl = origin + pathname
    var searchParamsObject = Object.fromEntries(searchParams)
    var mergeObj =
      shouldAppend === true
        ? tslib_1.__assign({}, searchParamsObject, queryParamObj)
        : tslib_1.__assign({}, queryParamObj)
    var queryUrl = Object.keys(mergeObj)
      .map(function(key) {
        return key + '=' + mergeObj[key]
      })
      .join('&')
    if (hashObject) {
      var key = Object.keys(hashObject)[0]
      hashUrl = '#' + key + '=' + hashObject[key]
    }
    return String(baseUrl + '?' + queryUrl + hashUrl)
  }
  var constructQueryString = function(queryObject) {
    var params = new URLSearchParams()
    for (var _i = 0, _a = Object.entries(queryObject); _i < _a.length; _i++) {
      var queryItem = _a[_i]
      var key = queryItem[0],
        value = queryItem[1]
      params.append(key, value)
    }
    return params.toString()
  }

  var getValidClassNamesFromList = (list, skipSpace = false) => {
    var mergedClass =
      isNil(list) === false && isArray(list) === true && list.length
        ? list.filter(Boolean).join(' ')
        : ''
    return mergedClass !== '' && skipSpace === false
      ? ' ' + mergedClass
      : mergedClass
  }

  var getLayerDataByName = (layerList, layerName, groupName = '') => {
    for (var index = 0; index < layerList.length; index++) {
      var currentLayer = layerList[index]
      if (layerName && currentLayer.name === groupName) {
        return getLayerDataByName(currentLayer.list, layerName, '')
      } else if (
        (!groupName && currentLayer.name === layerName) ||
        (!layerName && currentLayer.name === groupName)
      ) {
        return {
          layer: currentLayer,
          group: layerList,
          index: index,
        }
      }
    }
    return {
      layer: null,
      group: null,
      index: -1,
    }
  }
  var getLayerDataById = (
    layerList,
    layerIndex = undefined,
    groupIndex = undefined
  ) => {
    if (layerIndex) {
      if (groupIndex) {
        var layer = getLayerDataById(layerList[groupIndex].list, layerIndex)
          .layer
        return {
          layer,
          group: layerList[groupIndex].list,
          index: layerIndex,
        }
      } else {
        return {
          layer: layerList[layerIndex],
          group: layerList,
          index: layerIndex,
        }
      }
    } else if (!layerIndex && groupIndex) {
      return {
        group: layerList,
        layer: layerList[groupIndex],
        index: groupIndex,
      }
    }
    return {
      layer: null,
      group: null,
      index: -1,
    }
  }
  var findIndexBasedOnFieldType = field => {
    var type = field.type,
      _a = field.list,
      list = _a === void 0 ? [] : _a,
      defaultValue = field.defaultValue
    if (type === 'Select') {
      return defaultValue !== undefined ? list.indexOf(defaultValue) : 0
    } else if (type === 'RadioGroup') {
      return list.findIndex(function(field) {
        return field.name === defaultValue
      })
    } else if (type === 'Checkbox') {
      return +defaultValue
    }
  }
  var getLayerData = layer => {
    var _a = layer.componentProperties,
      componentProperties = _a === void 0 ? [] : _a,
      _b = layer.defaultProperties,
      defaultProperties = _b === void 0 ? {} : _b
    return !isNil(componentProperties)
      ? tslib_1.__assign(
          {},
          defaultProperties,
          getTransformedComponentProperties(componentProperties)
        )
      : defaultProperties
  }
  var getGroupData = group => {
    var _a = group.groupProperties,
      groupProperties = _a === void 0 ? [] : _a
    return getTransformedComponentProperties(groupProperties)
  }
  var getTransformedComponentProperties = (componentProps = []) => {
    var properties = {}
    if (componentProps.length > 0) {
      componentProps.forEach(function(item) {
        var type = item.type,
          name = item.name,
          defaultValue = item.defaultValue,
          _a = item.subFieldList,
          subFieldList = _a === void 0 ? [] : _a
        if (type === 'FieldSet') {
          var fieldList = item.fieldList
          if (isEmptyArray(fieldList) === false) {
            properties = tslib_1.__assign(
              {},
              getTransformedComponentProperties(fieldList),
              properties
            )
          }
        } else {
          properties[name] = defaultValue
          if (isEmptyArray(subFieldList) === false) {
            var index = findIndexBasedOnFieldType(item)
            if (index !== undefined) {
              properties = tslib_1.__assign(
                {},
                getTransformedComponentProperties(subFieldList[index]),
                properties
              )
            }
          }
        }
      })
    }
    return properties
  }
  var transformPropertiesToStyleSheet = (styleSheetProps = []) => {
    var cssConfig = {
      default: {},
      custom: {},
      defaultStyleSheet: '',
      additionalStyleSheet: '',
      customStyleSheet: '',
    }
    if (styleSheetProps === undefined || styleSheetProps.length === 0) {
      return cssConfig
    }
    var formData = getTransformedComponentProperties(styleSheetProps)
    var cssProperties = Object.keys(formData)
    if (cssProperties.length === 0) {
      return cssConfig
    }
    var saveProperty = (prop, value, type = 'default') => {
      if (!value) {
        return
      }
      if (type === 'default') {
        cssConfig.default[prop] = value
        cssConfig.defaultStyleSheet += prop + ':' + value + ';'
      } else if (type === 'additional') {
        cssConfig.additional = value
        cssConfig.additionalStyleSheet += '' + value
      } else if (type === 'custom') {
        cssConfig.custom = value
        cssConfig.customStyleSheet += '' + value
      }
    }
    cssProperties.forEach(function(cssProp) {
      var valueObj = formData[cssProp]
      if (
        cssProp === 'font-size' ||
        cssProp === 'line-height' ||
        cssProp === 'width' ||
        cssProp === 'height' ||
        cssProp === 'stroke-width'
      ) {
        if (typeof valueObj === 'string' && valueObj !== 'none') {
          saveProperty(cssProp, valueObj)
        } else {
          if (
            typeof valueObj === 'object' &&
            valueObj.value !== undefined &&
            valueObj.value !== 'none'
          ) {
            if (valueObj.value > 0 && valueObj.unit !== undefined) {
              saveProperty(cssProp, '' + valueObj.value + valueObj.unit)
            }
          }
        }
      } else if (
        cssProp === 'color' ||
        cssProp === 'background-color' ||
        cssProp === 'fill' ||
        cssProp === 'stroke'
      ) {
        if (valueObj.value !== 'none') {
          saveProperty(cssProp, valueObj.value)
        }
      } else if (cssProp === 'text-decoration') {
        saveProperty(cssProp, valueObj)
      } else if (cssProp === 'additional-styles') {
        saveProperty('', valueObj, 'additional')
      } else if (cssProp === 'custom-styles') {
        saveProperty('', valueObj, 'custom')
      } else {
        if (valueObj !== 'none') {
          saveProperty(cssProp, valueObj)
        }
      }
    })
    return cssConfig
  }
  var sortDataInAscending = (data, key) => {
    var sortedData = data
    if (data && data.length) {
      sortedData = data.sort(function(a, b) {
        const x = a[key]
        const y = b[key]
        if (x && y) {
          return x.localeCompare(y)
        }
        return ''
      })
    }
    return sortedData
  }

  var sortDataInDescending = (data, key) => {
    var sortedData = data
    if (data && data.length) {
      sortedData = data.sort(function(a, b) {
        const x = a[key]
        const y = b[key]
        if (x && y) {
          return y.toString().localeCompare(x.toString())
        }
        return ''
      })
    }
    return sortedData
  }

  var sortNumberInAscending = (data, key) => {
    var sortedData = data
    if (data && data.length) {
      sortedData = data.sort(function(a, b) {
        return a[key] - b[key]
      })
    }
    return sortedData
  }

  var sortNumberInDescending = data => {
    var sortedData = data
    if (data && data.length) {
      sortedData = data.sort(function(a, b) {
        return b - a
      })
    }
    return sortedData
  }

  var getSeoUrlString = value => {
    return value
      ? value
          .replace(/\s+/g, '-')
          .replace(/\%/g, '-')
          .replace(/\//g, '-')
          .toLowerCase()
      : ''
  }
  var getSeoUrlValueString = value => {
    return value
      ? value
          .replace(/[\s'&-,\/\.\!]+/g, '')
          .replace(/range_facet_/g, '')
          .replace(/facet_/g, '')
          .toLowerCase()
      : ''
  }
  var getSeoUrlOEMString = value => {
    return value ? value.replace(/\s+/g, '-').replace(/\%/g, '') : ''
  }

  const sortOnArrayObject = (arr, prop) => {
    arr.sort((a, b) => {
      if (a[prop] < b[prop]) {
        return -1
      } else if (a[prop] > b[prop]) {
        return 1
      } else {
        return 0
      }
    })
  }

  const getCurrentDate = (dateString = 'tomorrow') => {
    let currentDate = new Date()
    const z = n => (n < 10 ? '0' : '') + n
    if (dateString === 'tomorrow') {
      currentDate.setDate(currentDate.getDate() + 1)
    }
    const year = currentDate.getUTCFullYear()
    const month = z(currentDate.getMonth() + 1)
    const date = z(currentDate.getDate())

    return { year, month, date }
  }
  const getCurrentTime = () => {
    const formatTime = d => {
      const z = n => (n < 10 ? '0' : '') + n
      const h = d.getHours()
      return (z(h % 12) || 12) + ':' + z(d.getMinutes())
    }

    var time = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
    })

    var newTime = new Date(new Date('2000/01/01 ' + time).getTime())
    return formatTime(newTime)
  }

  const getDateKit = (date = '2021-09-24T08:49:45.815Z') => {
    const dateString = moment(date).format('DD')
    const monthString = moment(date).format('MMMM')
    const yearString = moment(date).format('YYYY')
    const timeString = moment(date).format('h:mm A')
    const fullTimeString = moment(date).format('HH:mm')
    return {
      dateString,
      monthString,
      yearString,
      timeString,
      fullTimeString,
    }
  }
  const getDateValue = (dateValue = '') => {
    const dateData = dateValue.length > 0 ? new Date(dateValue) : new Date()
    const z = n => (n < 10 ? '0' : '') + n
    const YearString = `${dateData.getUTCFullYear()}`
    const MonthString = `${z(dateData.getUTCMonth() + 1)}`
    const DateString = `${z(dateData.getUTCDate())}`
    const HoursString = `${z(dateData.getHours())}`
    const MinutesString = `${z(dateData.getMinutes())}`
    const obj = {
      YearString,
      MonthString,
      DateString,
      HoursString,
      MinutesString,
    }

    return obj
  }

  const getTimeZoneData = (add = []) => [
    '(GMT-11:00) International Date Line West',
    '(GMT-11:00) Midway Island',
    '(GMT-11:00) Samoa',
    '(GMT-10:00) Hawaii',
    '(GMT-09:00) Alaska',
    '(GMT-09:00) America/Anchorage',
    '(GMT-08:00) America/Los Angeles',
    '(GMT-08:00) Pacific Time (US & Canada)',
    '(GMT-08:00) Tijuana',
    '(GMT-07:00) America/Denver',
    '(GMT-07:00) America/Phoenix',
    '(GMT-07:00) Arizona',
    '(GMT-07:00) Chihuahua',
    '(GMT-07:00) Mazatlan',
    '(GMT-07:00) Mountain Time (US & Canada)',
    '(GMT-06:00) America/Chicago',
    '(GMT-06:00) America/Guatemala',
    '(GMT-06:00) Central America',
    '(GMT-06:00) Central Time (US & Canada)',
    '(GMT-06:00) Guadalajara',
    '(GMT-06:00) Mexico City',
    '(GMT-06:00) Monterrey',
    '(GMT-06:00) Saskatchewan',
    '(GMT-05:00) America/Bogota',
    '(GMT-05:00) America/New York',
    '(GMT-05:00) Bogota',
    '(GMT-05:00) Eastern Time (US & Canada)',
    '(GMT-05:00) Indiana (East)',
    '(GMT-05:00) Lima',
    '(GMT-05:00) Quito',
    '(GMT-04:30) Caracas',
    '(GMT-04:00) Atlantic Time (Canada)',
    '(GMT-04:00) Georgetown',
    '(GMT-04:00) La Paz',
    '(GMT-04:00) Santiago',
    '(GMT-03:30) Newfoundland',
    '(GMT-03:00) America/Argentina/Buenos Aires',
    '(GMT-03:00) America/Sao Paulo',
    '(GMT-03:00) Brasilia',
    '(GMT-03:00) Buenos Aires',
    '(GMT-03:00) Greenland',
    '(GMT-02:00) Mid-Atlantic',
    '(GMT-01:00) Azores',
    '(GMT-01:00) Cape Verde Is.',
    '(GMT+00:00) Casablanca',
    '(GMT+00:00) Dublin',
    '(GMT+00:00) Edinburgh',
    '(GMT+00:00) Europe/London',
    '(GMT+00:00) Lisbon',
    '(GMT+00:00) London',
    '(GMT+00:00) Monrovia',
    '(GMT+00:00) UTC',
    '(GMT+01:00) Africa/Lagos',
    '(GMT+01:00) Amsterdam',
    '(GMT+01:00) Belgrade',
    '(GMT+01:00) Berlin',
    '(GMT+01:00) Bern',
    '(GMT+01:00) Bratislava',
    '(GMT+01:00) Brussels',
    '(GMT+01:00) Budapest',
    '(GMT+01:00) Copenhagen',
    '(GMT+01:00) Europe/Berlin',
    '(GMT+01:00) Ljubljana',
    '(GMT+01:00) Madrid',
    '(GMT+01:00) Paris',
    '(GMT+01:00) Prague',
    '(GMT+01:00) Rome',
    '(GMT+01:00) Sarajevo',
    '(GMT+01:00) Skopje',
    '(GMT+01:00) Stockholm',
    '(GMT+01:00) Vienna',
    '(GMT+01:00) Warsaw',
    '(GMT+01:00) West Central Africa',
    '(GMT+01:00) Zagreb',
    '(GMT+02:00) Africa/Johannesburg',
    '(GMT+02:00) Athens',
    '(GMT+02:00) Bucharest',
    '(GMT+02:00) Cairo',
    '(GMT+02:00) Europe/Helsinki',
    '(GMT+02:00) Harare',
    '(GMT+02:00) Helsinki',
    '(GMT+02:00) Istanbul',
    '(GMT+02:00) Jerusalem',
    '(GMT+02:00) Kyiv',
    '(GMT+02:00) Pretoria',
    '(GMT+02:00) Riga',
    '(GMT+02:00) Sofia',
    '(GMT+02:00) Tallinn',
    '(GMT+02:00) Vilnius',
    '(GMT+03:00) Baghdad',
    '(GMT+03:00) Kuwait',
    '(GMT+03:00) Minsk',
    '(GMT+03:00) Nairobi',
    '(GMT+03:00) Riyadh',
    '(GMT+03:30) Tehran',
    '(GMT+04:00) Abu Dhabi',
    '(GMT+04:00) Asia/Dubai',
    '(GMT+04:00) Asia/Yerevan',
    '(GMT+04:00) Baku',
    '(GMT+04:00) Moscow',
    '(GMT+04:00) Muscat',
    '(GMT+04:00) St. Petersburg',
    '(GMT+04:00) Tbilisi',
    '(GMT+04:00) Volgograd',
    '(GMT+04:00) Yerevan',
    '(GMT+04:30) Kabul',
    '(GMT+05:00) Islamabad',
    '(GMT+05:00) Karachi',
    '(GMT+05:00) Tashkent',
    '(GMT+05:30) Asia/Kolkata',
    '(GMT+05:30) Chennai',
    '(GMT+05:30) Kolkata',
    '(GMT+05:30) Mumbai',
    '(GMT+05:30) New Delhi',
    '(GMT+05:30) Sri Jayawardenepura',
    '(GMT+05:45) Kathmandu',
    '(GMT+06:00) Almaty',
    '(GMT+06:00) Astana',
    '(GMT+06:00) Dhaka',
    '(GMT+06:00) Ekaterinburg',
    '(GMT+06:30) Rangoon',
    '(GMT+07:00) Asia/Jakarta',
    '(GMT+07:00) Bangkok',
    '(GMT+07:00) Hanoi',
    '(GMT+07:00) Jakarta',
    '(GMT+07:00) Novosibirsk',
    '(GMT+08:00) Asia/Shanghai',
    '(GMT+08:00) Beijing',
    '(GMT+08:00) Chongqing',
    '(GMT+08:00) Hong Kong',
    '(GMT+08:00) Krasnoyarsk',
    '(GMT+08:00) Kuala Lumpur',
    '(GMT+08:00) Perth',
    '(GMT+08:00) Singapore',
    '(GMT+08:00) Taipei',
    '(GMT+08:00) Ulaan Bataar',
    '(GMT+08:00) Urumqi',
    '(GMT+09:00) Asia/Tokyo',
    '(GMT+09:00) Irkutsk',
    '(GMT+09:00) Osaka',
    '(GMT+09:00) Sapporo',
    '(GMT+09:00) Seoul',
    '(GMT+09:00) Tokyo',
    '(GMT+09:30) Adelaide',
    '(GMT+09:30) Australia/Adelaide',
    '(GMT+09:30) Darwin',
    '(GMT+10:00) Australia/Brisbane',
    '(GMT+10:00) Australia/Sydney',
    '(GMT+10:00) Brisbane',
    '(GMT+10:00) Canberra',
    '(GMT+10:00) Guam',
    '(GMT+10:00) Hobart',
    '(GMT+10:00) Melbourne',
    '(GMT+10:00) Port Moresby',
    '(GMT+10:00) Sydney',
    '(GMT+10:00) Yakutsk',
    '(GMT+11:00) New Caledonia',
    '(GMT+11:00) Vladivostok',
    '(GMT+12:00) Auckland',
    '(GMT+12:00) Fiji',
    '(GMT+12:00) Kamchatka',
    '(GMT+12:00) Magadan',
    '(GMT+12:00) Marshall Is.',
    '(GMT+12:00) Pacific/Auckland',
    '(GMT+12:00) Solomon Is.',
    '(GMT+12:00) Wellington',
    "(GMT+13:00) Nuku'alofa",
    ...add,
  ]

  const getPhoneCountryCodeData = () => {
    // From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
    const countries = [
      { code: 'AD', label: 'Andorra', phone: '376' },
      { code: 'AE', label: 'United Arab Emirates', phone: '971' },
      { code: 'AF', label: 'Afghanistan', phone: '93' },
      { code: 'AG', label: 'Antigua and Barbuda', phone: '1-268' },
      { code: 'AI', label: 'Anguilla', phone: '1-264' },
      { code: 'AL', label: 'Albania', phone: '355' },
      { code: 'AM', label: 'Armenia', phone: '374' },
      { code: 'AO', label: 'Angola', phone: '244' },
      { code: 'AQ', label: 'Antarctica', phone: '672' },
      { code: 'AR', label: 'Argentina', phone: '54' },
      { code: 'AS', label: 'American Samoa', phone: '1-684' },
      { code: 'AT', label: 'Austria', phone: '43' },
      { code: 'AU', label: 'Australia', phone: '61', suggested: true },
      { code: 'AW', label: 'Aruba', phone: '297' },
      { code: 'AX', label: 'Alland Islands', phone: '358' },
      { code: 'AZ', label: 'Azerbaijan', phone: '994' },
      { code: 'BA', label: 'Bosnia and Herzegovina', phone: '387' },
      { code: 'BB', label: 'Barbados', phone: '1-246' },
      { code: 'BD', label: 'Bangladesh', phone: '880' },
      { code: 'BE', label: 'Belgium', phone: '32' },
      { code: 'BF', label: 'Burkina Faso', phone: '226' },
      { code: 'BG', label: 'Bulgaria', phone: '359' },
      { code: 'BH', label: 'Bahrain', phone: '973' },
      { code: 'BI', label: 'Burundi', phone: '257' },
      { code: 'BJ', label: 'Benin', phone: '229' },
      { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
      { code: 'BM', label: 'Bermuda', phone: '1-441' },
      { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
      { code: 'BO', label: 'Bolivia', phone: '591' },
      { code: 'BR', label: 'Brazil', phone: '55' },
      { code: 'BS', label: 'Bahamas', phone: '1-242' },
      { code: 'BT', label: 'Bhutan', phone: '975' },
      { code: 'BV', label: 'Bouvet Island', phone: '47' },
      { code: 'BW', label: 'Botswana', phone: '267' },
      { code: 'BY', label: 'Belarus', phone: '375' },
      { code: 'BZ', label: 'Belize', phone: '501' },
      { code: 'CA', label: 'Canada', phone: '1', suggested: true },
      { code: 'CC', label: 'Cocos (Keeling) Islands', phone: '61' },
      { code: 'CD', label: 'Congo, Democratic Republic of the', phone: '243' },
      { code: 'CF', label: 'Central African Republic', phone: '236' },
      { code: 'CG', label: 'Congo, Republic of the', phone: '242' },
      { code: 'CH', label: 'Switzerland', phone: '41' },
      { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
      { code: 'CK', label: 'Cook Islands', phone: '682' },
      { code: 'CL', label: 'Chile', phone: '56' },
      { code: 'CM', label: 'Cameroon', phone: '237' },
      { code: 'CN', label: 'China', phone: '86' },
      { code: 'CO', label: 'Colombia', phone: '57' },
      { code: 'CR', label: 'Costa Rica', phone: '506' },
      { code: 'CU', label: 'Cuba', phone: '53' },
      { code: 'CV', label: 'Cape Verde', phone: '238' },
      { code: 'CW', label: 'Curacao', phone: '599' },
      { code: 'CX', label: 'Christmas Island', phone: '61' },
      { code: 'CY', label: 'Cyprus', phone: '357' },
      { code: 'CZ', label: 'Czech Republic', phone: '420' },
      { code: 'DE', label: 'Germany', phone: '49', suggested: true },
      { code: 'DJ', label: 'Djibouti', phone: '253' },
      { code: 'DK', label: 'Denmark', phone: '45' },
      { code: 'DM', label: 'Dominica', phone: '1-767' },
      { code: 'DO', label: 'Dominican Republic', phone: '1-809' },
      { code: 'DZ', label: 'Algeria', phone: '213' },
      { code: 'EC', label: 'Ecuador', phone: '593' },
      { code: 'EE', label: 'Estonia', phone: '372' },
      { code: 'EG', label: 'Egypt', phone: '20' },
      { code: 'EH', label: 'Western Sahara', phone: '212' },
      { code: 'ER', label: 'Eritrea', phone: '291' },
      { code: 'ES', label: 'Spain', phone: '34' },
      { code: 'ET', label: 'Ethiopia', phone: '251' },
      { code: 'FI', label: 'Finland', phone: '358' },
      { code: 'FJ', label: 'Fiji', phone: '679' },
      { code: 'FK', label: 'Falkland Islands (Malvinas)', phone: '500' },
      { code: 'FM', label: 'Micronesia, Federated States of', phone: '691' },
      { code: 'FO', label: 'Faroe Islands', phone: '298' },
      { code: 'FR', label: 'France', phone: '33', suggested: true },
      { code: 'GA', label: 'Gabon', phone: '241' },
      { code: 'GB', label: 'United Kingdom', phone: '44' },
      { code: 'GD', label: 'Grenada', phone: '1-473' },
      { code: 'GE', label: 'Georgia', phone: '995' },
      { code: 'GF', label: 'French Guiana', phone: '594' },
      { code: 'GG', label: 'Guernsey', phone: '44' },
      { code: 'GH', label: 'Ghana', phone: '233' },
      { code: 'GI', label: 'Gibraltar', phone: '350' },
      { code: 'GL', label: 'Greenland', phone: '299' },
      { code: 'GM', label: 'Gambia', phone: '220' },
      { code: 'GN', label: 'Guinea', phone: '224' },
      { code: 'GP', label: 'Guadeloupe', phone: '590' },
      { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
      { code: 'GR', label: 'Greece', phone: '30' },
      {
        code: 'GS',
        label: 'South Georgia and the South Sandwich Islands',
        phone: '500',
      },
      { code: 'GT', label: 'Guatemala', phone: '502' },
      { code: 'GU', label: 'Guam', phone: '1-671' },
      { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
      { code: 'GY', label: 'Guyana', phone: '592' },
      { code: 'HK', label: 'Hong Kong', phone: '852' },
      { code: 'HM', label: 'Heard Island and McDonald Islands', phone: '672' },
      { code: 'HN', label: 'Honduras', phone: '504' },
      { code: 'HR', label: 'Croatia', phone: '385' },
      { code: 'HT', label: 'Haiti', phone: '509' },
      { code: 'HU', label: 'Hungary', phone: '36' },
      { code: 'ID', label: 'Indonesia', phone: '62' },
      { code: 'IE', label: 'Ireland', phone: '353' },
      { code: 'IL', label: 'Israel', phone: '972' },
      { code: 'IM', label: 'Isle of Man', phone: '44' },
      { code: 'IN', label: 'India', phone: '91' },
      { code: 'IO', label: 'British Indian Ocean Territory', phone: '246' },
      { code: 'IQ', label: 'Iraq', phone: '964' },
      { code: 'IR', label: 'Iran, Islamic Republic of', phone: '98' },
      { code: 'IS', label: 'Iceland', phone: '354' },
      { code: 'IT', label: 'Italy', phone: '39' },
      { code: 'JE', label: 'Jersey', phone: '44' },
      { code: 'JM', label: 'Jamaica', phone: '1-876' },
      { code: 'JO', label: 'Jordan', phone: '962' },
      { code: 'JP', label: 'Japan', phone: '81', suggested: true },
      { code: 'KE', label: 'Kenya', phone: '254' },
      { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
      { code: 'KH', label: 'Cambodia', phone: '855' },
      { code: 'KI', label: 'Kiribati', phone: '686' },
      { code: 'KM', label: 'Comoros', phone: '269' },
      { code: 'KN', label: 'Saint Kitts and Nevis', phone: '1-869' },
      {
        code: 'KP',
        label: "Korea, Democratic People's Republic of",
        phone: '850',
      },
      { code: 'KR', label: 'Korea, Republic of', phone: '82' },
      { code: 'KW', label: 'Kuwait', phone: '965' },
      { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
      { code: 'KZ', label: 'Kazakhstan', phone: '7' },
      { code: 'LA', label: "Lao People's Democratic Republic", phone: '856' },
      { code: 'LB', label: 'Lebanon', phone: '961' },
      { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
      { code: 'LI', label: 'Liechtenstein', phone: '423' },
      { code: 'LK', label: 'Sri Lanka', phone: '94' },
      { code: 'LR', label: 'Liberia', phone: '231' },
      { code: 'LS', label: 'Lesotho', phone: '266' },
      { code: 'LT', label: 'Lithuania', phone: '370' },
      { code: 'LU', label: 'Luxembourg', phone: '352' },
      { code: 'LV', label: 'Latvia', phone: '371' },
      { code: 'LY', label: 'Libya', phone: '218' },
      { code: 'MA', label: 'Morocco', phone: '212' },
      { code: 'MC', label: 'Monaco', phone: '377' },
      { code: 'MD', label: 'Moldova, Republic of', phone: '373' },
      { code: 'ME', label: 'Montenegro', phone: '382' },
      { code: 'MF', label: 'Saint Martin (French part)', phone: '590' },
      { code: 'MG', label: 'Madagascar', phone: '261' },
      { code: 'MH', label: 'Marshall Islands', phone: '692' },
      {
        code: 'MK',
        label: 'Macedonia, the Former Yugoslav Republic of',
        phone: '389',
      },
      { code: 'ML', label: 'Mali', phone: '223' },
      { code: 'MM', label: 'Myanmar', phone: '95' },
      { code: 'MN', label: 'Mongolia', phone: '976' },
      { code: 'MO', label: 'Macao', phone: '853' },
      { code: 'MP', label: 'Northern Mariana Islands', phone: '1-670' },
      { code: 'MQ', label: 'Martinique', phone: '596' },
      { code: 'MR', label: 'Mauritania', phone: '222' },
      { code: 'MS', label: 'Montserrat', phone: '1-664' },
      { code: 'MT', label: 'Malta', phone: '356' },
      { code: 'MU', label: 'Mauritius', phone: '230' },
      { code: 'MV', label: 'Maldives', phone: '960' },
      { code: 'MW', label: 'Malawi', phone: '265' },
      { code: 'MX', label: 'Mexico', phone: '52' },
      { code: 'MY', label: 'Malaysia', phone: '60' },
      { code: 'MZ', label: 'Mozambique', phone: '258' },
      { code: 'NA', label: 'Namibia', phone: '264' },
      { code: 'NC', label: 'New Caledonia', phone: '687' },
      { code: 'NE', label: 'Niger', phone: '227' },
      { code: 'NF', label: 'Norfolk Island', phone: '672' },
      { code: 'NG', label: 'Nigeria', phone: '234' },
      { code: 'NI', label: 'Nicaragua', phone: '505' },
      { code: 'NL', label: 'Netherlands', phone: '31' },
      { code: 'NO', label: 'Norway', phone: '47' },
      { code: 'NP', label: 'Nepal', phone: '977' },
      { code: 'NR', label: 'Nauru', phone: '674' },
      { code: 'NU', label: 'Niue', phone: '683' },
      { code: 'NZ', label: 'New Zealand', phone: '64' },
      { code: 'OM', label: 'Oman', phone: '968' },
      { code: 'PA', label: 'Panama', phone: '507' },
      { code: 'PE', label: 'Peru', phone: '51' },
      { code: 'PF', label: 'French Polynesia', phone: '689' },
      { code: 'PG', label: 'Papua New Guinea', phone: '675' },
      { code: 'PH', label: 'Philippines', phone: '63' },
      { code: 'PK', label: 'Pakistan', phone: '92' },
      { code: 'PL', label: 'Poland', phone: '48' },
      { code: 'PM', label: 'Saint Pierre and Miquelon', phone: '508' },
      { code: 'PN', label: 'Pitcairn', phone: '870' },
      { code: 'PR', label: 'Puerto Rico', phone: '1' },
      { code: 'PS', label: 'Palestine, State of', phone: '970' },
      { code: 'PT', label: 'Portugal', phone: '351' },
      { code: 'PW', label: 'Palau', phone: '680' },
      { code: 'PY', label: 'Paraguay', phone: '595' },
      { code: 'QA', label: 'Qatar', phone: '974' },
      { code: 'RE', label: 'Reunion', phone: '262' },
      { code: 'RO', label: 'Romania', phone: '40' },
      { code: 'RS', label: 'Serbia', phone: '381' },
      { code: 'RU', label: 'Russian Federation', phone: '7' },
      { code: 'RW', label: 'Rwanda', phone: '250' },
      { code: 'SA', label: 'Saudi Arabia', phone: '966' },
      { code: 'SB', label: 'Solomon Islands', phone: '677' },
      { code: 'SC', label: 'Seychelles', phone: '248' },
      { code: 'SD', label: 'Sudan', phone: '249' },
      { code: 'SE', label: 'Sweden', phone: '46' },
      { code: 'SG', label: 'Singapore', phone: '65' },
      { code: 'SH', label: 'Saint Helena', phone: '290' },
      { code: 'SI', label: 'Slovenia', phone: '386' },
      { code: 'SJ', label: 'Svalbard and Jan Mayen', phone: '47' },
      { code: 'SK', label: 'Slovakia', phone: '421' },
      { code: 'SL', label: 'Sierra Leone', phone: '232' },
      { code: 'SM', label: 'San Marino', phone: '378' },
      { code: 'SN', label: 'Senegal', phone: '221' },
      { code: 'SO', label: 'Somalia', phone: '252' },
      { code: 'SR', label: 'Suriname', phone: '597' },
      { code: 'SS', label: 'South Sudan', phone: '211' },
      { code: 'ST', label: 'Sao Tome and Principe', phone: '239' },
      { code: 'SV', label: 'El Salvador', phone: '503' },
      { code: 'SX', label: 'Sint Maarten (Dutch part)', phone: '1-721' },
      { code: 'SY', label: 'Syrian Arab Republic', phone: '963' },
      { code: 'SZ', label: 'Swaziland', phone: '268' },
      { code: 'TC', label: 'Turks and Caicos Islands', phone: '1-649' },
      { code: 'TD', label: 'Chad', phone: '235' },
      { code: 'TF', label: 'French Southern Territories', phone: '262' },
      { code: 'TG', label: 'Togo', phone: '228' },
      { code: 'TH', label: 'Thailand', phone: '66' },
      { code: 'TJ', label: 'Tajikistan', phone: '992' },
      { code: 'TK', label: 'Tokelau', phone: '690' },
      { code: 'TL', label: 'Timor-Leste', phone: '670' },
      { code: 'TM', label: 'Turkmenistan', phone: '993' },
      { code: 'TN', label: 'Tunisia', phone: '216' },
      { code: 'TO', label: 'Tonga', phone: '676' },
      { code: 'TR', label: 'Turkey', phone: '90' },
      { code: 'TT', label: 'Trinidad and Tobago', phone: '1-868' },
      { code: 'TV', label: 'Tuvalu', phone: '688' },
      { code: 'TW', label: 'Taiwan, Province of China', phone: '886' },
      { code: 'TZ', label: 'United Republic of Tanzania', phone: '255' },
      { code: 'UA', label: 'Ukraine', phone: '380' },
      { code: 'UG', label: 'Uganda', phone: '256' },
      { code: 'US', label: 'United States', phone: '1', suggested: true },
      { code: 'UY', label: 'Uruguay', phone: '598' },
      { code: 'UZ', label: 'Uzbekistan', phone: '998' },
      { code: 'VA', label: 'Holy See (Vatican City State)', phone: '379' },
      { code: 'VC', label: 'Saint Vincent and the Grenadines', phone: '1-784' },
      { code: 'VE', label: 'Venezuela', phone: '58' },
      { code: 'VG', label: 'British Virgin Islands', phone: '1-284' },
      { code: 'VI', label: 'US Virgin Islands', phone: '1-340' },
      { code: 'VN', label: 'Vietnam', phone: '84' },
      { code: 'VU', label: 'Vanuatu', phone: '678' },
      { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
      { code: 'WS', label: 'Samoa', phone: '685' },
      { code: 'XK', label: 'Kosovo', phone: '383' },
      { code: 'YE', label: 'Yemen', phone: '967' },
      { code: 'YT', label: 'Mayotte', phone: '262' },
      { code: 'ZA', label: 'South Africa', phone: '27' },
      { code: 'ZM', label: 'Zambia', phone: '260' },
      { code: 'ZW', label: 'Zimbabwe', phone: '263' },
    ]

    return countries
  }
  const getTransformFDModalDropdownType = (
    response,
    parentApiName = 'metric',
    dropdownFilterApiName = 'measure'
  ) => {
    let { data: { status = '', data = {} } = {} } = response || {}

    if (status.toLocaleLowerCase() === 'success') {
      const parentNode = data[parentApiName] || {}
      const { docs = [] } = parentNode || {}

      if (isEmpty(docs) === false) {
        const fiterData = docs.filter(item => item.status === true)
        const dropdownData = fiterData.map(item => {
          const itemSet = item[dropdownFilterApiName]
            ? item[dropdownFilterApiName]
            : []
          return `${itemSet}`
        })

        const [defaultFiterData = {}] =
          docs.filter(item => item.default === true) || []
        const defaultItem = defaultFiterData[dropdownFilterApiName]
          ? defaultFiterData[dropdownFilterApiName]
          : ''
        return { dropdownData, defaultItem }
      }
    } else {
      return {}
    }
  }

  exports.getTransformFDModalDropdownType = getTransformFDModalDropdownType
  exports.getTimeZoneData = getTimeZoneData
  exports.getPhoneCountryCodeData = getPhoneCountryCodeData
  exports.getDateValue = getDateValue
  exports.getDateKit = getDateKit
  exports.getCurrentTime = getCurrentTime
  exports.getCurrentDate = getCurrentDate
  exports.sortOnArrayObject = sortOnArrayObject
  exports.URL = URL
  exports.URLSearchParams = URLSearchParams
  exports.constructQueryString = constructQueryString
  exports.convertBooleanToString = convertBooleanToString
  exports.minifyString = minifyString
  exports.convertNumberToBoolean = convertNumberToBoolean
  exports.convertNumberToString = convertNumberToString
  exports.convertStringToBoolean = convertStringToBoolean
  exports.convertStringToNumber = convertStringToNumber
  exports.findIndexBasedOnFieldType = findIndexBasedOnFieldType
  exports.getDataType = getDataType
  exports.getFileFormatFromUrl = getFileFormatFromUrl
  exports.getGroupData = getGroupData
  exports.getHashAsObjectFromUrl = getHashAsObjectFromUrl
  exports.getLayerData = getLayerData
  exports.getLayerDataById = getLayerDataById
  exports.getLayerDataByName = getLayerDataByName
  exports.getQueryParamAsObjectFromUrl = getQueryParamAsObjectFromUrl
  exports.getTransformedComponentProperties = getTransformedComponentProperties
  exports.getValidClassNamesFromList = getValidClassNamesFromList
  exports.getValidString = getValidString
  exports.getValueFromObject = getValueFromObject
  exports.hyphenToCamelCase = hyphenToCamelCase
  exports.isDuplicateObject = isDuplicateObject
  exports.isArray = isArray
  exports.isArrayEqual = isArrayEqual
  exports.isBoolean = isBoolean
  exports.isEmpty = isEmpty
  exports.isEqual = isEqual
  exports.isEmptyArray = isEmptyArray
  exports.isEmptyObject = isEmptyObject
  exports.isEmptyString = isEmptyString
  exports.isNil = isNil
  exports.isNull = isNull
  exports.isNumber = isNumber
  exports.isObject = isObject
  exports.isObjectEqual = isObjectEqual
  exports.isString = isString
  exports.isTypeEq = isTypeEq
  exports.isUndefined = isUndefined
  exports.isValidFileFormat = isValidFileFormat
  exports.makeUrl = makeUrl
  exports.mergeObjects = mergeObjects
  exports.omit = omit
  exports.removeDuplicatesFromArray = removeDuplicatesFromArray
  exports.removeItemFromArray = removeItemFromArray
  exports.removeProtocol = removeProtocol
  exports.replaceFromString = replaceFromString
  exports.replaceProtocol = replaceProtocol
  exports.transformPropertiesToStyleSheet = transformPropertiesToStyleSheet
  exports.sortDataInAscending = sortDataInAscending
  exports.sortNumberInAscending = sortNumberInAscending
  exports.sortNumberInDescending = sortNumberInDescending
  exports.sortDataInDescending = sortDataInDescending
  exports.getSeoUrlString = getSeoUrlString
  exports.getSeoUrlOEMString = getSeoUrlOEMString
  exports.getSeoUrlValueString = getSeoUrlValueString
  exports.IsJsonString = IsJsonString
  exports.IS_BROWSER = IS_BROWSER
  return exports
})({})

export { JSUtils }
export default JSUtils
