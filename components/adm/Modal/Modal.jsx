import React from "react"
import {
  Checkbox,
  FormControlLabel,
  Button,
  Radio,
  RadioGroup,
  TextField as MuiTextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@material-ui/core"
import Styled from "styled-components"
export const DialogContentWrapper = Styled(DialogContent)`
  height: 300px;
  position: relative;
`
const defaultRenderButton = ({ isDialogOpen, setDialogOpen }) => {
  return (
    <Button
      onClick={() => {
        setDialogOpen(true)
      }}
      variant="contained"
      style={{ marginBottom: "10px" }}
    >
      Click Me
    </Button>
  )
}
const defaultRenderOverlayWrapper = ({ isDialogOpen, setDialogOpen }) => {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={() => setDialogOpen(false)}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="sm"
      m={2}
    >
      <DialogTitle id="form-dialog-title" style={{ fontWeight: "500" }}>
        Title
      </DialogTitle>
      <DialogContentWrapper>
        sdlkkhshdgidhsgopihsogihosdihgoihogihsdgh
      </DialogContentWrapper>
    </Dialog>
  )
}

function Modal(props) {
  const {
    renderButton = defaultRenderButton,
    renderOverlayWrapper = defaultRenderOverlayWrapper,
    defaultDialogOpen = false,
  } = props || {}

  const [isDialogOpen, setDialogOpen] = React.useState(false)

  React.useEffect(() => {
    setDialogOpen(defaultDialogOpen)
  }, [defaultDialogOpen])

  const stateProps = { isDialogOpen, setDialogOpen }

  return (
    <>
      {renderButton(stateProps)}
      {renderOverlayWrapper(stateProps)}
    </>
  )
}

export { Modal }
export default Modal
