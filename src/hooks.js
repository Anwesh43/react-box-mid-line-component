import {useState, useEffect} from 'react'
import {resizeCb, divideScale, sinify} from './utils'

const parts = 4

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
                    currScale += (scGap / parts) 
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
        return () => resizeCb(() => {})
    })
    return {
        w, 
        h       
    }
}

export const useStyle = (w, h, scale) => {
    const sf = sinify(scale)
    const sf1 = divideScale(sf, 0, parts)
    const sf2 = divideScale(sf, 1, parts)
    const sf3 = divideScale(sf, 2, parts)
    const size = Math.min(w, h) / 10
    const r = size / 1.5
    const position = 'absolute'
    const x = w / 2 
    const background = '#3F51B5'
    const y = h / 2
    const gap = Math.min(w, h) / 7
    const strokeFactor = 90
    return {
        getBlockStyle(i) {
            const left = `${x - (size / 2) * sf2}px` 
            const top = `${y - gap + gap * 2 * i - (size / 2) * sf2}px` 
            const width = `${size * sf2}px` 
            const height = `${size * sf2}px`
            return {position, left, top, width, height, background} 
        },
        getCircleStyle() {
            const width = `${r}px`
            const height = `${r}px`
            const left = `${x - r / 2}px`
            const top = `${y - r / 2}px`
            const borderRadius = '50%'
            return {left, top, height, width, position, borderRadius, background}
        },
        getLineStyle() {
            const width = `${gap * 2 * sf1}px`
            const height = `${Math.min(w, h) / strokeFactor}px`
            const left = `${x - gap * sf1}px`
            const top = `${y - (Math.min(w, h) / (strokeFactor * 2))}px`
            const WebkitTransform = `rotate(${90 * sf3}deg)`
            return {position, left, top, width, height, background, WebkitTransform}
        }
    }
}