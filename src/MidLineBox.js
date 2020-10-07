import React from 'react'
import {useStyle} from './hooks'
const MidLineBox = ({w, h, scale, onClick}) => {
    const {getBlockStyle, getCircleStyle, getLineStyle} = useStyle(w, h, scale)
    return (
        <React.Fragment>
            <div style = {getCircleStyle()}>
            </div>
            <div style = {getLineStyle(w, h)}>
            </div>
            {[0,1].map(i => (<div style = {getBlockStyle(i)}></div>))}
        </React.Fragment>
    )
}

export default MidLineBox