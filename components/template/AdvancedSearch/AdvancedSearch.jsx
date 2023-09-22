import React from 'react'
import { Typography, Grid, Button } from '@material-ui/core'
import * as IconGallery from '@iconsGallery'
import * as Adm from '@adm'
import * as Utils from '@utils'
import Router from 'next/router'
import {
  AdvancedSearchTextAreaWrapper,
  AdvancedSearchTextContentWrapper,
  AdvancedSearchSubmit,
  AdvancedSearchIconButton,
  AdvancedSearchInputBox,
  AdvancedSearchTextBox,
  AdvancedSearchChipButton,
  AdvancedSearchTextWarning,
  AdvancedSearchClear,
  AdvancedSearchAlertWarning,
  AdvancedSearchMultipleWrapper,
} from './styles'
import * as GlobalFixture from '@fixture'
const { onSearchRenderProcessChip = () => '' } = GlobalFixture

import { AdvancedAndUI } from './AdvancedAndUI'
import { AdvancedAnyUI } from './AdvancedAnyUI'
import { AdvancedNoneUI } from './AdvancedNoneUI'

function AdvancedSearch(props) {
  const {
    setSearchType,
    searchAdvancedContent,
    setSearchAdvancedContent,
    advancedSearchAndTextBoxRef,
    advancedSearchAnyTextBoxRef,
    advancedSearchNoneTextBoxRef,
    getSearchResultData,
    setSearchResultData,
    setLoader,
    renderChildren,
    onClickTrigger = () => '',
  } = props || {}
  const searchChipParentBoxRef = React.createRef()
  const [isSearchMax, setSearchMax] = React.useState(true)
  React.useEffect(() => {
    if (isSearchMax && 6 <= searchAdvancedContent?.searchAndList.length) {
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

  const onModalChipRespose = () => {
    const eventAndProps = {
      event: advancedSearchAndTextBoxRef?.current,
      searchContent: searchAdvancedContent,
      setSearchContent: setSearchAdvancedContent,
      searchInputRef: advancedSearchAndTextBoxRef,
      searchList: searchAdvancedContent?.searchAndList,
      maxTextCount: searchAdvancedContent?.maxTextAndCount,
      searchCount: searchAdvancedContent?.searchAndCount,
      searchTextString: 'searchAndText',
      searchCountString: 'searchAndCount',
      searchListString: 'searchAndList',
    }
    const searchAndListData = onSearchRenderProcessChip(eventAndProps)

    const eventAnyProps = {
      event: advancedSearchAnyTextBoxRef?.current,
      searchContent: searchAdvancedContent,
      setSearchContent: setSearchAdvancedContent,
      searchInputRef: advancedSearchAnyTextBoxRef,
      searchList: searchAdvancedContent?.searchAnyList,
      maxTextCount: searchAdvancedContent?.maxTextAnyCount,
      searchCount: searchAdvancedContent?.searchAnyCount,
      searchTextString: 'searchAnyText',
      searchCountString: 'searchAnyCount',
      searchListString: 'searchAnyList',
    }

    const searchAnyListData = onSearchRenderProcessChip(eventAnyProps)

    const eventNoneProps = {
      event: advancedSearchNoneTextBoxRef?.current,
      searchContent: searchAdvancedContent,
      setSearchContent: setSearchAdvancedContent,
      searchInputRef: advancedSearchNoneTextBoxRef,
      searchList: searchAdvancedContent?.searchNoneList,
      maxTextCount: searchAdvancedContent?.maxTextNoneCount,
      searchCount: searchAdvancedContent?.searchNoneCount,
      searchTextString: 'searchNoneText',
      searchCountString: 'searchNoneCount',
      searchListString: 'searchNoneList',
    }

    const searchNoneListData = onSearchRenderProcessChip(eventNoneProps)

    return { searchAndListData, searchAnyListData, searchNoneListData }
  }

  const handleClickSubmit = async () => {
    const {
      searchAndListData,
      searchAnyListData,
      searchNoneListData,
    } = onModalChipRespose()

    if (
      Utils.JSUtils.isEmpty(searchAndListData) === false ||
      Utils.JSUtils.isEmpty(searchAnyListData) === false ||
      Utils.JSUtils.isEmpty(searchNoneListData) === false
    ) {
      setLoader(true)
      const Data = JSON.parse(JSON.stringify(searchAndListData))
      // console.log('Data', Data)
      setSearchAdvancedContent({
        ...searchAdvancedContent,
        issearchAndEnable: true,
        issearchAnyEnable: true,
        issearchNoneEnable: true,
        searchResultList: [...Data],
      })

      console.log(searchAnyListData)
      getSearchResultData({
        andList: searchAndListData,
        anyList: searchAnyListData,
        notList: searchNoneListData,
      })
    }
  }

  const stateProps = {
    ...props,
    isSearchMax,
    setSearchMax,
  }
  const isAndNotEmpty = !Utils.JSUtils.isEmpty(
    searchAdvancedContent?.searchAndList
  )
  const isAnyNotEmpty = !Utils.JSUtils.isEmpty(
    searchAdvancedContent?.searchAnyList
  )
  const isNoneNotEmpty = !Utils.JSUtils.isEmpty(
    searchAdvancedContent?.searchNoneList
  )

  return (
    <AdvancedSearchTextContentWrapper ref={searchChipParentBoxRef}>
      <AdvancedSearchTextAreaWrapper
        className={`${isSearchMax ? 'cls-seach-max-active' : ''}`}
      >
        <AdvancedSearchMultipleWrapper>
          <AdvancedAndUI {...stateProps} />
          <AdvancedAnyUI {...stateProps} />
          <AdvancedNoneUI {...stateProps} />
        </AdvancedSearchMultipleWrapper>
        <AdvancedSearchIconButton
          onClick={() => {
            /**
             * @todo ProSearch CLick
             **/
            onClickTrigger(true)
            // setSearchMax(!isSearchMax)
            // advancedSearchAndTextBoxRef.current.focus()
          }}
        >
          {isSearchMax === false ? (
            <IconGallery.MaxmizeAddIcon />
          ) : (
            <IconGallery.MinmizeAddIcon />
          )}
        </AdvancedSearchIconButton>
      </AdvancedSearchTextAreaWrapper>
      <br />
      <br />
      {renderChildren()}
      <br />
      <AdvancedSearchSubmit
        variant="contained"
        color="primary"
        disabled={
          isAndNotEmpty
            ? false
            : isAnyNotEmpty
            ? false
            : isNoneNotEmpty
            ? false
            : true
        }
        onClick={handleClickSubmit}
      >
        Search
      </AdvancedSearchSubmit>
    </AdvancedSearchTextContentWrapper>
  )
}

export { AdvancedSearch }
export default AdvancedSearch
