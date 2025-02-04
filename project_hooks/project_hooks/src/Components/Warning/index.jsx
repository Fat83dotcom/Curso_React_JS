import { useDispatch, useSelector } from "react-redux"
import { changeWarning } from "../../features/warning/warningSlice"
import { useEffect } from "react"
import P from "prop-types"

export const Warning = () => {
    const warning = useSelector((state) => state.warning.value)
    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch(changeWarning(msg()))
        const timer =  () => {
            new Promise((resolve) => {
                setTimeout(() => {
                    dispatch(changeWarning('---'))
                    resolve()
                    console.log('debug');
                }, 3000)
            })
        }
        timer()
    })

    return (
        <div className="style-warning">
            <h4> {warning} </h4>
        </div>
    )
}

Warning.propTypes = {
    msg: P.func
}
