import React from 'react'
import './NotFound.css'

export default class NotFound extends React.PureComponent {
    render() {
        return <div className="not-found">
                <h2>Page Not Found</h2>
                <a href="/">To start page</a>
            </div>
    }
} 