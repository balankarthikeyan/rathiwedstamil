import React from 'react'
function useLocation({ list }) {
  const [count, setCount] = React.useState(0)
  const [locationList, setLocationList] = React.useState(list)
  const [locationSearchText, setLocationSearchText] = React.useState('')
  const [isSelectAll, setSelectAll] = React.useState(false)

  const updateCount = props => {
    let innerCount = 0
    const { location } = props || {}
    const [x, y, z, ...rest] = [...location]
    rest.map(item => {
      const { selected = false } = item
      if (selected) {
        innerCount = innerCount + 1
      }
      return {}
    })
    setCount(innerCount)
  }

  React.useEffect(() => {
    updateCount({ location: locationList })
  }, [])

  return {
    count,
    setCount,
    locationList,
    setLocationList,
    updateCount,
    locationSearchText,
    setLocationSearchText,
    isSelectAll,
    setSelectAll,
  }
}

export { useLocation }
