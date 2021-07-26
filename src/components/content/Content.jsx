import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
export default function Content() {
    return (
        <div>
            Contents:
            <ProgressBar animated now={95} label={'95%'} max={100}/>
        </div>
    )
}
