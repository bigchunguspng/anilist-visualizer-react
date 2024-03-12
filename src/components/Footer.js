import React from 'react';
import {Link} from "react-router-dom";
import './Footer.css';

function Footer() {
    return (
        <footer>
            <div className="text-center">
                <Link to="https://anilist.co" target="_blank">AniList.co</Link>
                <Link to="https://github.com/bigchunguspng/anilist-visualizer" target="_blank">GitHub</Link>
            </div>
            <img src="https://i.imgur.com/8YiddnS.png" alt="ifunny.co" className="ifunny"/>
        </footer>
    );
}

export default Footer;