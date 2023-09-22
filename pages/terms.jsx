import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import MuiLink from '@material-ui/core/Link'
import * as Adm from '@adm'

function Terms() {
  return (
    <Container style={{ padding: '0', minHeight: '80vh' }} maxWidth={false}>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Terms Condition page
        </Typography>
        <Adm.Link label="Home" href="/" />
      </Box>
    </Container>
  )
}

export { Terms }
export default Terms
