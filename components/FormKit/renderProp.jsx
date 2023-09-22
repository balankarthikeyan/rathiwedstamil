import * as React from 'react'
import {
  Card,
  Divider,
  List,
  ListItem,
  IconButton,
  CardHeader,
  Collapse,
  TextField,
  Button,
  FormLabel,
  Grid,
  ListItemText,
  Chip,
  Box,
  Typography,
  MenuItem,
  Switch,
  Checkbox,
  Tooltip,
  TextareaAutosize,
} from '@material-ui/core'

import styled from 'styled-components'
import * as Adm from '@adm'
import * as IconsGallery from '@iconsGallery'
import * as Utils from '@utils'
const FormList = styled(Grid)`
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
  .cls-error p {
    bottom: -24px;
  }
`
const OptionalTextLabel = styled(Typography)`
  font-size: 12px;
  padding-left: 8px;
  color: #676767;
`
const SubTitleTextLabel = styled(Typography)`
  font-size: 12px;
  padding-left: 8px;
  color: #676767;
`
const StyledError = styled(Typography)`
  font-size: 12px;
  padding-left: 14px;
  color: #f44336;
  margin-top: 4px;
`
const IconWrapper = styled(Grid)`
  padding-right: 10px;
`
const StyledTextField = styled(TextField)`
  width: 100%;
  max-width: 400px;
  fieldset {
    border-color: #d8d8d8;
  }
  &.disabled {
    input {
      background: #e4e4e4;
    }
  }
`
const StyledTextareaAutosize = styled(TextareaAutosize)`
  min-height: 40px;
  font-family: 'Robato', Arial;
  font-size: 14px;
  border-color: #c4c4c4;
  padding: 5px;
  min-width: 400px;
  width: 100% !important;
  max-width: 700px;
  border-radius: 3px;

  &.cls-error-textarea {
    border-color: #f44336;
  }
  &::placeholder {
    color: #aeaeae;
  }
  &.disabled {
    input {
      background: #e4e4e4;
    }
  }
`
const FormLabelWrapper = styled.div.attrs({
  className: 'base-form-label-main-wrapper',
})`
  display: flex;
  width: 200px;
  color: black;
  padding: 10px;
  align-items: center;
  padding-left: 0;
`
const DetailedList = styled(Grid)`
  display: flex;
`

const renderIcon = iconProps => {
  let IconComponent = () => <React.Fragment />

  if (!Utils.JSUtils.isEmpty(iconProps)) {
    IconComponent = IconsGallery[iconProps]
  }

  return (
    !Utils.JSUtils.isEmpty(iconProps) && (
      <IconWrapper>
        <IconComponent />
      </IconWrapper>
    )
  )
}

const renderLabel = ({ label, icon, infoMessage, isOptional, subTitle }) => {
  return (
    <FormLabelWrapper>
      {renderIcon(icon)}
      <FormLabel>{label}</FormLabel>
      {Utils.JSUtils.isEmpty(subTitle) === false && (
        <SubTitleTextLabel>{`${subTitle}`}</SubTitleTextLabel>
      )}
      {isOptional === true && (
        <OptionalTextLabel>{`(Optional)`}</OptionalTextLabel>
      )}
      {infoMessage.length > 0 && (
        <Tooltip title={infoMessage}>
          <IconButton>
            <IconsGallery.InfoMaterial />
          </IconButton>
        </Tooltip>
      )}
    </FormLabelWrapper>
  )
}

export const renderFormList = ({ formUIProps }) => {
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    touched,
    values,
    formList,
    resultFormList,
    setResultFormList,
    localFormList,
    setLocalFormList,
    isDetailView,
    setFieldValue,
    isPasswordActive,
    setPasswordActive,
  } = formUIProps

  const defaultDynamic = () => 'Dynamic'
  const renderList = ({ list = [], prefix = 'default' }) =>
    list &&
    list.map((fieldItem, index) => {
      const {
        defaultValue,
        defaultChecked = false,
        identifer,
        inputType,
        label,
        placeholder,
        children = [],
        list = [],
        renderDynamic = defaultDynamic,
        renderTextTrue = 'Yes',
        renderTextFalse = 'No',
        disabled = false,
        icon = '',
        infoMessage = '',
        textBoxType,
        activeValue = 'text',
        isOptional,
        subTitle = '',
        url = '',
      } = fieldItem

      let IconComponent = () => <React.Fragment />

      if (!Utils.JSUtils.isEmpty(icon)) {
        IconComponent = IconsGallery[icon]
      }

      if (
        inputType === 'text' ||
        inputType === 'number' ||
        inputType === 'email' ||
        inputType === 'password'
      ) {
        return (
          <FormList
            key={`base-form-${index}`}
            className={`cls-${prefix}-${identifer} base-form-list-wrapper cls-form-${identifer.toLocaleLowerCase()}`}
          >
            {renderLabel({
              label,
              icon,
              infoMessage,
              isOptional,
              subTitle,
            })}
            {isDetailView ? (
              <Typography>{defaultValue}</Typography>
            ) : (
              <>
                <StyledTextField
                  type={
                    isPasswordActive === true && inputType === 'password'
                      ? 'text'
                      : inputType || 'text'
                  }
                  name={identifer}
                  placeholder={placeholder || `Enter ${label}`}
                  defaultValue={defaultValue}
                  error={Boolean(touched[identifer] && errors[identifer])}
                  helperText={touched[identifer] && errors[identifer]}
                  onBlur={props => {
                    handleBlur(props)
                  }}
                  onChange={props => {
                    setTimeout(() => {
                      handleChange(props)
                    }, 500)
                  }}
                  InputProps={{
                    endAdornment:
                      inputType === 'email' ? (
                        <IconsGallery.EmailIcon />
                      ) : inputType === 'password' ? (
                        <div
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            setPasswordActive(!isPasswordActive)
                          }}
                        >
                          {isPasswordActive ? (
                            <IconsGallery.VisibilityIcon />
                          ) : (
                            <IconsGallery.VisibilityOffIcon />
                          )}
                        </div>
                      ) : (
                        <React.Fragment />
                      ),
                  }}
                  variant="outlined"
                  size="small"
                  disabled={disabled}
                  className={`${disabled ? 'disabled' : ''}`}
                />
              </>
            )}
          </FormList>
        )
      } else if (inputType === 'textArea') {
        return (
          <FormList
            key={`base-form-${index}`}
            className={`cls-${prefix}-${identifer} base-form-list-wrapper cls-form-${identifer.toLocaleLowerCase()}`}
          >
            {renderLabel({
              label,
              icon,
              infoMessage,
              isOptional,
              subTitle,
            })}
            {isDetailView ? (
              <Typography>{defaultValue}</Typography>
            ) : (
              <>
                <StyledTextareaAutosize
                  rowsMin={3}
                  name={identifer}
                  placeholder={placeholder || `Enter ${label}`}
                  defaultValue={defaultValue}
                  error={Boolean(touched[identifer] && errors[identifer])}
                  helperText={touched[identifer] && errors[identifer]}
                  onBlur={props => {
                    handleBlur(props)
                  }}
                  onChange={props => {
                    // setTimeout(() => {
                    handleChange(props)
                    // }, 1000)
                  }}
                  variant="outlined"
                  size="small"
                  style={{ width: '300px' }}
                  disabled={disabled}
                  className={`${disabled ? 'disabled' : ''} ${
                    Boolean(touched[identifer] && errors[identifer])
                      ? 'cls-error-textarea'
                      : ''
                  }`}
                />
                {Boolean(touched[identifer] && errors[identifer]) && (
                  <StyledError>* is required</StyledError>
                )}
              </>
            )}
          </FormList>
        )
      } else if (inputType === 'link') {
        return (
          <FormList
            key={`base-form-${index}`}
            className={`cls-${prefix}-${identifer} base-form-list-wrapper cls-form-${identifer.toLocaleLowerCase()}`}
          >
            <Adm.Link label={label} href={defaultValue} />
          </FormList>
        )
      } else if (inputType === 'fieldset') {
        return (
          <fieldset
            key={`base-form-${index}`}
            className={`cls-${prefix}-${identifer} base-form-fieldset-list-wrapper cls-form-${identifer.toLocaleLowerCase()}`}
          >
            <legend>{label}</legend>
            <div className="base-form-fieldset-list-innerwrapper">
              {children &&
                renderList({
                  list: children,
                  prefix: 'fieldset',
                })}
            </div>
          </fieldset>
        )
      } else if (inputType === 'tabtextfield') {
        const attr = {
          activeMenuIdx: fieldItem.list.indexOf(activeValue),
          defaultValue: defaultValue,
          list,
          internalValidation: false,
          error:
            Boolean(touched[identifer] && errors[identifer]) === true
              ? errors[identifer]
              : '',
          onUpdate: tabtextfieldProps => {
            const obj = {}
            obj[identifer] = tabtextfieldProps
            setResultFormList({ ...resultFormList, ...obj })
            setFieldValue(identifer, tabtextfieldProps.value)
          },
        }
        return (
          <FormList
            key={`base-form-${index}`}
            className={`cls-${prefix}-${identifer} base-form-list-wrapper`}
          >
            {renderLabel({
              label,
              icon,
              infoMessage,
              isOptional,
              subTitle,
            })}
            {isDetailView ? (
              <Typography>{`${localFormList[identifer].type} ${
                localFormList[identifer].value
              }`}</Typography>
            ) : (
              <Adm.TabTextField {...attr} />
            )}
          </FormList>
        )
      } else if (inputType === 'tabDropdown') {
        const tabIndex = fieldItem.list.findIndex(
          item => item.tabName === defaultValue.tabName
        )
        const attr = {
          activeMenuIdx: tabIndex,
          list,
          onUpdate: tabDropdownProps => {
            const obj = {}
            obj[identifer] = tabDropdownProps
            setResultFormList({ ...resultFormList, ...obj })
          },
        }
        return (
          <FormList
            key={`base-form-${index}`}
            className={`cls-${prefix}-${identifer} base-form-list-wrapper`}
          >
            {renderLabel({
              label,
              icon,
              infoMessage,
              isOptional,
              subTitle,
            })}
            {isDetailView ? (
              <Typography>{'todo tabDropdown'}</Typography>
            ) : (
              <Adm.TabDropdown {...attr} />
            )}
          </FormList>
        )
      } else if (inputType === 'textFieldDropdown') {
        const attr = {
          textBoxType,
          activeMenuIdx: fieldItem.list.indexOf(activeValue),
          defaultValue: defaultValue,
          list,
          internalValidation: false,
          error:
            Boolean(touched[identifer] && errors[identifer]) === true
              ? errors[identifer]
              : '',
          onUpdate: tabtextfieldProps => {
            const obj = {}
            obj[identifer] = tabtextfieldProps
            setResultFormList({ ...resultFormList, ...obj })
            setFieldValue(identifer, tabtextfieldProps.value)
          },
        }
        return (
          <>
            <FormList
              key={`base-form-${index}`}
              className={`cls-${prefix}-${identifer} base-form-list-wrapper`}
            >
              {renderLabel({
                label,
                icon,
                infoMessage,
                isOptional,
                subTitle,
              })}
              {isDetailView ? (
                <Typography>{'todo textFieldDropdown'}</Typography>
              ) : (
                <Adm.TextFieldDropdown {...attr} />
              )}
            </FormList>
          </>
        )
      } else if (inputType === 'quantity') {
        return (
          <FormList
            key={`base-form-${index}`}
            className={`cls-${prefix}-${identifer} base-form-list-wrapper`}
          >
            {renderLabel({
              label,
              icon,
              infoMessage,
              isOptional,
              subTitle,
            })}
            {isDetailView ? (
              <Typography>{defaultValue}</Typography>
            ) : (
              <Adm.Quantity
                minLimt={defaultValue}
                onUpdate={({ isQuantity = 1 }) => {
                  const obj = {}
                  obj[identifer] = isQuantity
                  setResultFormList({
                    ...resultFormList,
                    ...obj,
                  })
                }}
              />
            )}
          </FormList>
        )
      } else if (inputType === 'calender') {
        return (
          <FormList
            key={`base-form-${index}`}
            className={`cls-${prefix}-${identifer} base-form-list-wrapper`}
          >
            {renderLabel({
              label,
              icon,
              infoMessage,
              isOptional,
              subTitle,
            })}
            {isDetailView ? (
              <Typography>{'todo calender'}</Typography>
            ) : (
              <>
                <Adm.Calender
                  date={localFormList[identifer].date}
                  time={localFormList[identifer].time}
                  error={
                    Boolean(touched[identifer] && errors[identifer]) === true
                      ? errors[identifer]
                      : ''
                  }
                  onUpdateCalender={calenderProps => {
                    const obj = {}
                    obj[identifer] = calenderProps
                    setResultFormList({
                      ...resultFormList,
                      ...obj,
                    })
                    setLocalFormList({
                      ...localFormList,
                      ...obj,
                    })
                  }}
                />
              </>
            )}
          </FormList>
        )
      } else if (inputType === 'dynamic') {
        return renderDynamic({ fieldItem, formUIProps })
      } else if (inputType === 'toggle') {
        return (
          <FormList
            key={`base-form-${index}`}
            className={`cls-${prefix}-${identifer} base-form-list-wrapper`}
          >
            {renderLabel({
              label,
              icon,
              infoMessage,
              isOptional,
              subTitle,
            })}
            {isDetailView ? (
              <Typography>
                {localFormList[identifer] ? renderTextTrue : renderTextFalse}
              </Typography>
            ) : (
              <Switch
                checked={localFormList[identifer]}
                value={localFormList[identifer]}
                onChange={switchProps => {
                  const obj = {}
                  obj[identifer] = switchProps.currentTarget.checked
                  setResultFormList({
                    ...resultFormList,
                    ...obj,
                  })
                  setLocalFormList({
                    ...localFormList,
                    ...obj,
                  })
                }}
              />
            )}
          </FormList>
        )
      } else if (inputType === 'disableText') {
        return (
          <FormList
            key={`base-form-${index}`}
            className={`cls-${prefix}-${identifer} base-form-list-wrapper`}
          >
            {renderLabel({
              label,
              icon,
              infoMessage,
              isOptional,
              subTitle,
            })}
            {isDetailView ? (
              <Typography>{defaultValue}</Typography>
            ) : (
              <>
                <StyledTextField
                  type="text"
                  name={identifer}
                  placeholder={placeholder || `Enter ${label}`}
                  value={defaultValue}
                  error={Boolean(touched[identifer] && errors[identifer])}
                  helperText={touched[identifer] && errors[identifer]}
                  variant="outlined"
                  size="small"
                  style={{ width: '300px' }}
                  disabled={true}
                  className={`${disabled ? 'disabled' : ''}`}
                />
              </>
            )}
          </FormList>
        )
      } else if (inputType === 'checkBox') {
        const checkAttr = {
          color: 'primary',
          name: identifer,
          defaultChecked,
          inputProps: {
            'aria-label': 'secondary checkbox',
          },
          onChange: e => {
            const obj = {}
            obj[identifer] = e.target.checked
            setResultFormList({ ...resultFormList, ...obj })
          },
        }
        return (
          <FormList
            key={`base-form-${index}`}
            className={`cls-${prefix}-${identifer} base-form-list-wrapper base-form-checkbox`}
          >
            <FormLabelWrapper>
              <FormLabel>
                <Checkbox {...checkAttr} />
                {label}
              </FormLabel>
            </FormLabelWrapper>
          </FormList>
        )
      } else if (inputType === 'dropdown') {
        return (
          <FormList
            key={`base-form-${index}`}
            className={`cls-${prefix}-${identifer} base-form-list-wrapper`}
          >
            {renderLabel({
              label,
              icon,
              infoMessage,
              isOptional,
              subTitle,
            })}
            {isDetailView ? (
              <Typography>{defaultValue}</Typography>
            ) : (
              <Adm.DropdownKit
                list={list}
                className={classes.formDropdown}
                placeholder={placeholder}
                name={values[identifer]}
                error={
                  Boolean(touched[identifer] && errors[identifer]) === true
                    ? errors[identifer]
                    : ''
                }
                defaultValue={defaultValue}
                onUpdate={dropdownKitProps => {
                  const obj = {}
                  obj[identifer] = dropdownKitProps.value
                  setFieldValue(identifer, dropdownKitProps.value)
                  setResultFormList({
                    ...resultFormList,
                    ...obj,
                  })
                }}
              />
            )}
          </FormList>
        )
      } else {
        return <React.Fragment key={`base-form-${index}`} />
      }
    })

  return <>{renderList({ list: formList })}</>
}
