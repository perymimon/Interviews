import {CircularProgress, TextField} from '@mui/material'
import {Search} from "lucide-react"
import React from 'react'

export function SearchTextField ({isLoading,  ...props}) {

    const endAdornment = isLoading ? <CircularProgress size={24}/> : <Search/>
    return (
        <TextField
            autoComplete="off"
                   InputProps={{
                       endAdornment,
                       // sx:{borderRadius:10} not like it so much
                   }}
                   {...props}  />
    )


}