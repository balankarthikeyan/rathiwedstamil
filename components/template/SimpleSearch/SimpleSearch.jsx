import React from 'react'
import { Typography, Grid, Button } from '@material-ui/core'
import * as IconGallery from '@iconsGallery'
import * as Adm from '@adm'
import * as Utils from '@utils'
import Router from 'next/router'
import {
  SimpleSearchTextAreaWrapper,
  SimpleSearchTextContentWrapper,
  SimpleSearchSubmit,
  SimpleSearchIconButton,
  SimpleSearchInputBox,
  SimpleSearchTextBox,
  SimpleSearchChipButton,
  SimpleSearchTextWarning,
  SimpleSearchClear,
  SimpleSearchAlertWarning,
} from './styles'
import * as GlobalFixture from '@fixture'
const {
  transformSearchChip = () => '',
  onSearchRenderProcessChip = () => '',
} = GlobalFixture

const SearchChipList = props => {
  const {
    setSearchType,
    isSearchMax,
    setSearchMax,
    searchSimpleContent,
    setSearchSimpleContent,
    simpleSearchTextBoxRef,
    setSearchResultData,
    getSearchResultData,
    setLoader,
  } = props || {}

  const { searchList = [] } = searchSimpleContent

  return (
    <>
      {searchList &&
        searchList.map((item, index) => {
          return (
            <SimpleSearchChipButton
              key={index}
              label={item}
              className={`cls-${item}-kit`}
              deleteIcon={
                <IconGallery.CloseIcon2
                  style={{ width: '15px', height: '15px' }}
                />
              }
              onDelete={e => {
                if (index > -1) {
                  searchList.splice(index, 1)
                }

                const SimplesearchTextBoxDom = simpleSearchTextBoxRef?.current
                let value = SimplesearchTextBoxDom.value
                  .replaceAll('  ', '')
                  .replaceAll(',', '')
                  .trim()

                let searchTextWidthOld =
                  searchSimpleContent.searchList.join('').length + value.length
                const count =
                  searchSimpleContent.maxTextCount - searchTextWidthOld
                setSearchSimpleContent({
                  ...searchSimpleContent,
                  searchCount: count > 0 ? count : 0,
                  searchButtondisable: Utils.JSUtils.isEmpty(
                    searchSimpleContent.searchList
                  ),
                  searchList: [...searchList],
                  searchResultList: [...searchList],
                })
                simpleSearchTextBoxRef.current.setAttribute(
                  'maxlength',
                  count > 0 ? count : 0
                )

                if (searchList.length > 0 === false) {
                  setSearchResultData({})
                } else {
                  if (searchSimpleContent.issearchEnable) {
                    setLoader(true)
                    getSearchResultData()
                  }
                }
              }}
              color="primary"
            />
          )
        })}
    </>
  )
}

function SimpleSearch(props) {
  const {
    setSearchType,
    searchSimpleContent,
    setSearchSimpleContent,
    simpleSearchTextBoxRef,
    getSearchResultData,
    setSearchResultData,
    setLoader,
    renderChildren,
  } = props || {}
  const searchChipParentBoxRef = React.createRef()

  const [isSearchMax, setSearchMax] = React.useState(false)

  React.useEffect(() => {
    const count =
      searchSimpleContent.maxTextCount -
      searchSimpleContent.searchList.join('').length +
      searchSimpleContent.searchText.replaceAll(',', '').length
    simpleSearchTextBoxRef.current.setAttribute('maxlength', count)
  }, [])

  // React.useEffect(() => {
  //   if (searchSimpleContent.searchIntialEnable === true) {
  //     const inputTotal = searchSimpleContent.searchText
  //     const isComma = inputTotal.includes(',')

  //     if (isComma) {
  //       // let commaLength = inputTotal.split(',').length - 1
  //       // const maxTextCount =
  //       //   searchSimpleContent.maxTextCount + commaLength
  //       // const input =
  //       //   searchSimpleContent.searchList.join('').length +
  //       //   inputTotal.replaceAll(',', '').length

  //       const count =
  //         searchSimpleContent.maxTextCount + searchSimpleContent?.searchCount

  //       simpleSearchTextBoxRef.current.setAttribute('maxlength', count)
  //     } else {
  //       const count =
  //         searchSimpleContent.maxTextCount -
  //         searchSimpleContent.searchList.join('').length +
  //         searchSimpleContent.searchText.replaceAll(',', '').length
  //       simpleSearchTextBoxRef.current.setAttribute(
  //         'maxlength',
  //         searchSimpleContent.maxTextCount < count
  //           ? searchSimpleContent.maxTextCount
  //           : count
  //       )
  //     }
  //   }
  // }, [searchSimpleContent.searchText])

  React.useEffect(() => {
    let width = 0
    const chipListSetDOM =
      searchChipParentBoxRef?.current.querySelectorAll(
        '.cls-search-box-kit .MuiChip-root'
      ) || []
    const chipListSetParentDOM =
      searchChipParentBoxRef?.current.querySelector('.cls-search-box-kit ') ||
      []

    const chipListSetParentWidth = chipListSetParentDOM.clientWidth

    if (chipListSetDOM && chipListSetDOM.length > 0) {
      chipListSetDOM.forEach(item => {
        const itemWidth = item.clientWidth + 10
        width = width + itemWidth
      })
    }
    const chipWidthCalc = Math.round((width / chipListSetParentWidth) * 100)
    setSearchMax(chipWidthCalc >= 80)
  }, [searchSimpleContent?.searchList])

  React.useEffect(() => {
    if (isSearchMax && 6 <= searchSimpleContent?.searchList.length) {
      setTimeout(() => {
        document
          .querySelector('.cls-search-box-kit')
          .scrollTo(
            0,
            document.querySelector('.cls-search-box-kit').scrollHeight - 40
          )
      }, 200)
    }
  })

  const handleClickSubmit = async () => {
    const eventProps = {
      event: simpleSearchTextBoxRef?.current,
      searchContent: searchSimpleContent,
      setSearchContent: setSearchSimpleContent,
      searchInputRef: simpleSearchTextBoxRef,
      searchList: searchSimpleContent?.searchList,
      maxTextCount: searchSimpleContent?.maxTextCount,
      searchCount: searchSimpleContent?.searchCount,
      searchTextString: 'searchText',
      searchCountString: 'searchCount',
      searchListString: 'searchList',
    }

    const searchListData = onSearchRenderProcessChip(eventProps)
    setLoader(true)
    const Data = JSON.parse(JSON.stringify(searchListData))
    setSearchSimpleContent({
      ...searchSimpleContent,
      issearchEnable: true,
      searchResultList: Data,
    })
    getSearchResultData({ simplelist: searchListData })
  }

  const handleKeyPressEnter = e => {
    if (e.keyCode == 13) {
      const eventProps = {
        event: e?.target,
        searchContent: searchSimpleContent,
        setSearchContent: setSearchSimpleContent,
        searchInputRef: simpleSearchTextBoxRef,
        searchList: searchSimpleContent?.searchList,
        maxTextCount: searchSimpleContent?.maxTextCount,
        searchCount: searchSimpleContent?.searchCount,
        searchTextString: 'searchText',
        searchCountString: 'searchCount',
        searchListString: 'searchList',
      }

      onSearchRenderProcessChip(eventProps)
    }
  }

  const handleClickClear = () => {
    simpleSearchTextBoxRef.current.setAttribute(
      'maxlength',
      searchSimpleContent.maxTextCount
    )
    const count =
      searchSimpleContent.maxTextCount -
      searchSimpleContent.searchList.join('').length
    setSearchMax(false)
    setSearchResultData({})
    simpleSearchTextBoxRef.current.value = ''
    setSearchSimpleContent({
      ...searchSimpleContent,
      searchList: [],
      searchResultList: [],
      searchText: '',
      searchCount: searchSimpleContent.maxTextCount,
      searchButtondisable: false,
    })
  }

  const handleOnChangeInput = e => {
    let state = {
      ...searchSimpleContent,
    }
    let value = e.currentTarget.value.trim()

    const oldListValue = searchSimpleContent?.searchList.join('').length
    const presentValue = value.replaceAll(',', '').length
    const presentCount = value.split(',').length - 1

    const balance = searchSimpleContent.maxTextCount - oldListValue
    const total = balance + presentValue

    let count = searchSimpleContent.maxTextCount - (oldListValue + presentValue)

    // console.log('count', count)

    const commaLength = value.split(',').length - 1
    if (
      value.includes(',') &&
      searchSimpleContent.maxTextCount > presentValue
    ) {
      // console.log(searchSimpleContent.maxTextCount + commaLength)
      // simpleSearchTextBoxRef.current.setAttribute(
      //   'maxlength',
      //   searchSimpleContent.maxTextCount + commaLength
      // )
    }
    setSearchSimpleContent({
      ...searchSimpleContent,
      searchText: value,
      searchCount: count >= 0 ? count : 0,
      searchButtondisable: !value.length > 0,
      searchIntialEnable: true,
    })

    if (100 <= presentValue) {
      setSearchMax(true)
    }
  }

  const InputKit = isSearchMax ? SimpleSearchTextBox : SimpleSearchInputBox

  return (
    <>
      <SimpleSearchTextContentWrapper ref={searchChipParentBoxRef}>
        <SimpleSearchTextAreaWrapper
          className={`${isSearchMax ? 'cls-seach-max-active' : ''}`}
        >
          <div className="cls-search-box-innerwrapper">
            <div className="cls-search-box-kit">
              <SearchChipList {...props} />
              <InputKit
                rows={isSearchMax ? 3 : 1}
                disabled={
                  searchSimpleContent.maxTextCount <=
                  searchSimpleContent?.searchList.join('').length
                }
                className={`Simplesearchtextbox ${
                  searchSimpleContent.maxTextCount <=
                  searchSimpleContent?.searchList.join('').length
                    ? 'disabled'
                    : ''
                }`}
                defaultValue={searchSimpleContent?.searchText}
                onKeyDown={handleKeyPressEnter}
                onChange={handleOnChangeInput}
                ref={simpleSearchTextBoxRef}
                type="text"
                placeholder="Please enter Company Name, Topic, Individual or Keywords"
              />
            </div>
          </div>
          <SimpleSearchIconButton
            onClick={() => {
              setSearchMax(!isSearchMax)
              simpleSearchTextBoxRef.current.focus()
            }}
          >
            {isSearchMax === false ? (
              <IconGallery.MaxmizeAddIcon />
            ) : (
              <IconGallery.MinmizeAddIcon />
            )}
          </SimpleSearchIconButton>
          <SimpleSearchTextWarning>
            {searchSimpleContent.maxTextCount > searchSimpleContent?.searchCount
              ? `Remaining limit -  ${searchSimpleContent?.searchCount}`
              : `Character limit -  ${searchSimpleContent.maxTextCount}`}
          </SimpleSearchTextWarning>

          <SimpleSearchAlertWarning
            icon={<IconGallery.WarningIcon />}
            label="Max Character Exceed"
            color="primary"
            className={`${
              Math.ceil(searchSimpleContent.maxTextCount * 0.01) <
              searchSimpleContent?.searchCount
                ? ''
                : 'active'
            }`}
          />
          {searchSimpleContent?.searchList.length > 0 && (
            <SimpleSearchClear onClick={handleClickClear}>
              clear
            </SimpleSearchClear>
          )}
        </SimpleSearchTextAreaWrapper>

        <SimpleSearchSubmit
          variant="contained"
          color="primary"
          disabled={searchSimpleContent?.searchList.length > 0 === false}
          onClick={handleClickSubmit}
        >
          Search
        </SimpleSearchSubmit>
      </SimpleSearchTextContentWrapper>
      <br />
      <br />
      {renderChildren()}
    </>
  )
}

export { SimpleSearch }
export default SimpleSearch
