import React from 'react'
import WorkerInfo from './Worker/WorkerInfo'
import WorkersToolbox from './Worker/WorkersToolbox'
import { useParams } from 'react-router-dom'

const WorkerDetailsPage = () => {
    const siteID = useParams();
  return (
    <div>WorkerDetailsPage ---- {siteID.id}
    <br />
    <WorkerInfo siteID={siteID.id} />
    <WorkersToolbox siteID={siteID.id} />
    </div>
  )
}

export default WorkerDetailsPage