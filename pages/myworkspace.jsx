import React from 'react'
import { Helmet } from 'react-helmet'
import { Container } from '@material-ui/core'
import * as Adm from '@adm'
import * as Template from '@template'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

function Myworkspace() {
  const [value, setValue] = React.useState('female')

  const handleChange = event => {
    setValue(event.target.value)
  }
  return (
    <Container style={{ padding: '0', maxHeight: '100vh' }} maxWidth={false}>
      <Helmet title={`Work space`} />
      <Template.WorkSpaceBanner />
      <br />
      <br />
      <br />
      <br />
    </Container>
  )
}

export { Myworkspace }
export default Myworkspace
