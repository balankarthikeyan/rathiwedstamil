import * as Utils from '@utils'

export const transformSearchChip = ({ value, searchList, maxTextCount }) => {
  let currentValue = [...searchList, ...value.split(',')]
  let stringMerge = ''
  let dataKit = []

  currentValue.filter(item => {
    if (maxTextCount > stringMerge.length && item.length > 0) {
      stringMerge = stringMerge + item
      if (stringMerge.length > maxTextCount) {
        dataKit.push(
          item.substring(item.length - (stringMerge.length - maxTextCount), 0)
        )
      } else {
        dataKit.push(item)
      }
    }
    return {}
  })

  return { dataKit }
}

export const onSearchRenderProcessChip = props => {
  const {
    event,
    searchContent,
    setSearchContent,
    searchInputRef,
    searchList,
    maxTextCount,
    searchCount,
    searchTextString = 'searchText',
    searchCountString = 'searchCount',
    searchListString = 'searchList',
  } = props || {}

  const AdvancedsearchTextBoxDom = event
  let value = AdvancedsearchTextBoxDom.value.trim().replaceAll('  ', '')

  const { dataKit = {} } =
    transformSearchChip({
      value,
      searchList: searchList,
      maxTextCount: maxTextCount,
    }) || {}

  if (value.length > 0) {
    const count = maxTextCount - dataKit.join('').length
    setTimeout(() => {
      let dataObj = {
        ...searchContent,
        searchButtondisable: maxTextCount >= dataKit.length ? true : false,
      }
      dataObj[searchTextString] = ''
      dataObj[searchCountString] = count > 0 ? count : 0
      dataObj[searchListString] = dataKit
      setSearchContent(dataObj)
    }, 100)

    searchInputRef.current.setAttribute('maxlength', searchCount)
    setTimeout(() => {
      AdvancedsearchTextBoxDom.value = ''
    }, 100)
  }
  return dataKit
}

export const transformModalSearch = props => {
  const { response = [] } = props || {}
  return Utils.JSUtils.isEmpty(response) === false
    ? response.map(item => {
        const { _source = {}, ...rest } = item || {}
        return { ...rest, ..._source }
      })
    : []
}

export const SearchBodyJson = props => {
  const {
    from = 0,
    size = 20,
    queryAnd = '',
    queryAny = '',
    queryNot = '',
    fields = ['title', 'description'],
    language = ['en'],
    country = ['us'],
    media = [],
    lte = 'now/d',
    gte = '',
    querySimple = '',
    type,
  } = props || {}

  let query = ''

  if (type === 0) {
    query = querySimple
  }

  if (type === 1) {
    let advancedQuery = []
    if (Utils.JSUtils.isEmpty(queryAnd) === false) {
      advancedQuery = [...advancedQuery, queryAnd]
    }
    if (Utils.JSUtils.isEmpty(queryAny) === false) {
      advancedQuery = [...advancedQuery, queryAny]
    }

    query = advancedQuery.join(' AND ')

    if (Utils.JSUtils.isEmpty(queryNot) === false) {
      query = query + queryNot
    }
  }
  // console.log('query>>>>', query)

  const api = {
    from: from,
    size: size,
    track_total_hits: true,
    query: {
      bool: {
        must: [
          {
            query_string: {
              query: query,
              fields,
            },
          },
          {
            range: {
              published_at: { gte, lte },
            },
          },
          {
            terms: { language },
          },
          {
            terms: { country },
          },
          {
            terms: { media },
          },
        ],
      },
    },
  }

  return api
}

export const transformModalQuery = props => {
  const { list = [], key = 'AND' } = props || {}
  let modal = list
  if (list.length > 0) {
    if (key === 'SIMPLE') {
      modal = list.map(text => {
        return `(${text})`
      })
      modal = modal.join(` AND `)
      return modal
    }
    if (key === 'AND' || key === 'OR') {
      modal = modal.join(` ${key} `)
      return `(${modal})`
    }
    if (key === 'NOT') {
      modal = modal.join(` AND `)
      return ` NOT (${modal})`
    }
  } else {
    return ''
  }
}
