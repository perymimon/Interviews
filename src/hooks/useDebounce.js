import {useCallback, useEffect, useRef} from 'react'


export function useDebounce (func, wait = 0) {
    const timerRef = useRef(null)
    useEffect(() => () => clearTimeout(timerRef.current), [func, wait])
    return useCallback(function (...args) {
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(func, wait, ...args)
    }, [func, wait])
}