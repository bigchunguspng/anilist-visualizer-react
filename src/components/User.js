import useFetch from "../useFetch";
import {useParams} from 'react-router';
import React from "react";

export function UserPage(props) {

    const {id} = useParams();
    const {data: user, isPending, error} = useFetch(`http://localhost:5000/api/user/by-name/${id}`);

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
                    <p className="user-count">111/114 titles · 56/58 series</p>
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

    const {data: entries, isPending, error} = useFetch(`http://localhost:5000/api/animanga/${id}`);

    return (
        <div className="container-xd">
            <main role="main" className="pb-3">
                <Filters/>
                <div>
                    <div className="medialist section" id="animanga">
                        {error && <div>{error}</div>}
                        {isPending && <div>Loading...</div>}
                        {entries && entries.length > 0 ? entries.map((x) => (
                            <div key={x.id}>
                                <Entry item={x}/>
                            </div>
                        )) : <div>nothing here</div>}
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

export function Entry({item}) {

    const statuses = [
        "CURRENT",
        "PLANNING",
        "COMPLETED",
        "DROPPED",
        "PAUSED",
        "REPEATING",
    ]
    const status = statuses[item.status];
    const baseUrl = `https://s4.anilist.co/file/anilistcdn/media/${item.media.type === 0 ? 'anime' : 'manga'}/cover/`;
    const medium = baseUrl + item.media.cover.medium;
    const large = baseUrl + item.media.cover.large;
    const english = item.media.title.english ?? item.media.title.romaji;

    return (
        <div className="entry" series={item.media.seriesId} n="110">
            <div className="cover">
                <div className="image color"
                     style={{
                         backgroundImage: `url(${large}), url(${medium})`,
                         '--color-blue': item.media.cover.color
                     }}>
                </div>
                <a className="link" href={item.media.url} target="_blank">ア</a>
            </div>
            <div className={"title " + status} english={english} japanese={item.media.title.native}>
                {english}
            </div>
            <div className="timeline">
                <div className="timeline-row">
                    <div className="timeline-year" style={{width: '9.940828402366863%'}}></div>
                    <div className="timeline-year" style={{width: '21.65680473372781%'}}></div>
                    <div className="timeline-year" style={{width: '21.597633136094675%'}}></div>
                    <div className="timeline-year" style={{width: '21.597633136094675%'}}></div>
                    <div className="timeline-year" style={{width: '21.597633136094675%'}}></div>
                    <div className="timeline-year" style={{width: '3.5502958579881656%'}}></div>
                </div>
                <div className="timeline-item tip"
                     style={{'--left': '99.5266272189349%', '--width': '0.47337278106508873%'}}>
                    <div className="range " style={{'--color-blue': item.media.cover.color}}>
                        <div className="hover-box"
                             onMouseOver="tipShow(this, '<p>Feb 22 ➽</p><p>14 episodes</p><p>1.6 episodes/day</p>')"
                             onMouseOut="tipHide()"/>
                    </div>
                </div>
                <div className="timeline-row text">
                    <div className="timeline-year text" style={{width: '9.940828402366863%'}}>2019</div>
                    <div className="timeline-year text" style={{width: '21.65680473372781%'}}>2020</div>
                    <div className="timeline-year text" style={{width: '21.597633136094675%'}}>2021</div>
                    <div className="timeline-year text" style={{width: '21.597633136094675%'}}>2022</div>
                    <div className="timeline-year text" style={{width: '21.597633136094675%'}}>2023</div>
                    <div className="timeline-year text" style={{width: '3.5502958579881656%'}}>2024</div>
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