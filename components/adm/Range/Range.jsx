import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'

const useStyles = makeStyles({
  root: {
    width: 300,
  },
})

function Range(props) {
  const {
    rangeList = [0, 100],
    onUpdate = () => '',
    getAriaValueText = () => '',
    ...restProps
  } = props || {}
  const classes = useStyles()
  const [range, setRange] = React.useState(rangeList)

  React.useEffect(() => {
    setRange(rangeList)
  }, [rangeList])

  return (
    <div className={classes.root}>
      <Slider
        // value={range}
        onChange={(event, newValue) => {
          onUpdate(newValue)
          setRange(newValue)
        }}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={getAriaValueText}
        {...restProps}
      />
    </div>
  )
}
export { Range }
export default Range
