import * as React from 'react'
import axios from 'axios'
import * as Utils from '@utils'
import * as GlobalFixture from '@fixture'
import Router from 'next/router'
import * as Api from '@api'
const { endPoints = {} } = Api || {}

const {
  transformSearchChip = () => '',
  transformModalSearch = () => '',
  transformModalQuery = () => '',
  SearchBodyJson = () => '',
} = GlobalFixture

const defaultSimpleSearch = {
  defaultSearchList: '',
  type: '',
  searchText: '',
  searchList: [],
  searchButtondisable: true,
  searchCount: 1000,
  maxTextCount: 1000,
  searchResultList: [],
  issearchEnable: false,
  searchIntialEnable: false,
}
const defaultAdvancedSearch = {
  defaultSearchAndList: '',
  type: '',
  searchAndText: '',
  searchAnyText: '',
  searchNoneText: '',
  searchAndList: [],
  searchAnyList: [],
  searchNoneList: [],
  searchButtondisable: true,
  maxTextAndCount: 5000,
  maxTextAnyCount: 5000,
  maxTextNoneCount: 5000,
  searchAndCount: 5000,
  searchAnyCount: 5000,
  searchNoneCount: 5000,
  searchResultList: [],
  issearchAndEnable: false,
}

function useSearchPageState(props) {
  const {
    media = [],
    social = [],
    location = [],
    language = [],
    timeLine = [],
  } = GlobalFixture

  const { axiosApiData, doGetAxios = () => '' } = Utils.useAxios() || {}
  const simpleSearchTextBoxRef = React.createRef()
  const advancedSearchAndTextBoxRef = React.createRef()
  const advancedSearchAnyTextBoxRef = React.createRef()
  const advancedSearchNoneTextBoxRef = React.createRef()
  const [isLoader, setLoader] = React.useState(false)
  const [isIntial, setIntial] = React.useState(false)
  const [mediaType, setMediaType] = React.useState({ media, social })
  const [fetchLocation, setFetchLocation] = React.useState(location)
  const [fetchLanguage, setFetchLanguage] = React.useState(language)
  const [fetchTimeLine, setFetchTimeLine] = React.useState(timeLine)
  const [advancedFilterList, setAdvancedFilterList] = React.useState({
    keyword: {
      includeExclude: {
        include: [],
        exclude: [],
      },
    },
  })
  const [searchType, setSearchType] = React.useState(0)

  const [alertMessage, setAlertMessage] = React.useState({
    type: 'success',
    message: 'Result Not Available',
    open: false,
  })

  const [searchSimpleContent, setSearchSimpleContent] = React.useState(
    defaultSimpleSearch
  )

  const [searchAdvancedContent, setSearchAdvancedContent] = React.useState(
    defaultAdvancedSearch
  )

  const [menuSelected, setMenuSelected] = React.useState({})

  const [searchResultData, setSearchResultData] = React.useState({})

  const getSearchResultData = async props => {
    const {
      simplelist = searchSimpleContent.searchList || [],
      andList = searchAdvancedContent.searchAndList || [],
      anyList = searchAdvancedContent.searchAnyList || [],
      notList = searchAdvancedContent.searchNoneList || [],
    } = props || {}

    if (
      simplelist.length > 0 ||
      andList.length > 0 ||
      anyList.length > 0 ||
      notList.length > 0
    ) {
      const { media = [], social = [] } = mediaType || {}

      const mediaListKit = [...media, ...social]

      const filterLocation = fetchLocation.filter(
        item => item.selected === true
      )
      const filterLanguage = fetchLanguage.filter(
        item => item.selected === true
      )
      const filterTimeLine = fetchTimeLine.filter(
        item => item.selected === true
      )

      const isSelectedMedia = Utils.JSUtils.isEmpty(
        mediaListKit.filter(item => item.selected === true)
      )
      const isSelectedLocation = Utils.JSUtils.isEmpty(filterLocation)
      const isSelectedLanguage = Utils.JSUtils.isEmpty(filterLanguage)
      const isSelectedTimeLine = Utils.JSUtils.isEmpty(filterTimeLine)

      let typeText = []
      if (
        isSelectedMedia ||
        isSelectedLocation ||
        isSelectedLanguage ||
        isSelectedTimeLine
      ) {
        if (isSelectedMedia) {
          typeText = [...typeText, 'Media']
        }
        if (isSelectedLocation) {
          typeText = [...typeText, 'Location']
        }
        if (isSelectedLanguage) {
          typeText = [...typeText, 'Language']
        }
        if (isSelectedTimeLine) {
          typeText = [...typeText, 'TimeLine']
        }

        typeText = typeText.join(',')

        setAlertMessage({
          type: 'error',
          message: `${typeText} Not Selected`,
          open: true,
        })
        setLoader(false)
        setSearchResultData({})
      } else {
        const provideUrl = endPoints?.search
        const mediaFilter = mediaListKit.filter(item => item.selected === true)
        const mediaTransform = mediaFilter.map(({ name }) => {
          return name
        })

        const [{ code: gte = '' }] = filterTimeLine || []
        const country = filterLocation.map(({ locationCode }) => {
          return locationCode
        })
        const language = filterLanguage.map(({ languageCode }) => {
          return languageCode
        })
        const querySimple = transformModalQuery({
          list: simplelist,
          key: 'SIMPLE',
        })
        const queryAnd = transformModalQuery({
          list: andList,
          key: 'AND',
        })
        const queryAny = transformModalQuery({ list: anyList, key: 'OR' })
        const queryNot = transformModalQuery({
          list: notList,
          key: 'NOT',
        })
        const url = provideUrl
        const body = SearchBodyJson({
          queryAnd,
          queryAny,
          queryNot,
          querySimple,
          gte,
          type: searchType,
          media: mediaTransform,
          country,
          language,
        })
        const type = 'post'
        const api = await doGetAxios({
          url,
          type,
          body,
        })

        const { status = 0, data: dataModal = {} } = api || {}
        const {
          hits: {
            hits: response = [],
            total: { value: totalValue = 0 } = {},
          } = {},
          meta = {},
        } = dataModal || {}
        const data = transformModalSearch({ response })
        if (data.length > 0 === false) {
          setAlertMessage({
            type: 'error',
            message: 'Result Not Available',
            open: true,
          })
        }

        if (status === 200 && data.length > 0) {
          await setSearchResultData({
            data,
            meta: { found: totalValue },
          })
          setLoader(false)
        } else {
          setSearchResultData({})
        }
        if (data.length > 0 === false) {
          setLoader(false)
        }
      }
    }
  }

  const intialRunSimpleSearch = () => {
    const { dataKit = {} } =
      transformSearchChip({
        value: searchSimpleContent.defaultSearchList,
        searchList: searchSimpleContent?.searchList,
        maxTextCount: searchSimpleContent.maxTextCount,
      }) || {}

    if (dataKit.length > 0) {
      const count = searchSimpleContent.maxTextCount - dataKit.join('').length
      setSearchSimpleContent({
        ...searchSimpleContent,
        searchList: dataKit,
        searchCount: count,
        searchButtondisable: Utils.JSUtils.isEmpty(dataKit),
      })
      setIntial(true)
    }
  }

  React.useEffect(() => {}, [searchSimpleContent.searchList])
  React.useEffect(() => {
    const { router = {} } = Router || {}
    const { query = {} } = router || {}
    const { searchTerm = '' } = query || {}
    intialRunSimpleSearch()
  }, [])

  const getSimpleSearchFetchedData = React.useCallback(() => {
    if (isIntial) {
      setLoader(true)
      getSearchResultData()
      setIntial(false)
    }
  }, [searchSimpleContent])

  React.useMemo(async () => {
    if (searchSimpleContent.searchList.length > 0) {
      await getSimpleSearchFetchedData()
    }
  }, [searchSimpleContent])

  return {
    searchType,
    setSearchType,
    searchSimpleContent,
    setSearchSimpleContent,
    simpleSearchTextBoxRef,
    menuSelected,
    setMenuSelected,
    getSearchResultData,
    searchResultData,
    setSearchResultData,
    isLoader,
    setLoader,
    mediaType,
    setMediaType,
    fetchLocation,
    setFetchLocation,
    fetchLanguage,
    setFetchLanguage,
    fetchTimeLine,
    setFetchTimeLine,
    alertMessage,
    setAlertMessage,
    searchAdvancedContent,
    setSearchAdvancedContent,
    advancedSearchAndTextBoxRef,
    advancedSearchAnyTextBoxRef,
    advancedSearchNoneTextBoxRef,
    advancedFilterList,
    setAdvancedFilterList,
  }
}

export { useSearchPageState }
