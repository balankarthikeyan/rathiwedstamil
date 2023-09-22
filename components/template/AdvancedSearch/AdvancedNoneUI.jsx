import React from 'react'
import { Typography, Grid, Button } from '@material-ui/core'
import * as IconGallery from '@iconsGallery'
import * as Adm from '@adm'
import * as Utils from '@utils'
import Router from 'next/router'
import {
  AdvancedSearchInputBox,
  AdvancedSearchTextBox,
  AdvancedSearchChipButton,
  AdvancedSearchTextWarning,
  AdvancedSearchClear,
  AdvancedSearchAlertWarning,
  AdvancedSearchSingleWrapper,
  AdvancedSearchLable,
} from './styles'

import * as GlobalFixture from '@fixture'
const { onSearchRenderProcessChip = () => '' } = GlobalFixture

const SearchChipList = props => {
  const {
    setSearchType,
    isSearchMax,
    setSearchMax,
    searchAdvancedContent,
    setSearchAdvancedContent,
    advancedSearchNoneTextBoxRef,
    setSearchResultData,
    getSearchResultData,
    setLoader,
  } = props || {}

  const { searchNoneList = [] } = searchAdvancedContent

  // console.log('searchNoneList', searchNoneList)

  return (
    <>
      {searchNoneList &&
        searchNoneList.map((item, index) => {
          return (
            <AdvancedSearchChipButton
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
                  searchNoneList.splice(index, 1)
                }

                const AdvancedsearchTextBoxDom =
                  advancedSearchNoneTextBoxRef?.current
                let value = AdvancedsearchTextBoxDom.value
                  .replaceAll('  ', '')
                  .replaceAll(',', '')
                  .trim()

                let searchTextWidthOld =
                  searchAdvancedContent.searchNoneList.join('').length +
                  value.length
                const count =
                  searchAdvancedContent.maxTextNoneCount - searchTextWidthOld
                setSearchAdvancedContent({
                  ...searchAdvancedContent,
                  searchNoneCount: count > 0 ? count : 0,
                  searchButtondisable: Utils.JSUtils.isEmpty(
                    searchAdvancedContent.searchNoneList
                  ),
                  searchNoneList: [...searchNoneList],
                  searchResultList: [...searchNoneList],
                })
                advancedSearchNoneTextBoxRef.current.setAttribute(
                  'maxlength',
                  count > 0 ? count : 0
                )

                if (searchNoneList.length > 0 === false) {
                  setSearchResultData({})
                } else {
                  if (searchAdvancedContent.issearchNoneEnable) {
                    // setLoader(true)
                    // getSearchResultData()
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

const AdvancedNoneUI = props => {
  const {
    setSearchType,
    searchAdvancedContent,
    setSearchAdvancedContent,
    advancedSearchNoneTextBoxRef,
    getSearchResultData,
    setSearchResultData,
    setLoader,
    isSearchMax,
    setSearchMax,
    searchChipParentBoxRef,
  } = props || {}

  React.useEffect(() => {
    const count =
      searchAdvancedContent.maxTextNoneCount -
      searchAdvancedContent.searchNoneList.join('').length +
      searchAdvancedContent.searchNoneText.replaceAll(',', '').length
    advancedSearchNoneTextBoxRef.current.setAttribute('maxlength', count)
  }, [isSearchMax])

  const handleKeyPressEnter = e => {
    if (e.keyCode == 13) {
      const eventProps = {
        event: e?.target,
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
      onSearchRenderProcessChip(eventProps)
    }
  }

  const handleClickClear = () => {
    advancedSearchNoneTextBoxRef.current.setAttribute(
      'maxlength',
      searchAdvancedContent.maxTextNoneCount
    )
    const count =
      searchAdvancedContent.maxTextNoneCount -
      searchAdvancedContent.searchNoneList.join('').length
    setSearchResultData({})
    advancedSearchNoneTextBoxRef.current.value = ''
    setSearchAdvancedContent({
      ...searchAdvancedContent,
      searchNoneList: [],
      searchResultList: [],
      searchNoneText: '',
      searchNoneCount: searchAdvancedContent.maxTextNoneCount,
      searchButtondisable: false,
    })
  }

  const handleOnChangeInput = e => {
    let state = {
      ...searchAdvancedContent,
    }
    let value = e.currentTarget.value.trim()

    const oldListValue = searchAdvancedContent?.searchNoneList.join('').length
    const presentValue = value.replaceAll(',', '').length
    const balance = searchAdvancedContent.maxTextNoneCount - oldListValue
    const total = balance + presentValue
    const count =
      searchAdvancedContent.maxTextNoneCount -
      (searchAdvancedContent.searchNoneList.join('').length + presentValue)
    setSearchAdvancedContent({
      ...searchAdvancedContent,
      searchNoneText: value,
      searchNoneCount: count > 0 ? count : 0,
      searchButtondisable: !value.length > 0,
    })

    if (100 <= presentValue) {
      setSearchMax(true)
    }
  }

  const InputKit = isSearchMax ? AdvancedSearchTextBox : AdvancedSearchInputBox
  return (
    <AdvancedSearchSingleWrapper>
      <div className="cls-search-box-innerwrapper">
        <div className="cls-search-box-kit">
          <AdvancedSearchLable>None of these keywords</AdvancedSearchLable>
          <SearchChipList {...props} />
          <InputKit
            rows={isSearchMax ? 3 : 1}
            disabled={
              searchAdvancedContent.maxTextNoneCount <=
              searchAdvancedContent?.searchNoneList.join('').length
            }
            className={`Advancedsearchtextbox ${
              searchAdvancedContent.maxTextNoneCount <=
              searchAdvancedContent?.searchNoneList.join('').length
                ? 'disabled'
                : ''
            }`}
            defaultValue={searchAdvancedContent?.searchText}
            onKeyDown={handleKeyPressEnter}
            onChange={handleOnChangeInput}
            ref={advancedSearchNoneTextBoxRef}
            type="text"
            placeholder="Keyword 3"
          />
        </div>
      </div>

      <AdvancedSearchTextWarning>
        {searchAdvancedContent.maxTextNoneCount >
        searchAdvancedContent?.searchNoneCount
          ? `Remaining limit -  ${searchAdvancedContent?.searchNoneCount}`
          : `Character limit -  ${searchAdvancedContent.maxTextNoneCount}`}
      </AdvancedSearchTextWarning>

      <AdvancedSearchAlertWarning
        icon={<IconGallery.WarningIcon />}
        label="Max Character Exceed"
        color="primary"
        className={`${
          Math.ceil(searchAdvancedContent.maxTextNoneCount * 0.01) <
          searchAdvancedContent?.searchNoneCount
            ? ''
            : 'active'
        }`}
      />
      {searchAdvancedContent?.searchNoneList.length > 0 && (
        <AdvancedSearchClear onClick={handleClickClear}>
          clear
        </AdvancedSearchClear>
      )}
    </AdvancedSearchSingleWrapper>
  )
}

export { AdvancedNoneUI }
