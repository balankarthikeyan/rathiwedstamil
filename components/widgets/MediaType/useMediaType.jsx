import React from 'react'
function useMediaType({ media, social }) {
  const [count, setCount] = React.useState(0)
  const [mediaList, setMediaList] = React.useState(media)
  const [socialList, setSocialList] = React.useState(social)

  const updateCount = props => {
    let innerCount = 0
    const { media, social } = props || {}
    const [x, y, z, ...rest] = [...media, ...social]
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
    updateCount({ media: mediaList, social: socialList })
  }, [])

  return {
    count,
    setCount,
    mediaList,
    setMediaList,
    socialList,
    setSocialList,
    updateCount,
  }
}

export { useMediaType }
