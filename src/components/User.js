import useFetch from "../useFetch";
import {useParams} from 'react-router';
import React, {useEffect} from "react";
import {ChangeOrder, SwitchLanguage, tipHide, tipShow, ToggleGrouping} from "../scripts/scripts";

export function UserPage(props) {

    const {username} = useParams();
    const {data: user, isPending, error} = useFetch(`http://localhost:5000/api/user/${username}`);

    useEffect(() => {
        document.title = username + " · Anilist Visualizer";
    }, [username]);

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

    const countTotal = animanga ? Object.keys(animanga.entries).length : 0;
    const countEntry = animanga ? Object.keys(entries).length : 0;

    const header = animanga ? `${countEntry}/${countTotal} titles · ${animanga.seriesShown}/${animanga.seriesTotal} series` : "";

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
    }, []);

    const handleKeyDown = (event) => {
        let key = event.which;

        if (key === 74) SwitchLanguage();
        else if (key === 71) ToggleGrouping();
        else if (key === 82) ChangeOrder();
    }

    useEffect(() => {
        if (animanga) {
            let cookies = document.cookie.toString();
            if (cookies.includes('lang=japanese')) SwitchLanguage();
            if (cookies.includes('group=groups')) ToggleGrouping();
            if (cookies.includes('reverse=reverse')) ChangeOrder();
            console.log(cookies);
        }
    }, [animanga]);

    return (
        <div className="container-xd">
            <main role="main" className="pb-3">
                <Filters header={header}/>
                <div>
                    <div className="medialist section" id="animanga">
                        {error && <div>{error}</div>}
                        {isPending && <div>Loading...</div>}
                        {animanga && entries.length > 0 ? entries.map((x, index) => (
                            <React.Fragment key={x.id}>
                                <Entry item={x} animanga={animanga} index={index}/>
                            </React.Fragment>
                        )) : <div>user was too busy touching grass to watch anime</div>}
                    </div>
                    <div className="tipbox absolute">
                        <span id="tip"></span>
                    </div>
                </div>
            </main>
        </div>
    )
}

export function Entry({item, animanga, index}) {

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

    const tli = item.timelineItem;
    const air = media.timelineItem;

    const left = tli.offset;
    const width = tli.length;

    let tip = `<p>${tli.tip.dateRange}</p>`;
    if (tli.tip.episodes) tip += `<p>${tli.tip.episodes} ${media.type === 0 ? 'episode' : 'chapter'}${tli.tip.episodes > 1 && 's'}</p>`;
    if (tli.tip.averageSpeed) tip += `<p>${tli.tip.averageSpeed}</p>`;

    return (
        <div className="entry" series={media.seriesId} n={index}>
            <div className="cover">
                <div className="image color"
                     style={{
                         backgroundImage: `url(${large}), url(${medium})`,
                         '--color-blue': media.cover.color
                     }}>
                </div>
                <a className="link" href={media.url} target="_blank">{media.type === 0 ? "ア" : "マ"}</a>
            </div>
            <div className={"title " + status} english={media.title.english} japanese={media.title.japanese}>
                {media.title.english}
            </div>
            <div className="timeline">
                <div className="timeline-row">
                    {Object.keys(animanga.years).map((x, index) => (
                        <div className="timeline-year" style={{width: animanga.years[x] / timeframe * 100 + '%'}} key={index}/>
                    ))}
                </div>
                {
                    air && <AiringTip
                        left={air.offset / timeframe * 100 + '%'}
                        width={air.length / timeframe * 100 + '%'}
                        season={air.season}
                    />
                }
                <div className="timeline-item tip"
                     style={{'--left': left / timeframe * 100 + '%', '--width': width / timeframe * 100 + '%'}}>
                    <div className={"range" + (tli.stripes ? " stripes" : "")} style={{'--color-blue': media.cover.color}}>
                        <div className="hover-box"
                             onMouseOver={event => tipShow(event.target, tip)}
                             onMouseOut={tipHide}/>
                    </div>
                </div>
                <div className="timeline-row text">
                    {Object.keys(animanga.years).map((x, index) => {
                        let percent = animanga.years[x] / timeframe * 100 + '%'

                        return (
                            <div className="timeline-year text" style={{width: percent}} key={index}>{x}</div>
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

export function AiringTip({left, width, season}) {
    return (
        <div className="timeline-item releasing stripes"
             style={{
                 marginLeft: left,
                 width: width
             }}>
            <div className="season">{season}</div>
        </div>
    )
}

export function Filters({header}) {
    return (
        <div className="control-panel">
            <h3 className="section-name">{header}</h3>
            <div className="actions" id="buttons">
                <button className="section" onClick={SwitchLanguage}>
                    <span id="lang" a="english" b="japanese">日本語</span>
                </button>
                <button className="section" onClick={ToggleGrouping}>
                    <span id="group" a="default" b="groups">Group</span>
                </button>
                <button className="section" onClick={ChangeOrder}>
                    <span id="reverse" a="default" b="reverse">Reverse</span>
                </button>
            </div>
        </div>
    )
}