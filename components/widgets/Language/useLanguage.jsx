import React from 'react'
function useLanguage({ list }) {
  const [count, setCount] = React.useState(0)
  const [languageList, setLanguageList] = React.useState(list)
  const [languageSearchText, setLanguageSearchText] = React.useState('')
  const [isSelectAll, setSelectAll] = React.useState(false)

  const updateCount = props => {
    let innerCount = 0
    const { language } = props || {}
    const [x, y, z, ...rest] = [...language]
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
    updateCount({ language: languageList })
  }, [])

  return {
    count,
    setCount,
    languageList,
    setLanguageList,
    updateCount,
    languageSearchText,
    setLanguageSearchText,
    isSelectAll,
    setSelectAll,
  }
}

export { useLanguage }
