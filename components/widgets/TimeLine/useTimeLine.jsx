import React from 'react'
function useTimeLine({ list }) {
  const [count, setCount] = React.useState(0)
  const [timeLineList, setTimeLineList] = React.useState(list)

  const updateCount = props => {
    let innerCount = 0
    const { timeLine } = props || {}
    const [x, y, z, ...rest] = [...timeLine]
    rest.map(item => {
      const { selected = false, name } = item
      if (selected) {
        innerCount = innerCount + 1
      }
      return {}
    })
    setCount(innerCount)
  }

  React.useEffect(() => {
    updateCount({ timeLine: timeLineList })
  }, [])

  return {
    count,
    setCount,
    timeLineList,
    setTimeLineList,
    updateCount,
  }
}

export { useTimeLine }
