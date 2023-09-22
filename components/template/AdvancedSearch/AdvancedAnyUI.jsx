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
    advancedSearchAnyTextBoxRef,
    setSearchResultData,
    getSearchResultData,
    setLoader,
  } = props || {}

  const { searchAnyList = [] } = searchAdvancedContent

  return (
    <>
      {searchAnyList &&
        searchAnyList.map((item, index) => {
          return (
            <AdvancedSearchChipButton
              key={`${index}_any`}
              label={item}
              className={`cls-${item}-kit`}
              deleteIcon={
                <IconGallery.CloseIcon2
                  style={{ width: '15px', height: '15px' }}
                />
              }
              onDelete={e => {
                if (index > -1) {
                  searchAnyList.splice(index, 1)
                }

                const AdvancedsearchTextBoxDom =
                  advancedSearchAnyTextBoxRef?.current
                let value = AdvancedsearchTextBoxDom.value
                  .replaceAll('  ', '')
                  .replaceAll(',', '')
                  .trim()

                let searchTextWidthOld =
                  searchAdvancedContent.searchAnyList.join('').length +
                  value.length
                const count =
                  searchAdvancedContent.maxTextAnyCount - searchTextWidthOld
                setSearchAdvancedContent({
                  ...searchAdvancedContent,
                  searchAnyCount: count > 0 ? count : 0,
                  searchButtondisable: Utils.JSUtils.isEmpty(
                    searchAdvancedContent.searchAnyList
                  ),
                  searchAnyList: [...searchAnyList],
                  searchResultList: [...searchAnyList],
                })
                advancedSearchAnyTextBoxRef.current.setAttribute(
                  'maxlength',
                  count > 0 ? count : 0
                )

                if (searchAnyList.length > 0 === false) {
                  setSearchResultData({})
                } else {
                  if (searchAdvancedContent.issearchAnyEnable) {
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

const AdvancedAnyUI = props => {
  const {
    setSearchType,
    searchAdvancedContent,
    setSearchAdvancedContent,
    advancedSearchAnyTextBoxRef,
    getSearchResultData,
    setSearchResultData,
    setLoader,
    isSearchMax,
    setSearchMax,
    searchChipParentBoxRef,
  } = props || {}

  React.useEffect(() => {
    const count =
      searchAdvancedContent.maxTextAnyCount -
      searchAdvancedContent.searchAnyList.join('').length +
      searchAdvancedContent.searchAnyText.replaceAll(',', '').length
    advancedSearchAnyTextBoxRef.current.setAttribute('maxlength', count)
  }, [isSearchMax])

  const handleKeyPressEnter = e => {
    if (e.keyCode == 13) {
      const eventProps = {
        event: e?.target,
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
      onSearchRenderProcessChip(eventProps)
    }
  }

  const handleClickClear = () => {
    advancedSearchAnyTextBoxRef.current.setAttribute(
      'maxlength',
      searchAdvancedContent.maxTextAnyCount
    )
    const count =
      searchAdvancedContent.maxTextAnyCount -
      searchAdvancedContent.searchAnyList.join('').length
    setSearchResultData({})
    advancedSearchAnyTextBoxRef.current.value = ''
    setSearchAdvancedContent({
      ...searchAdvancedContent,
      searchAnyList: [],
      searchResultList: [],
      searchAnyText: '',
      searchAnyCount: searchAdvancedContent.maxTextAnyCount,
      searchButtondisable: false,
    })
  }

  const handleOnChangeInput = e => {
    let state = {
      ...searchAdvancedContent,
    }
    let value = e.currentTarget.value.trim()

    const oldListValue = searchAdvancedContent?.searchAnyList.join('').length
    const presentValue = value.replaceAll(',', '').length

    const balance = searchAdvancedContent.maxTextAnyCount - oldListValue
    const total = balance + presentValue
    const count =
      searchAdvancedContent.maxTextAnyCount -
      (searchAdvancedContent.searchAnyList.join('').length + presentValue)
    setSearchAdvancedContent({
      ...searchAdvancedContent,
      searchAnyText: value,
      searchAnyCount: count > 0 ? count : 0,
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
          <AdvancedSearchLable>Any of these keywords</AdvancedSearchLable>
          <SearchChipList {...props} />
          <InputKit
            rows={isSearchMax ? 3 : 1}
            disabled={
              searchAdvancedContent.maxTextAnyCount <=
              searchAdvancedContent?.searchAnyList.join('').length
            }
            className={`Advancedsearchtextbox ${
              searchAdvancedContent.maxTextAnyCount <=
              searchAdvancedContent?.searchAnyList.join('').length
                ? 'disabled'
                : ''
            }`}
            defaultValue={searchAdvancedContent?.searchText}
            onKeyDown={handleKeyPressEnter}
            onChange={handleOnChangeInput}
            ref={advancedSearchAnyTextBoxRef}
            type="text"
            placeholder="Keyword 2"
          />
        </div>
      </div>

      <AdvancedSearchTextWarning>
        {searchAdvancedContent.maxTextAnyCount >
        searchAdvancedContent?.searchAnyCount
          ? `Remaining limit -  ${searchAdvancedContent?.searchAnyCount}`
          : `Character limit -  ${searchAdvancedContent.maxTextAnyCount}`}
      </AdvancedSearchTextWarning>

      <AdvancedSearchAlertWarning
        icon={<IconGallery.WarningIcon />}
        label="Max Character Exceed"
        color="primary"
        className={`${
          Math.ceil(searchAdvancedContent.maxTextAnyCount * 0.01) <
          searchAdvancedContent?.searchAnyCount
            ? ''
            : 'active'
        }`}
      />
      {searchAdvancedContent?.searchAnyList.length > 0 && (
        <AdvancedSearchClear onClick={handleClickClear}>
          clear
        </AdvancedSearchClear>
      )}
    </AdvancedSearchSingleWrapper>
  )
}

export { AdvancedAnyUI }
