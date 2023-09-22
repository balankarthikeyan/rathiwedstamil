// export const endPoints = {
//   search: 'https://api.thenewsapi.com/v1/news/top',
// }
const corsIssue = 'https://secret-ocean-49799.herokuapp.com/'

const url =
  'https://51.141.165.88:9200' ||
  'https://pmmtseach.westus2.cloudapp.azure.com:9200' ||
  '//pmmtseach.westus2.cloudapp.azure.com:5601' ||
  ''

export const endPoints = {
  search: `${url}/_search`,
}

export const endPointsToken = {
  search: 'ViPUi2HQBvUNMnYA0xgfhzhGJmfPz66FZxX3eeIA',
}
