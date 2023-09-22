import React from "react"
import { Button } from "@material-ui/core"
import { AddIcon } from "@iconsGallery"
import styled from "styled-components"

const CreateButton = styled(Button)`
  width: 50%;
  background-color: rgba(21, 101, 192, 0.05);
  height: 75%;
`

function CreateAttribute(props) {
  const { onClick = () => "", disabled = false } = props || {}
  const createButtonAtrr = {
    variant: "contained",
    onClick,
    disabled,
    startIcon: <AddIcon color="primary" />,
  }
  return <CreateButton {...createButtonAtrr} />
}

export { CreateAttribute }
