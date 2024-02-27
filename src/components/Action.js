import React from 'react'

const Action = ({handleClick, className, type}) => {
  return (
    <div className={className} onClick={handleClick}>
        {type}
    </div>
  )
}

export default Action