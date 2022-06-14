import { React, useEffect } from 'react'
import Config from '../../config'
import axios from 'axios'

const ConstructionSites = () => {

  useEffect(()=>{
    axios.get(`${Config.drupal_local_url}/rest/article`).then((res)=>{
    console.warn(res.data.map((item,i)=>{
      return item.title;
    }))
  }).catch((err)=>{
    console.warn(err)
  })
  },[])

  return (
    <h1>ConstructionSites</h1>
  )
}

export default ConstructionSites