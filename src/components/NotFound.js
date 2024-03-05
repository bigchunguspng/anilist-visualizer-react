import React from 'react';
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <div className='not-found'>
            <h2>Page Not Found</h2>
            <p>Oops...</p>
            <Link to='/'>Back to Home</Link>
        </div>
    );
}

export default NotFound;