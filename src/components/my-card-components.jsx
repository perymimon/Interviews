import {Paper, Typography} from '@mui/material'
import React from 'react'

export function Card ({show = true, header, children, sx, ...props}) {
    const headerTypo = header ? <Typography variant="h6" gutterBottom
    sx={{
        position: 'sticky',
        top: '0',
        background: 'inherit',
        zIndex: 1
    }}>
        {header}
    </Typography> : null

    return (
        show ? <Paper sx={{p: 2, flex: 1, minWidth: '20em', overflow:'auto',display:'flex', flexDirection:'column', ...sx}} {...props}>
            {headerTypo}
            {children}
        </Paper> : null
    )


}