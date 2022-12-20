import React from 'react'
import './styles.css';

type Props = {
    children: JSX.Element | JSX.Element[] | string;
    onClick?: () => void;
    className?: string;
}

const KeyboardButton: React.FC<Props> = ({ children, onClick, className }) => {
  return (
    <button className={`${className || ''} kbd-btn` } onClick={onClick}>{children}</button>
  )
}

export default KeyboardButton