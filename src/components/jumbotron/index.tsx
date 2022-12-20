import React from 'react'
import './styles.css';

type JumbotronProps = {
    children: JSX.Element | JSX.Element[];
    style?: React.CSSProperties
}

const Jumbotron: React.FC<JumbotronProps> = ({ children, style }) => {
  return (
    <div className="jumbo p-3" style={style || {}} >{children}</div>
  )
}

export default Jumbotron