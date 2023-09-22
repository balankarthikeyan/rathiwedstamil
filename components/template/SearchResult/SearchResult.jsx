import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import * as IconGallery from '@iconsGallery'
import * as Adm from '@adm'
import * as Utils from '@utils'
import {
  MainWrapper,
  EmptyWrapper,
  ResultWrapper,
  PanelRightWrapper,
  KeyMetricsWrapper,
  SlotsMainWrapper,
  KeyMetricsGraphWrapper,
  KeyMetricsHeading,
  KeyMetricsHeadingTotal,
  KeyMetricsList,
  ResultHead,
  ArticleWrapper,
  ArticleLeft,
  ArticleTitle,
  ArticleDescription,
  ArticleImage,
  ArticlePublished,
  ArticleMainWrapperList,
} from './styles'
import { PanelMenu } from './PanelMenu'

const imagePlaceholder =
  'https://via.placeholder.com/350x250&text=Not%20Available'

const EmptyUI = () => (
  <EmptyWrapper>
    <Adm.Abstract />
    <Adm.Abstract />
    <Adm.Abstract />
    <Adm.Abstract />
  </EmptyWrapper>
)

const keyMetricFormatter = num => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + ' ' + 'Thousand'
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + ' ' + 'Million'
  } else if (num < 900) {
    return num
  } else {
    return num
  }
}

const KeyMetrics = props => {
  const {
    menuSelected,
    setMenuSelected,
    searchSimpleContent,
    searchAdvancedContent,
    searchResultData,
    searchType,
    isIconEnable = false,
  } = props || {}
  const { meta: { found = 0 } = {} } = searchResultData || []
  let resultList = []

  if (searchType === 0) {
    resultList = searchSimpleContent?.searchResultList
  }
  if (searchType === 1) {
    resultList = searchAdvancedContent?.searchResultList
  }
  return (
    <>
      <KeyMetricsWrapper>
        <KeyMetricsHeading>Results</KeyMetricsHeading>
        <KeyMetricsHeadingTotal variant="h3">
          <span>{keyMetricFormatter(found)}</span>
          {isIconEnable && <IconGallery.TrendingUPIcon />}
        </KeyMetricsHeadingTotal>
        <KeyMetricsList>{resultList.join(', ')}</KeyMetricsList>
      </KeyMetricsWrapper>
      <KeyMetricsGraphWrapper>
        <KeyMetricsHeading>Results Over Time</KeyMetricsHeading>
        <h1>Coming Soon</h1>
      </KeyMetricsGraphWrapper>
    </>
  )
}

const Article = ({ item }) => {
  const {
    author = '',
    category = '',
    country = '',
    description = '',
    image = '',
    language = '',
    published_at = '',
    source = '',
    title = '',
    url = '',
  } = item || {}
  const { dateString, monthString, yearString, timeString } =
    Utils.JSUtils.getDateKit(published_at) || {}

  return (
    <ArticleWrapper>
      <ArticleLeft>
        <div>
          <a target="_blank" href={url}>
            <ArticleTitle variant="h3">{title}</ArticleTitle>
            <ArticleDescription>{description}</ArticleDescription>
          </a>
        </div>
        <ArticlePublished>
          <span>
            {`PUBLISHED ON ${dateString}/${monthString}/${yearString} | `}
            <a target="_blank" href={url}>
              {source}
            </a>
            | ONLINE NEWS
          </span>
        </ArticlePublished>
      </ArticleLeft>
      {!Utils.JSUtils.isEmpty(image) && (
        <a target="_blank" href={url}>
          <ArticleImage
            onError={e => (e.target.src = imagePlaceholder)}
            src={image}
          />
        </a>
      )}
    </ArticleWrapper>
  )
}
const ResultList = props => {
  const {
    menuSelected,
    setMenuSelected,
    searchSimpleContent,
    searchResultData,
  } = props || {}
  const { data = [] } = searchResultData || []
  return (
    <ArticleMainWrapperList>
      {!Utils.JSUtils.isEmpty(data) &&
        data.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Article item={item} />
            </React.Fragment>
          )
        })}
    </ArticleMainWrapperList>
  )
}

const Result = props => {
  return (
    <SlotsMainWrapper>
      <ResultHead>
        <h1>Top Results</h1>
      </ResultHead>
      <ResultList {...props} />
    </SlotsMainWrapper>
  )
}
const MainResultKit = props => {
  const { menuSelected, setMenuSelected, searchSimpleContent } = props || {}
  const { menuName = 'emty', activeMenuIdx = 0 } = menuSelected || {}
  return (
    <ResultWrapper>
      <PanelMenu
        onUpdate={pnlProps => {
          setMenuSelected({ ...pnlProps })
        }}
      />
      <PanelRightWrapper>
        {activeMenuIdx === 0 && <KeyMetrics {...props} />}
        {activeMenuIdx === 1 && <Result {...props} />}
      </PanelRightWrapper>
    </ResultWrapper>
  )
}

function SearchResult(props) {
  const { searchResultData } = props || {}

  return (
    <MainWrapper>
      {!Utils.JSUtils.isEmpty(searchResultData) ? (
        <MainResultKit {...props} />
      ) : (
        <EmptyUI />
      )}
    </MainWrapper>
  )
}

export { SearchResult }
export default SearchResult
