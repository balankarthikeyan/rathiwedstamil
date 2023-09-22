import { FacetCell } from "./FacetCell"
export const onAdd = ({ attributeList, setAttributeList }) => {
  const newGridData = attributeList
  newGridData.data.push({ key: "", value: "" })
  setAttributeList({ ...newGridData })
}
export const updateValue = (
  value,
  index,
  { attributeList, setAttributeList }
) => {
  const newGridData = attributeList
  newGridData.data[index].value = value
  setAttributeList({ ...newGridData })
}
export const updateKey = (
  value,
  index,
  { attributeList, setAttributeList }
) => {
  const newGridData = { ...attributeList }
  newGridData.data[index].key = value
  setAttributeList({ ...newGridData })
}
export const onDelete = (index, { attributeList, setAttributeList }) => {
  const newGridData = attributeList.data
  newGridData.splice(index, 1)
  setAttributeList({
    ...attributeList,
    data: newGridData,
  })
}
