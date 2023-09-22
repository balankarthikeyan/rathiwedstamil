import React, { useState } from 'react'
import ToasterMaterial from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import { minWidth } from '@material-ui/system'
import { CheckCircleIcon } from '@iconsGallery'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  alertBox: {
    minWidth: '320px',
    fontSize: '14px',
    fontWeight: '400',
    borderRadius: '4px',
  },
}))

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />

function Toaster(props) {
  const {
    open: defaultOpen = false,
    type = '',
    message = '',
    autoCloseTrigger = () => {},
  } = props || {}
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  React.useEffect(() => {
    setOpen(defaultOpen)
  }, [defaultOpen])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
    autoCloseTrigger(false)
  }

  return (
    <div className={classes.root}>
      <ToasterMaterial
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={1200}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={type}
          elevation={6}
          className={classes.alertBox}
          variant="filled"
          iconMapping={{
            success: <CheckCircleIcon fontSize="inherit" />,
          }}
          style={{
            backgroundColor: type === 'success' ? '#43A047' : null,
          }}
        >
          {message}
        </Alert>
      </ToasterMaterial>
    </div>
  )
}

export { Toaster }
export default Toaster
