import styled from 'styled-components'
import {
  Container,
  Typography,
  Button,
  Grid,
  IconButton,
  Chip,
  CardHeader,
} from '@material-ui/core'
const minHeightCss = `min-height: 540px;`

export const MainWrapper = styled(Grid)``
export const ResultWrapper = styled(Grid)`
  padding: 24px;
  width: 100%;

  background: #eceff3;
  display: flex;
  ${minHeightCss}
`
export const EmptyWrapper = styled(Grid)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 12px;
  width: 100%;
  padding: 24px;
  box-sizing: border-box;
  background: #eceff3;
  ${minHeightCss}
`

export const MenuMainWrapper = styled(Grid)`
  display: flex;
  width: 224px;
  height: 100%;
  padding: 26px 24px;
  background: #fff;
  ${minHeightCss}
`
export const MenuButton = styled(Grid)`
  cursor: pointer;
  color: #747474;
  font-weight: bold;
  &.selected {
    color: #486ce2;
    pointer-events: none;
  }
`
export const PanelRightWrapper = styled(Grid)`
  width: 100%;
  height: 100%;
  // background: #fff;
  margin-left: 20px;
`
export const SlotsMainWrapper = styled(Grid)`
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
`
export const KeyMetricsWrapper = styled(Grid)`
  width: 100%;
  min-height: 125px;
  background: #fff;
  margin-bottom: 20px;
  padding: 20px;
`
export const KeyMetricsGraphWrapper = styled(Grid)`
  width: 100%;
  background: #fff;
  padding: 20px;
  min-height: 394px;
`
export const KeyMetricsHeading = styled(Typography)`
  color: #666666;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 8px;
`

export const KeyMetricsHeadingTotal = styled(Typography)`
  font-size: 27px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  span {
    margin-right: 20px;
  }
`

export const KeyMetricsList = styled(Typography)`
  color: #d62884;
  font-size: 15px;
  font-weight: bold;
`

export const ResultHead = styled(Grid)`
  width: 100%;
  height: 40px;
  border-bottom: 2px solid #eceff3;
  h1 {
    color: #666666;
    font-size: 15px;
    font-weight: bold;
    padding: 0 10px;
  }
`

export const ArticleWrapper = styled.article`
  display: flex;
  padding: 20px;
  border-bottom: 2px solid #eceff3;
  min-height: 170px;
  a {
    text-decoration: none;
  }
  &:last-child {
    border-bottom: 0;
  }
`
export const ArticleLeft = styled.div`
  width: calc(100% - 220px);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const ArticleImage = styled.img`
  width: 200px;
  height: auto;
  margin-left: 20px;
  max-height: 132px;
`
export const ArticleTitle = styled(Typography)`
  color: #000;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  width: 75%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  @media (max-width: 1400px) {
    max-width: 90%;
    width: 90%;
  }
`
export const ArticleDescription = styled(Typography)`
  max-width: 75%;
  width: 75%;
  color: #000;
  font-size: 14px;
  margin-bottom: 15px;
  margin: 0 0 1em 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  @media (max-width: 1400px) {
    max-width: 90%;
    width: 90%;
  }
`
export const ArticleMainWrapperList = styled.div`
  height: 100%;
  // overflow: auto;
  margin-bottom: 10px;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #eceff3;
  }

  &::-webkit-scrollbar-thumb {
    background: #496ce1;
  }
`
export const ArticlePublished = styled(Grid)`
  max-width: 80%;
  color: #000;

  a {
    text-decoration: underline;
    text-transform: uppercase;
  }
  a,
  span {
    font-size: 14px;
    color: #000;
  }
`
