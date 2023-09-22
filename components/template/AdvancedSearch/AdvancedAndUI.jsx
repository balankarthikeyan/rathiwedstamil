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
    advancedSearchAndTextBoxRef,
    setSearchResultData,
    getSearchResultData,
    setLoader,
  } = props || {}

  const { searchAndList = [] } = searchAdvancedContent

  return (
    <>
      {searchAndList &&
        searchAndList.map((item, index) => {
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
                  searchAndList.splice(index, 1)
                }

                const AdvancedsearchTextBoxDom =
                  advancedSearchAndTextBoxRef?.current
                let value = AdvancedsearchTextBoxDom.value
                  .replaceAll('  ', '')
                  .replaceAll(',', '')
                  .trim()

                let searchTextWidthOld =
                  searchAdvancedContent.searchAndList.join('').length +
                  value.length
                const count =
                  searchAdvancedContent.maxTextAndCount - searchTextWidthOld
                setSearchAdvancedContent({
                  ...searchAdvancedContent,
                  searchAndCount: count > 0 ? count : 0,
                  searchButtondisable: Utils.JSUtils.isEmpty(
                    searchAdvancedContent.searchAndList
                  ),
                  searchAndList: [...searchAndList],
                  searchResultList: [...searchAndList],
                })
                advancedSearchAndTextBoxRef.current.setAttribute(
                  'maxlength',
                  count > 0 ? count : 0
                )

                if (searchAndList.length > 0 === false) {
                  setSearchResultData({})
                } else {
                  if (searchAdvancedContent.issearchAndEnable) {
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

const AdvancedAndUI = props => {
  const {
    setSearchType,
    searchAdvancedContent,
    setSearchAdvancedContent,
    advancedSearchAndTextBoxRef,
    getSearchResultData,
    setSearchResultData,
    setLoader,
    isSearchMax,
    setSearchMax,
    searchChipParentBoxRef,
  } = props || {}

  React.useEffect(() => {
    const count =
      searchAdvancedContent.maxTextAndCount -
      searchAdvancedContent.searchAndList.join('').length +
      searchAdvancedContent.searchAndText.replaceAll(',', '').length
    advancedSearchAndTextBoxRef.current.setAttribute('maxlength', count)
  }, [isSearchMax])

  const handleKeyPressEnter = e => {
    if (e.keyCode == 13) {
      const eventProps = {
        event: e?.target,
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
      onSearchRenderProcessChip(eventProps)
    }
  }

  const handleClickClear = () => {
    advancedSearchAndTextBoxRef.current.setAttribute(
      'maxlength',
      searchAdvancedContent.maxTextAndCount
    )
    const count =
      searchAdvancedContent.maxTextAndCount -
      searchAdvancedContent.searchAndList.join('').length
    setSearchResultData({})
    advancedSearchAndTextBoxRef.current.value = ''
    setSearchAdvancedContent({
      ...searchAdvancedContent,
      searchAndList: [],
      searchResultList: [],
      searchAndText: '',
      searchAndCount: searchAdvancedContent.maxTextAndCount,
      searchButtondisable: false,
    })
  }

  const handleOnChangeInput = e => {
    let state = {
      ...searchAdvancedContent,
    }
    let value = e.currentTarget.value.trim()
    const oldListValue = searchAdvancedContent?.searchAndList.join('').length
    const presentValue = value.replaceAll(',', '').length
    const balance = searchAdvancedContent.maxTextAndCount - oldListValue
    const total = balance + presentValue
    const count =
      searchAdvancedContent.maxTextAndCount -
      (searchAdvancedContent.searchAndList.join('').length + presentValue)
    setSearchAdvancedContent({
      ...searchAdvancedContent,
      searchAndText: value,
      searchAndCount: count > 0 ? count : 0,
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
          <AdvancedSearchLable>All these keywords</AdvancedSearchLable>
          <SearchChipList {...props} />
          <InputKit
            rows={isSearchMax ? 3 : 1}
            disabled={
              searchAdvancedContent.maxTextAndCount <=
              searchAdvancedContent?.searchAndList.join('').length
            }
            className={`Advancedsearchtextbox ${
              searchAdvancedContent.maxTextAndCount <=
              searchAdvancedContent?.searchAndList.join('').length
                ? 'disabled'
                : ''
            }`}
            defaultValue={searchAdvancedContent?.searchText}
            onKeyDown={handleKeyPressEnter}
            onChange={handleOnChangeInput}
            ref={advancedSearchAndTextBoxRef}
            type="text"
            placeholder="Keyword 1"
          />
        </div>
      </div>

      <AdvancedSearchTextWarning>
        {searchAdvancedContent.maxTextAndCount >
        searchAdvancedContent?.searchAndCount
          ? `Remaining limit -  ${searchAdvancedContent?.searchAndCount}`
          : `Character limit -  ${searchAdvancedContent.maxTextAndCount}`}
      </AdvancedSearchTextWarning>

      <AdvancedSearchAlertWarning
        icon={<IconGallery.WarningIcon />}
        label="Max Character Exceed"
        color="primary"
        className={`${
          Math.ceil(searchAdvancedContent.maxTextAndCount * 0.01) <
          searchAdvancedContent?.searchAndCount
            ? ''
            : 'active'
        }`}
      />
      {searchAdvancedContent?.searchAndList.length > 0 && (
        <AdvancedSearchClear onClick={handleClickClear}>
          clear
        </AdvancedSearchClear>
      )}
    </AdvancedSearchSingleWrapper>
  )
}

export { AdvancedAndUI }
