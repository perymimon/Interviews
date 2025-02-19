import {Box} from '@mui/material'
import React from 'react'

export default function ResponsiveBox ({sx, children, ...props}) {
    return (
        <Box {...props}
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: 3,
                flex: 1,
                // flexWrap: "wrap",
                "@media (orientation: portrait)": {
                    flexDirection: "column",
                },
                ...sx
            }}
        >
            {children}
        </Box>
    )
}
