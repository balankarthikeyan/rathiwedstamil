import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import styled from 'styled-components'
import * as IconsGallery from '@iconsGallery'
const QuantityMainWrapper = styled(Grid)`
  display: flex;
  align-items: center;
  cursor: pointer;
`
const QuantityCount = styled(Grid)`
  margin: 0 15px;
  font-family: Roboto;
  font-size: 20px;
`

const Quantity = props => {
  const { minLimt = 1, maxLimit = 20, onUpdate = () => {} } = props || {}
  const [isQuantity, setQuantity] = React.useState(minLimt)

  React.useEffect(() => {
    onUpdate({ isQuantity, setQuantity })
  }, [isQuantity])
  return (
    <QuantityMainWrapper>
      <IconsGallery.MinusIcon
        onClick={() => setQuantity(isQuantity <= 1 ? 1 : isQuantity - 1)}
      />
      <QuantityCount>{isQuantity}</QuantityCount>
      <IconsGallery.PlusIcon
        onClick={() =>
          setQuantity(isQuantity >= maxLimit ? maxLimit : isQuantity + 1)
        }
      />
    </QuantityMainWrapper>
  )
}

export { Quantity }
export default Quantity
