import React from 'react'
import axios from 'axios'

function useAxios(props) {
  const { defaultSet = {} } = props || {}
  const [axiosApiData, setAxiosApiData] = React.useState({})

  React.useEffect(() => {}, [axiosApiData])
  const doGetAxios = async ({ url = '', body = {}, type = 'get' }) => {
    // withCredentials: false,
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
    try {
      let response = await axios[type](url, body, headers)
      setAxiosApiData(response)
      return response
    } catch (error) {
      // console.log('Axios Error', error)
      return { status: 'failed' }
    }
    // let responseData = {}
    // await axios[type](url, body)
    //   .then((response = {}) => {
    //     setAxiosApiData(response)
    //     responseData = response
    //   })
    //   .catch(error => {
    //     responseData = error
    //     console.log('Axios Error', error)
    //   })
  }
  return {
    axiosApiData,
    setAxiosApiData,
    doGetAxios,
  }
}

export { useAxios }
export default useAxios
