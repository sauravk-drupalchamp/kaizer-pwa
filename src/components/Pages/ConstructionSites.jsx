import { React, useEffect } from 'react'
import axios from 'axios'

const ConstructionSites = () => {

  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/todos').then((res)=>{
    console.warn(res)
  }).catch((err)=>{
    console.warn(err)
  })
  },[])

  return (
    <h1>ConstructionSites</h1>
  )
}

export default ConstructionSites