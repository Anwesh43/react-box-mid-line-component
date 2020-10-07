import React from 'react'
import {useDimension, useAnimatedScale} from './hooks'
import MidLineBox from './MidLineBox'

const MidLineBoxContainer = (props) => {
    const {scale, start} = useAnimatedScale(0.03, 20)
    const {w, h} = useDimension()
    return (
        <React.Fragment>
            <MidLineBox scale = {scale} onClick = {start} w = {w} h = {h}/>
        </React.Fragment>
    )
}

export default MidLineBoxContainer