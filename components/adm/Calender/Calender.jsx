import React from 'react'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { useCalenderStyles } from './styles'
import { InputAdornment, Typography } from '@material-ui/core'
import { ArrowDropDownIcon } from '@iconsGallery'
import styled from 'styled-components'

const CalenderWrapper = styled.div`
  position: relative;
  &.cls-error {
    fieldset {
      border-color: rgb(244 67 53) !important;
    }
    .MuiSelect-selectMenu,
    .MuiSelect-icon {
      color: rgb(244 67 53);
    }
  }
`

const Error = styled(Typography)`
  color: #f44336;
  font-size: 0.6964285714285714rem;
  position: absolute;
  bottom: -8px;
  overflow: visible;
  transform: translateY(75%);
  left: 12px;
`
function Calender(props) {
  let {
    onUpdateCalender,
    isTimeEnable = true,
    date = '',
    time = '08:30',
    error = '',
  } = props || {}
  const classes = useCalenderStyles()

  const defaultDate = date
  const [selectedDate, setSelectedDate] = React.useState(date)
  const [selectedTime, setSelectedTime] = React.useState(time)

  React.useEffect(() => {
    setSelectedDate(date)
  }, [date])

  React.useEffect(() => {
    setSelectedTime(time)
  }, [time])

  const ISODateString = d => {
    const pad = n => (n < 10 ? '0' + n : n)
    return (
      d.getUTCFullYear() +
      '-' +
      pad(d.getUTCMonth() + 1) +
      '-' +
      pad(d.getUTCDate())
    )
  }

  const handleNativeDateChange = event => {
    let date = event.target.value
    setSelectedDate(date)
    let attr = { date: date }
    if (isTimeEnable) {
      attr['time'] = selectedTime
    }
    onUpdateCalender({ ...attr })
  }

  const handleTimeChange = event => {
    setSelectedTime(event.target.value)
    onUpdateCalender({ date: selectedDate, time: event.target.value })
  }

  return (
    <CalenderWrapper
      className={`base-calender-component ${error ? 'cls-error' : ''}`}
      style={{ display: 'flex' }}
    >
      <div>
        <TextField
          size="small"
          variant="outlined"
          id="date"
          type="date"
          value={selectedDate}
          className={`${classes.dateNative} cls-calender-date-native`}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleNativeDateChange}
        />
      </div>
      {isTimeEnable && (
        <div className={classes.time}>
          <TextField
            size="small"
            variant="outlined"
            id="time"
            type="time"
            value={selectedTime}
            className={classes.textField}
            onChange={handleTimeChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300,
            }}
          />
        </div>
      )}
      {error && <Error>{error}</Error>}
    </CalenderWrapper>
  )
}
export { Calender }
export default Calender
