import React from 'react';

import SiteLogo from "./SiteLogo";

function NotFound() {

    document.title = "Nothing here…";

    return (
        <React.Fragment>
            <header>
                <SiteLogo/>
            </header>
            <main>
                <div className="text-center diffuse">
                    <img className="logo" src="https://i.imgur.com/CdcGFjA.png" alt="*Akko staring at the monitor*"/>
                    <h1>Page Not Found</h1>
                    <p>You picked the wrong URL baka!</p>
                </div>
            </main>
        </React.Fragment>
    );
}

export default NotFound;