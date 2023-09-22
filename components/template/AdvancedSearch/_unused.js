React.useEffect(() => {
  // let width = 0
  // const chipListSetDOM =
  //   searchChipParentBoxRef?.current.querySelectorAll(
  //     '.cls-search-box-kit .MuiChip-root'
  //   ) || []
  // const chipListSetParentDOM =
  //   searchChipParentBoxRef?.current.querySelector('.cls-search-box-kit ') ||
  //   []
  // const chipListSetParentWidth = chipListSetParentDOM.clientWidth
  // if (chipListSetDOM && chipListSetDOM.length > 0) {
  //   chipListSetDOM.forEach(item => {
  //     const itemWidth = item.clientWidth + 10
  //     width = width + itemWidth
  //   })
  // }
  // const chipWidthCalc =
  //   Math.round((width / chipListSetParentWidth) * 100) >= 80
  // if (chipWidthCalc) {
  //   setSearchMax(true)
  // }
}, [searchAdvancedContent?.searchAnyList])

React.useEffect(() => {
  let width = 0
  const chipListSetDOM =
    searchChipParentBoxRef?.current.querySelectorAll(
      '.cls-search-box-kit .MuiChip-root'
    ) || []
  const chipListSetParentDOM =
    searchChipParentBoxRef?.current.querySelector('.cls-search-box-kit ') || []

  const chipListSetParentWidth = chipListSetParentDOM.clientWidth

  if (chipListSetDOM && chipListSetDOM.length > 0) {
    chipListSetDOM.forEach(item => {
      const itemWidth = item.clientWidth + 10
      width = width + itemWidth
    })
  }
  const chipWidthCalc = Math.round((width / chipListSetParentWidth) * 100) >= 80
  if (chipWidthCalc) {
    setSearchMax(true)
  }
}, [searchAdvancedContent?.searchAndList])
