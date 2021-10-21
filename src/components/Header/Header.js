import PropTypes from 'prop-types'
import React from 'react'
import Button from '../Button/Button'
import { useLocation } from 'react-router'

const Header = ({title,buttonFunction,showAddTask}) => {
    const location = useLocation()

    const onClick =() =>{
        buttonFunction()
    }
    return (
        <header className='header'>
            {/* <h1 style={{color:'red', backgroundColor:'black'}}>{title}</h1>
            <h1 style={headingStyle}>{title}</h1> */}
            <h1 >{title}</h1>
            {
                location.pathname === '/' && (
                    <Button color={showAddTask ? 'red': 'green'} text={showAddTask
                        ? 'Close' : 'Add'} onClick={onClick}/>
                )
            }
       
        </header>
    )
}

Header.defaultProps = {
    title: 'Default title',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

// CSS in Js
// const headingStyle = {
//     color:'red',
//     backgroundColor:'black'
// }

export default Header
