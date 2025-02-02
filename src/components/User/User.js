import useFetch from "../../hooks/useFetch";
import {useParams} from "react-router-dom";
import React, {useEffect} from "react";
import Animanga from "../Animanga/Animanga";
import SiteLogo from "../SiteLogo";
import './User.css'
import {API} from "../../scripts/consts";

export default function User() {

    const {username} = useParams();
    const {data: user, error} = useFetch(API + '/user/' + username);

    const changeIcon = (url) => {
        const link = document.querySelector("link[rel~='icon']") || document.createElement("link");
        link.rel = "icon";
        link.href = url;
        document.head.appendChild(link);
    };

    useEffect(() => {
        document.title = username + " · Anilist Visualizer";
    }, [username]);

    useEffect(() => {
        if (user) changeIcon(user.avatar.medium);
    }, [user]);

    return (
        <React.Fragment>
            <header className="user">
                <SiteLogo/>
                <div className="banner-shadow"></div>
                <div className="container-xd user-info">
                    {
                        user ?
                            <React.Fragment>
                                <a href={user.url}>
                                    <img className="avatar" src={user.avatar.large} alt="avatar.jpeg"/>
                                </a>
                                <div className="text">
                                    <h1 className="user-name">{user.name}</h1>
                                    <p className="user-count">Last activity: {user.lastActivity}</p>
                                </div>
                            </React.Fragment>
                            : <div className="user-count error">{error ? error : 'Loading...'}</div>

                    }
                </div>
            </header>
            {
                user
                    ? <Animanga id={user.id}/>
                    : <main/>
            }
        </React.Fragment>
    );
}