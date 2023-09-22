import React from 'react'
import {
  Typography,
  Card,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Input,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CardActions,
  CardHeader,
  CardContent,
  Collapse,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  Edit,
  Slash,
  CheckCircleIcon,
  ExpandMoreIcon,
  ExpandLessIcon,
} from '@iconsGallery'

const useStyles = makeStyles({
  basicIconProperty: {
    color: 'rgba(158, 158, 158, 1)',
    fontSize: '20px',
  },
  iconUpDown: {
    fontSize: '20px',
    color: 'rgba(0, 0, 0, 1)',
  },
  dividerBottom: {
    border: '1px solid #ECEFF3',
  },
})

const defaultRenderHeader = props => {
  const {
    classes,
    collapseOpen,
    setCollapseOpen,
    expanded,
    setExpanded,
    handleExpandClick,
    updateData,
    resetData = () => '',
    isEditMode = true,
  } = props || {}
  return (
    <CardHeader
      className={expanded === false ? classes.dividerBottom : ''}
      title={props.label}
      action={
        <>
          {expanded === true ? (
            <IconButton onClick={handleExpandClick}>
              <ExpandLessIcon className={classes.iconUpDown} />
            </IconButton>
          ) : (
            <IconButton onClick={handleExpandClick}>
              <ExpandMoreIcon className={classes.iconUpDown} />
            </IconButton>
          )}
        </>
      }
    />
  )
}
const defaultRenderContainer = props => {
  return 'Container'
}
const defaultRenderFooter = props => {
  return <></>
}

function AccordianPanel(props) {
  const {
    isEditMode = true,
    isOpen = false,
    renderHeader = defaultRenderHeader,
    renderContainer = defaultRenderContainer,
    renderFooter = defaultRenderFooter,
    isEditView = true,
    label = 'Test',
    expandTrigger = () => '',
    ...remainingProps
  } = props || {}

  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(isOpen)

  React.useEffect(() => {
    setExpanded(isOpen)
  }, [isOpen])

  const handleExpandClick = () => {
    setExpanded(!expanded)
    expandTrigger(stateProps)
  }
  const stateProps = {
    classes,
    expanded,
    setExpanded,
    handleExpandClick,
    label,
    isEditMode,
    ...remainingProps,
  }

  return (
    <Card
      className={`base-accordion ${
        expanded === true ? 'active' : 'inactive'
      } cls-${label}-kit`}
    >
      {renderHeader(stateProps)}
      {expanded === true && renderContainer(stateProps)}
      {expanded === true && renderFooter(stateProps)}
    </Card>
  )
}

export { AccordianPanel }
export default AccordianPanel
