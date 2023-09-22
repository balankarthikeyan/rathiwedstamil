// React.useEffect(() => {
//   if (searchSimpleContent.searchIntialEnable === true) {
//     const inputTotal = searchSimpleContent.searchText
//     const isComma = inputTotal.includes(',')

//     if (isComma) {
//       // let commaLength = inputTotal.split(',').length - 1
//       // const maxTextCount =
//       //   searchSimpleContent.maxTextCount + commaLength
//       // const input =
//       //   searchSimpleContent.searchList.join('').length +
//       //   inputTotal.replaceAll(',', '').length

//       const count =
//         searchSimpleContent.maxTextCount + searchSimpleContent?.searchCount

//       simpleSearchTextBoxRef.current.setAttribute('maxlength', count)
//     } else {
//       const count =
//         searchSimpleContent.maxTextCount -
//         searchSimpleContent.searchList.join('').length +
//         searchSimpleContent.searchText.replaceAll(',', '').length
//       simpleSearchTextBoxRef.current.setAttribute(
//         'maxlength',
//         searchSimpleContent.maxTextCount < count
//           ? searchSimpleContent.maxTextCount
//           : count
//       )
//     }
//   }
// }, [searchSimpleContent.searchText])
