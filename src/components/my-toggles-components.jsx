import {ToggleButton, ToggleButtonGroup, Tooltip} from '@mui/material'
import React from 'react'

export function Toggles (props) {
    const {options, ...rest} = props

    const toggleButtons = options.map(({value, label, title}) => {
        return (
            <Tooltip key={value} title={title}>
                <ToggleButton  value={value}
                >{label}</ToggleButton>
            </Tooltip>
        )
    })
    return <ToggleButtonGroup {...rest}>
        {toggleButtons}
    </ToggleButtonGroup>
}