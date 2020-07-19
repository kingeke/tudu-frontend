import React from 'react'
import moment from 'moment'

export default function Footer() {
    return (

        <footer>
            <div className="text-center p-3 text-white">
                <h5>Todo App&copy; {moment().format('Y')}</h5>
            </div>
        </footer>
    )
}
