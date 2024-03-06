import useFetch from "../useFetch";
import {useParams} from 'react-router';
import React from "react";

export function UserPage(props) {

    const {username} = useParams();
    const {data: user, isPending, error} = useFetch(`http://localhost:5000/api/user/${username}`);

    return (
        <div className='user-page'>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {user && (
                <div>
                    <UserHeader user={user}/>
                    <Animanga id={user.id}/>
                </div>
            )}
        </div>
    );
}

export function UserHeader({user}) {

    return (
        <header className="user">
            <div className="nav-mini">
                <SiteLogo/>
            </div>
            <div className="banner-shadow"></div>
            <div className="container-xd user-info">
                <a href={user.url}>
                    <img className="avatar"
                         src={user.avatar.large}
                         alt="avatar"/>
                </a>
                <div className="user-info text">
                    <h1 className="user-name">{user.name}</h1>
                    <p className="user-count">Last activity: {user.lastActivity}</p>
                    {/*<p className="user-count">111/114 titles · 56/58 series</p>*/}
                </div>
            </div>
        </header>
    )
}

export function SiteLogo() {
    return (
        <a className="nav-logo" href="/">
            <img src="https://anilist.co/img/icons/icon.svg" height="50px" alt="AniList"/>
            <span>Visualizer</span>
        </a>
    )
}

export function Animanga({id}) {

    const {data: animanga, isPending, error} = useFetch(`http://localhost:5000/api/animanga/${id}`);
    const entries = animanga && animanga.entries.filter(x => x.timelineItem !== null)
    return (
        <div className="container-xd">
            <main role="main" className="pb-3">
                <Filters/>
                <div>
                    <div className="medialist section" id="animanga">
                        {error && <div>{error}</div>}
                        {isPending && <div>Loading...</div>}
                        {animanga && entries.length > 0 ? entries.map((x) => (
                            <div key={x.id}>
                                <Entry item={x} animanga={animanga}/>
                            </div>
                        )) : <div>user was too busy touching grass to watch anime</div>}
                    </div>
                    {/*<div className="tipbox absolute">
                        <span id="tip" style="display: none; top: 1003.58px; left: 1416.15px;">
                                <p>Mar 1 - Mar 13</p>
                                <p>11 episodes</p>
                                <p>episode every 1.2 days</p>
                            </span>
                    </div>*/}
                </div>
            </main>
        </div>
    )
}

export function Entry({item, animanga}) {

    const statuses = [
        "CURRENT",
        "PLANNING",
        "COMPLETED",
        "DROPPED",
        "PAUSED",
        "REPEATING",
    ]
    const status = statuses[item.status];
    const media = item.media;
    const baseUrl = `https://s4.anilist.co/file/anilistcdn/media/${media.type === 0 ? 'anime' : 'manga'}/cover/`;
    const medium = baseUrl + media.cover.medium;
    const large = baseUrl + media.cover.large;

    const timeframe = animanga.maxDay - animanga.minDay + 1;

    const left = item.timelineItem.offset;
    const width = item.timelineItem.length;

    return (
        <div className="entry" series={media.seriesId} n="110">
            <div className="cover">
                <div className="image color"
                     style={{
                         backgroundImage: `url(${large}), url(${medium})`,
                         '--color-blue': media.cover.color
                     }}>
                </div>
                <a className="link" href={media.url} target="_blank">ア</a>
            </div>
            <div className={"title " + status} english={media.title.english} japanese={media.title.japanese}>
                {media.title.english}
            </div>
            <div className="timeline">
                <div className="timeline-row">
                    { Object.keys(animanga.years).map(x => (
                        <div className="timeline-year" style={{width: animanga.years[x] / timeframe * 100 + '%'}}></div>
                    ))}
                </div>
                <div className="timeline-item tip"
                     style={{'--left': left / timeframe * 100 + '%', '--width': width / timeframe * 100 + '%'}}>
                    <div className="range " style={{'--color-blue': media.cover.color}}>
                        <div className="hover-box"
                             onMouseOver="tipShow(this, '<p>Feb 22 ➽</p><p>14 episodes</p><p>1.6 episodes/day</p>')"
                             onMouseOut="tipHide()"/>
                    </div>
                </div>
                <div className="timeline-row text">
                    { Object.keys(animanga.years).map(x => {
                        let percent = animanga.years[x] / timeframe * 100 + '%'

                        return(
                            <div className="timeline-year text" style={{width: percent}}>{x}</div>
                        )
                    })}
                </div>
            </div>
            <span className="entry-status">
                {status !== "COMPLETED" && <img src={`/svg/status/${status}.svg`} alt={status}/>}
            </span>
        </div>
    )
}

export function Filters() {
    return (
        <div className="control-panel">
            <h3 className="section-name">All:</h3>
            <div className="actions" id="buttons">
                <button className="section" onClick="SwitchLanguage()">
                    <span id="lang" a="english" b="japanese">日本語</span>
                </button>
                <button className="section" onClick="ToggleGrouping()">
                    <span id="group" a="groups" b="default">Restore</span>
                </button>
                <button className="section" onClick="ChangeOrder()">
                    <span id="reverse" a="reverse" b="default">Reverse</span>
                </button>
            </div>
        </div>
    )
}