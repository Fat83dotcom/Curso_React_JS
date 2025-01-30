import { useEffect, useState, useCallback, useRef } from "react"
import P from 'prop-types'

export const Warning2 = ({msg}) => {
    const msgCache = useRef(msg)

    const handleWarning = useCallback(async () => {
        await new Promise(() => setTimeout(() => {
            msgCache.current = ''
        }, 3000))
    }, [])

    useEffect(() => {
        handleWarning(msgCache.current)
    },[handleWarning])

    return (
        <h3>{msgCache}</h3>
    )
}

Warning2.propTypes = {
    msg: P.string
}
