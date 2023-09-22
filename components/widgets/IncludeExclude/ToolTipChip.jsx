import React from 'react'
import {
  Button,
  Grid,
  Typography,
  Menu,
  IconButton,
  Chip,
} from '@material-ui/core'
import * as Adm from '@adm'
import * as Utils from '@utils'
import * as IconGallery from '@iconsGallery'
import styled from 'styled-components'

const StyledRadioButton = styled(Button)`
  font-size: 12px !important;
  text-transform: capitalize !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  // z-index: 1302 !important;
  font-weight: normal !important;
  font-style: oblique !important;
  color: #676767 !important;

  &.exclude {
    svg {
      #Ellipse_13 {
        stroke: #d8373f;
      }
      #Ellipse_14 {
        fill: #d8373f;
        stroke: #d8373f;
      }
    }
  }
`

const StyledMenu = styled(Menu)`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  .MuiPaper-elevation0 {
    transform-origin: 0px 0px !important;
    box-shadow: 2px 2px 7px #00000036 !important;
    border: 1px solid #eceff3;
    width: 100%;
    max-width: 420px;
  }
  .MuiMenu-list {
    padding: 0 !important;
  }
`
const StyledMenuHeader = styled(Grid)`
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  color: #62aa47 !important;
  padding: 0px 26px 0px 6px !important;
  font-size: 12px;

  &.exclude {
    color: #d8373f !important;
  }
`
const StyledMenuHeaderIcon = styled(IconButton)`
  width: 24px !important;
  height: 24px !important;
  padding: 0 !important;

  svg path {
    fill: #62aa47;
  }

  &.exclude {
    svg path {
      fill: #d8373f;
    }
  }
`

const StyledChipWrapper = styled(Grid)`
  width: 100%;
  padding: 10px;
  max-height: 200px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #486ce2;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #7292fd;
  }
`
const SearchChip = styled(Chip)`
  margin-right: 4px;
  margin-bottom: 4px;
  height: 24px;
  border: 0;
  background: #d7e9d0;
  color: #000;
  font-size: 12px;

  &.closed {
    max-width: 120px;
  }
  .MuiChip-deleteIcon {
    color: #000;
    width: 16px;
    height: 16px;
  }

  &.active {
    background: #d7e9d0;
    color: #000;
  }
  &:hover {
    background: #d7e9d0;
    color: #000;
  }
  &.exclude {
    background: #ea8f94;
    color: #000;
    &.active {
      background: #ea8f94;
      color: #000;
    }
    &:hover {
      background: #ea8f94;
      color: #000;
    }
  }
  @media (max-width: 1400px) {
    &.closed {
      max-width: 80px;
    }
  }
`

function ToolTipChip(props) {
  const {
    elevationIdx = 0,
    list = [],
    onUpdate = () => '',
    title = 'Included Keywords',
    type = 'include',
    defaultAnchorEl = null,
    defaultIsOpen = null,
  } = props || {}
  const [isOpen, setOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [chipList, setChipList] = React.useState(list)

  React.useEffect(() => {
    setOpen(defaultIsOpen)
  }, [defaultIsOpen])

  React.useEffect(() => {
    setAnchorEl(defaultAnchorEl)
  }, [defaultAnchorEl])

  React.useEffect(() => {
    setChipList(list)
  }, [list])

  const renderHeader = () => {
    return (
      <StyledRadioButton
        className={`${type} cls-radiobutton-${type}`}
        onClick={event => {
          setOpen(!isOpen)
          setAnchorEl(event.currentTarget)
        }}
      >
        <IconGallery.RadioSelectIcon />
        <span style={{ marginLeft: 10 }}>{title}</span>
      </StyledRadioButton>
    )
  }

  const renderContainer = () => {
    return (
      <StyledMenu
        className={type}
        elevation={elevationIdx}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        keepMounted
        open={isOpen}
        onClose={() => {
          setOpen(false)
        }}
      >
        <StyledMenuHeader className={type}>
          <StyledMenuHeaderIcon
            className={type}
            onClick={() => {
              setOpen(false)
            }}
          >
            <IconGallery.DownArrowIcon2 />
          </StyledMenuHeaderIcon>

          <span>{title}</span>
        </StyledMenuHeader>
        <StyledChipWrapper>
          {!Utils.JSUtils.isEmpty(chipList) ? (
            chipList.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <SearchChip
                    className={type}
                    label={item}
                    deleteIcon={<IconGallery.XCircle />}
                    onDelete={() => {
                      if (index > -1) {
                        chipList.splice(index, 1)
                      }
                      onUpdate({ value: chipList })
                    }}
                  />
                </React.Fragment>
              )
            })
          ) : (
            <>
              <h2>No Keywords</h2>
              <p>Please add the keyword in above text box</p>
            </>
          )}
        </StyledChipWrapper>
      </StyledMenu>
    )
  }
  return (
    <>
      {renderHeader()}
      {renderContainer()}
    </>
  )
}

export { ToolTipChip }

export default ToolTipChip
