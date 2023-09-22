import React from 'react'
import { Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const BackDropOverLayStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 300,
    color: 'white',
  },
}))

function BackdropOverlay({ open }) {
  const classes = BackDropOverLayStyles()
  return (
    <Backdrop open={open} className={classes.backdrop}>
      <CircularProgress m={2} color="primary" />
    </Backdrop>
  )
}
export { BackdropOverlay }
export default BackdropOverlay
