import React from 'react'
import * as IconGallery from '@iconsGallery'
import * as Adm from '@adm'
import * as Utils from '@utils'
import { Grid, FormLabel, Checkbox, Tooltip } from '@material-ui/core'
import { ExpandMoreIcon, ExpandLessIcon } from '@iconsGallery'
import {
  StyledCardHeader,
  StyledCardMenuHeader,
  SearchIconButton,
  SearchChipMainWrapper,
  SearchChip,
  MoreChip,
  StyledSocialTitle,
  StyledSearchListWrapper,
  StyledSearchInputMainWrapper,
  StyledSearchInputBox,
  StyledSearchFormLabelWrapper,
  StyledSearchFormLabelCheckbox,
  StyledSearchLanguageFooterWrapper,
  StyledSearchLanguageClear,
} from './styles'
import { useLanguage } from './useLanguage'

const filterList = ({ languageSearchText, languageList }) =>
  languageList.filter(item => {
    const textLanguage = item.language.toLowerCase()
    const textSearchText = languageSearchText.toLowerCase()
    const textLanguageCode = item.languageCode.toLowerCase()
    const textStateCode = item.stateCode.toLowerCase()
    const textRegionCode = item.regionCode.toLowerCase()
    const textCountryCode = item.countryCode.toLowerCase()

    return (
      textLanguage.includes(textSearchText) ||
      textLanguagecode.includes(textSearchText)
    )
  })

const handleSelectAll = props => {
  const { languageList, languageSearchText, setSelectAll } = props

  const isFilteredAllSelected = languageList.filter(item => {
    const { selected = false } = item
    return selected === true
  })

  if (Utils.JSUtils.isEmpty(languageSearchText) === false) {
    const existFiltered = filterList(props)
    const isFilteredAllSelected = existFiltered.filter(item => {
      const { selected = false } = item
      return selected === true
    })
    setSelectAll(
      existFiltered.length === isFilteredAllSelected.length ? true : false
    )
  } else {
    setSelectAll(
      languageList.length === isFilteredAllSelected.length ? true : false
    )
  }
}

const renderSearchBox = props => {
  const { languageSearchText, setLanguageSearchText, SearchInputBoxRef } = props
  return (
    <StyledSearchInputMainWrapper>
      <IconGallery.SearchOutlined2 />
      <StyledSearchInputBox
        ref={SearchInputBoxRef}
        type="text"
        placeholder="Search"
        onChange={e => {
          const value = e.target.value.trim()
          setLanguageSearchText(value)
        }}
      />
    </StyledSearchInputMainWrapper>
  )
}
const renderSearchList = props => {
  const {
    languageList,
    setLanguageList,
    onUpdate,
    updateCount,
    languageSearchText,
    setSelectAll,
  } = props || {}
  const CheckItem = item => {
    const { language, selected = false } = item || {}
    return (
      <StyledSearchFormLabelWrapper>
        <FormLabel style={{ fontSize: 14, cursor: 'pointer' }}>
          <StyledSearchFormLabelCheckbox
            defaultChecked={selected}
            onChange={() => {
              const data = languageList.filter(
                item => item.language === language
              )
              const { selected = false } = data[0]
              data[0]['selected'] = !selected
              setLanguageList([...languageList])

              handleSelectAll(props)
              onUpdate({ languageList })
              updateCount({
                language: languageList,
              })
            }}
          />
          {language}
        </FormLabel>
      </StyledSearchFormLabelWrapper>
    )
  }

  const filter = filterList(props)
  return (
    <StyledSearchListWrapper>
      {Utils.JSUtils.isEmpty(filter) === false ? (
        filter.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <CheckItem {...item} />
            </React.Fragment>
          )
        })
      ) : (
        <h3 style={{ padding: 10 }}>Not Found</h3>
      )}
    </StyledSearchListWrapper>
  )
}
const renderSearchFooter = props => {
  const {
    languageList,
    setLanguageList,
    onUpdate,
    updateCount,
    isSelectAll,
    setSelectAll,
    setLanguageSearchText,
    SearchInputBoxRef,
    languageSearchText,
  } = props || {}

  const isFilter = languageList.filter(item => item.selected === true)

  const isLocalSelect = isFilter.length === 0 ? false : isSelectAll

  const isFilteredAllSelected = languageList.filter(item => {
    const { selected = false } = item
    return selected === true
  })

  const ClearButton = () => (
    <StyledSearchLanguageClear
      onClick={() => {
        let updatedList = []
        if (Utils.JSUtils.isEmpty(languageSearchText) === false) {
          const existFiltered = filterList(props)
          updatedList = languageList.map(item => {
            const { language, selected = false } = item
            let isSelected = {}

            const isFilteredAllSelected = existFiltered.filter(itemInner => {
              return itemInner.language === language
            })

            if (Utils.JSUtils.isEmpty(isFilteredAllSelected) === false) {
              isSelected = { selected: false }
            }
            return {
              ...item,
              ...isSelected,
            }
          })
        } else {
          updatedList = languageList.map(item => {
            return {
              ...item,
              selected: false,
            }
          })
        }
        setLanguageList([...updatedList])
        setSelectAll(false)
        // SearchInputBoxRef.current.value = ''
        // setLanguageSearchText('')

        onUpdate({ updatedList })
        updateCount({
          language: updatedList,
        })
      }}
    >
      {'Clear'}
    </StyledSearchLanguageClear>
  )

  return (
    <StyledSearchLanguageFooterWrapper>
      <FormLabel style={{ color: '#486CE2', fontSize: 14, cursor: 'pointer' }}>
        <StyledSearchFormLabelCheckbox
          key={isLocalSelect}
          defaultChecked={isLocalSelect}
          onChange={() => {
            setSelectAll(!isSelectAll)

            let selectedList = languageList
            // let selectedList =
            //   Utils.JSUtils.isEmpty(languageSearchText) === false
            //     ? filterList(props)
            //     : languageList

            let updatedList = selectedList.map((item, index) => {
              let isItemSelected = {}
              const { language } = item || {}
              if (Utils.JSUtils.isEmpty(languageSearchText) === false) {
                const searchFilteredList = filterList(props)
                let arr = searchFilteredList.filter(
                  filterItem => filterItem.language === language
                )
                if (Utils.JSUtils.isEmpty(arr) === false) {
                  isItemSelected = { selected: !isSelectAll }
                }
              } else {
                isItemSelected = { selected: !isSelectAll }
              }
              return {
                ...item,
                ...isItemSelected,
              }
            })

            setLanguageList([...updatedList])
            onUpdate({ updatedList })
            updateCount({
              language: updatedList,
            })
          }}
        />
        {'Select All'}
      </FormLabel>
      {!Utils.JSUtils.isEmpty(isFilteredAllSelected) && <ClearButton />}
    </StyledSearchLanguageFooterWrapper>
  )
}
const renderSearchKit = props => {
  return (
    <>
      {renderSearchBox(props)}
      {renderSearchList(props)}
      {renderSearchFooter(props)}
    </>
  )
}

const renderChipList = props => {
  const {
    classes,
    expanded,
    setExpanded,
    handleExpandClick,
    label,
    languageList,
    setLanguageList,
    onUpdate,
    count,
    setCount,
    updateCount,
  } = props || {}

  let moreAttribute = {
    onClick: () => {
      handleExpandClick()
    },
    clickable: true,
  }

  if (0 < count) {
    moreAttribute = {
      ...moreAttribute,
      label: `+${count}`,
      className: 'cls-more-count',
    }
  } else {
    moreAttribute = {
      ...moreAttribute,
      className: 'cls-more-icon',
      icon: <IconGallery.MoreIcon />,
    }
  }

  const isSelectedList = languageList.filter(item => item.selected === true)
  return (
    <SearchChipMainWrapper>
      {Utils.JSUtils.isEmpty(languageList) === false &&
        languageList.map((item, index) => {
          const { language = '', selected = false } = item || {}
          const LanguageChipUI = () =>
            selected ? (
              <SearchChip
                label={language}
                deleteIcon={<IconGallery.XCircle />}
                className={`${selected ? 'active' : ''} ${
                  expanded ? 'expanded' : 'closed'
                }`}
                onDelete={() => {
                  const data = languageList.filter(
                    item => item.language === language
                  )
                  const { selected = false } = data[0]
                  data[0]['selected'] = false
                  setLanguageList([...languageList])
                  handleSelectAll(props)
                  onUpdate({ languageList })
                  updateCount({
                    language: languageList,
                  })
                }}
              />
            ) : (
              <></>
            )
          return expanded ? (
            <LanguageChipUI />
          ) : 3 > index ? (
            <LanguageChipUI />
          ) : (
            <></>
          )
        })}

      {expanded === false && (
        <>
          {isSelectedList.length > 0 ? (
            <Tooltip
              placement="bottom"
              title={0 < count ? 'Selected Items Available' : 'More'}
            >
              <MoreChip {...moreAttribute} />
            </Tooltip>
          ) : (
            <></>
          )}
        </>
      )}
    </SearchChipMainWrapper>
  )
}

export const customRenderHeader = props => {
  const {
    classes,
    expanded,
    setExpanded,
    handleExpandClick,
    label,
    languageList,
    setLanguageList,
    socialList,
    onUpdate,
    count,
    setCount,
    updateCount,
    expandTrigger,
  } = props || {}

  return (
    <StyledCardHeader className={'cls-header-kit'}>
      <StyledCardMenuHeader onClick={handleExpandClick}>
        <p>{label}</p>
        <SearchIconButton onClick={handleExpandClick}>
          {expanded ? (
            <IconGallery.UpArrowIcon2 />
          ) : (
            <IconGallery.DownArrowIcon2 />
          )}
        </SearchIconButton>
      </StyledCardMenuHeader>
      {renderChipList({ ...props })}
      {expanded && renderSearchKit({ ...props })}
    </StyledCardHeader>
  )
}

export const customRenderContainer = props => {
  const { classes, expanded, setExpanded, handleExpandClick, label } =
    props || {}

  return (
    <>
      <Grid className={'cls-acordion-container'}>
        {customRenderHeader({
          ...props,
        })}
      </Grid>
    </>
  )
}
