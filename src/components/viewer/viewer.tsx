import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';

const Viewer = () => {
  const location = useLocation();
  const { id } = useParams();


  useEffect(() => {
    console.log(id, location)
  }, [id])

  return (
    <div>Viewer</div>
  )
}

export default Viewer