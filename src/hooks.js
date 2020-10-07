import {useState, useEffect} from 'react'
import {resizeCb, divideScale, sinify} from './utils'
export const useAnimatedScale = (scGap = 0.02, delay = 20) => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                let currScale = 0 
                const interval = setInterval(() => {
                    currScale += scGap 
                    setScale(currScale)
                    if (currScale > 1) {
                        setScale(0)
                        clearInterval(interval)
                        setAnimated(false)
                    }
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        resizeCb(() => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }) 
        return resizeCb(() => {})
    })
    return {
        w, 
        h       
    }
}