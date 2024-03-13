import {tipHide, tipShow} from "../../scripts/scripts";
import React from "react";

import AiringTip from "./AiringTip";
import TimelineRow from "./TimelineRow";

function Entry({item, maxDay, minDay, sections, index}) {

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

    const timeframe = maxDay - minDay + 1;

    const tli = item.timelineItem;
    const air = media.timelineItem;

    const left = tli.offset;
    const width = tli.length;

    let tip = `<p>${tli.tip.dateRange}</p>`;
    if (tli.tip.episodes) tip += `<p>${tli.tip.episodes} ${media.type === 0 ? 'episode' : 'chapter'}${tli.tip.episodes > 1 ? 's' : ''}</p>`;
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
                <TimelineRow sections={sections} timeframe={timeframe} text={false}/>
                {
                    air && <AiringTip
                        left={air.offset / timeframe * 100 + '%'}
                        width={air.length / timeframe * 100 + '%'}
                        season={air.season}
                    />
                }
                <div className="timeline-item tip"
                     style={{
                         '--left': left / timeframe * 100 + '%',
                         '--width': width / timeframe * 100 + '%'
                     }}>
                    <div className={"range" + (tli.stripes ? " stripes" : "")}
                         style={{
                             '--color-blue': media.cover.color
                         }}>
                        <div className="hover-box"
                             onMouseOver={event => tipShow(event.target, tip)}
                             onMouseOut={tipHide}/>
                    </div>
                </div>
                <TimelineRow sections={sections} timeframe={timeframe} text={true}/>
            </div>
            <span className="entry-status">
                {status !== "COMPLETED" && <img src={`/svg/status/${status}.svg`} alt={status}/>}
            </span>
        </div>
    )
}

export default Entry;