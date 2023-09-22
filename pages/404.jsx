import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import MuiLink from '@material-ui/core/Link'
import * as Adm from '@adm'

function Notfound() {
  return (
    <Container style={{ padding: '0', minHeight: '80vh' }} maxWidth={false}>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Notfound Condition page
        </Typography>
        <Adm.Link label="Home" href="/" />
      </Box>
    </Container>
  )
}

export { Notfound }
export default Notfound
