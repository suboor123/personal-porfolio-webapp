import React from 'react'
import Jumbotron from 'src/components/jumbotron';

type Props = {
    imageUrl: string;
    title: string;
    description: string;
}

const AcheivementCard = (props: Props) => {
    const { imageUrl, title, description } = props;
  return (
    <Jumbotron style={{border: '1px solid #fdf851'}}>
        <img src={imageUrl} className="img-fluid rounded p-img" />
        <h3 className='mt-2 h5 text-white'>{title}</h3>
        <p className="mt-3 pb-3">{description}</p>
    </Jumbotron>
  )
}

export default AcheivementCard