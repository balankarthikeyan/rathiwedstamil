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
  StyledSearchLocationFooterWrapper,
  StyledSearchLocationClear,
} from './styles'
import { useLocation } from './useLocation'

const filterList = ({ locationSearchText, locationList }) =>
  locationList.filter(item => {
    const textLocation = item.location.toLowerCase()
    const textSearchText = locationSearchText.toLowerCase()
    const textLocationCode = item.locationCode.toLowerCase()

    return (
      textLocation.includes(textSearchText) ||
      textLocationCode.includes(textSearchText)
    )
  })

const handleSelectAll = props => {
  const { locationList, locationSearchText, setSelectAll } = props

  const isFilteredAllSelected = locationList.filter(item => {
    const { selected = false } = item
    return selected === true
  })

  if (Utils.JSUtils.isEmpty(locationSearchText) === false) {
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
      locationList.length === isFilteredAllSelected.length ? true : false
    )
  }
}

const renderSearchBox = props => {
  const { locationSearchText, setLocationSearchText, SearchInputBoxRef } = props
  return (
    <StyledSearchInputMainWrapper>
      <IconGallery.SearchOutlined2 />
      <StyledSearchInputBox
        ref={SearchInputBoxRef}
        type="text"
        placeholder="Search"
        onChange={e => {
          const value = e.target.value.trim()
          setLocationSearchText(value)
        }}
      />
    </StyledSearchInputMainWrapper>
  )
}
const renderSearchList = props => {
  const {
    locationList,
    setLocationList,
    onUpdate,
    updateCount,
    locationSearchText,
    setSelectAll,
  } = props || {}
  const CheckItem = item => {
    const { location, selected = false } = item || {}
    return (
      <StyledSearchFormLabelWrapper>
        <FormLabel style={{ fontSize: 14, cursor: 'pointer' }}>
          <StyledSearchFormLabelCheckbox
            defaultChecked={selected}
            onChange={() => {
              const data = locationList.filter(
                item => item.location === location
              )
              const { selected = false } = data[0]
              data[0]['selected'] = !selected
              setLocationList([...locationList])

              handleSelectAll(props)
              onUpdate({ locationList })
              updateCount({
                location: locationList,
              })
            }}
          />
          {location}
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
    locationList,
    setLocationList,
    onUpdate,
    updateCount,
    isSelectAll,
    setSelectAll,
    setLocationSearchText,
    SearchInputBoxRef,
    locationSearchText,
  } = props || {}

  const isFilter = locationList.filter(item => item.selected === true)

  let isLocalSelect = isFilter.length === 0 ? false : isSelectAll

  if (locationSearchText.length > 0 === false) {
    isLocalSelect = !(locationList.length > isFilter.length)
  }
  const isFilteredAllSelected = locationList.filter(item => {
    const { selected = false } = item
    return selected === true
  })

  const ClearButton = () => (
    <StyledSearchLocationClear
      onClick={() => {
        let updatedList = []
        if (Utils.JSUtils.isEmpty(locationSearchText) === false) {
          const existFiltered = filterList(props)
          updatedList = locationList.map(item => {
            const { location, selected = false } = item
            let isSelected = {}

            const isFilteredAllSelected = existFiltered.filter(itemInner => {
              return itemInner.location === location
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
          updatedList = locationList.map(item => {
            return {
              ...item,
              selected: false,
            }
          })
        }
        setLocationList([...updatedList])
        setSelectAll(false)
        // SearchInputBoxRef.current.value = ''
        // setLocationSearchText('')

        onUpdate({ locationList: updatedList })
        updateCount({
          location: updatedList,
        })
      }}
    >
      {'Clear'}
    </StyledSearchLocationClear>
  )

  return (
    <StyledSearchLocationFooterWrapper>
      <FormLabel style={{ color: '#486CE2', fontSize: 14, cursor: 'pointer' }}>
        <StyledSearchFormLabelCheckbox
          key={isLocalSelect}
          defaultChecked={isLocalSelect}
          onChange={() => {
            setSelectAll(!isSelectAll)

            let selectedList = locationList
            // let selectedList =
            //   Utils.JSUtils.isEmpty(locationSearchText) === false
            //     ? filterList(props)
            //     : locationList

            let updatedList = selectedList.map((item, index) => {
              let isItemSelected = {}
              const { location } = item || {}
              if (Utils.JSUtils.isEmpty(locationSearchText) === false) {
                const searchFilteredList = filterList(props)
                let arr = searchFilteredList.filter(
                  filterItem => filterItem.location === location
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

            setLocationList([...updatedList])
            onUpdate({ locationList: updatedList })
            updateCount({
              location: updatedList,
            })
          }}
        />
        {'Select All'}
      </FormLabel>
      {!Utils.JSUtils.isEmpty(isFilteredAllSelected) && <ClearButton />}
    </StyledSearchLocationFooterWrapper>
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
    locationList,
    setLocationList,
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

  const isSelectedList = locationList.filter(item => item.selected === true)
  return (
    <SearchChipMainWrapper>
      {Utils.JSUtils.isEmpty(locationList) === false &&
        locationList.map((item, index) => {
          const { location = '', selected = false } = item || {}
          const LocationChipUI = () =>
            selected ? (
              <SearchChip
                label={location}
                deleteIcon={<IconGallery.XCircle />}
                className={`${selected ? 'active' : ''} ${
                  expanded ? 'expanded' : 'closed'
                }`}
                onDelete={() => {
                  const data = locationList.filter(
                    item => item.location === location
                  )
                  const { selected = false } = data[0]
                  data[0]['selected'] = false
                  setLocationList([...locationList])
                  handleSelectAll(props)
                  onUpdate({ locationList })
                  updateCount({
                    location: locationList,
                  })
                }}
              />
            ) : (
              <></>
            )
          return expanded ? (
            <LocationChipUI />
          ) : 3 > index ? (
            <LocationChipUI />
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
    locationList,
    setLocationList,
    socialList,
    onUpdate,
    count,
    setCount,
    updateCount,
    expandTrigger,
    setLocationSearchText,
  } = props || {}

  const handleClick = e => {
    setLocationSearchText('')
    handleExpandClick()
  }
  return (
    <StyledCardHeader className={'cls-header-kit'}>
      <StyledCardMenuHeader onClick={handleClick}>
        <p>{label}</p>
        <SearchIconButton onClick={handleClick}>
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
