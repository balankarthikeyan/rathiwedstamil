import React from "react"
import { Grid } from "@material-ui/core"
import * as Deps from "./deps"
import { defaultList } from "./fixture"
import { FacetCell } from "./FacetCell"
import { CreateAttribute } from "./CreateAttribute"
import * as Utils from "@utils"

function FacetAttribute(props) {
  const { list = defaultList } = props || {}
  const [attributeList, setAttributeList] = React.useState({ data: list })
  const stateProps = { attributeList, setAttributeList }
  const isEmptyfilterset = attributeList.data.filter(
    (item) =>
      Utils.JSUtils.isEmpty(item.key) || Utils.JSUtils.isEmpty(item.value)
  )
  const renderAdd = () => (
    <CreateAttribute
      disabled={!Utils.JSUtils.isEmpty(isEmptyfilterset)}
      onClick={() => Deps.onAdd(stateProps)}
    />
  )
  return (
    <Grid container direction="column" justify="space-between">
      {Utils.JSUtils.isEmpty(attributeList.data) === false &&
        attributeList.data.map((item, idx) => {
          const { key, value, isDisableClose } = item || {}
          return idx % 2 === 0 ? (
            <Grid
              container
              direction="row"
              data-index={idx}
              justify="space-between"
            >
              <FacetCell
                idx={idx}
                keyText={key}
                valueText={value}
                removeRecord={(idx) => Deps.onDelete(idx, stateProps)}
                keyUpdate={(value, idx) =>
                  Deps.updateKey(value, idx, stateProps)
                }
                valueUpdate={(value, idx) =>
                  Deps.updateValue(value, idx, stateProps)
                }
                isDisableClose={isDisableClose}
              />
              {idx + 1 === attributeList.data.length ? (
                renderAdd()
              ) : (
                <FacetCell
                  idx={idx + 1}
                  keyText={attributeList.data[idx + 1].key}
                  valueText={attributeList.data[idx + 1].value}
                  removeRecord={(idx) => Deps.onDelete(idx, stateProps)}
                  keyUpdate={(value, idx) =>
                    Deps.updateKey(value, idx, stateProps)
                  }
                  valueUpdate={(value, idx) =>
                    Deps.updateValue(value, idx, stateProps)
                  }
                />
              )}
            </Grid>
          ) : (
            <React.Fragment />
          )
        })}
      {attributeList.data.length % 2 === 0 ? renderAdd() : <React.Fragment />}
    </Grid>
  )
}

export { FacetAttribute }
export default FacetAttribute
