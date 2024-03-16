import {tipHide, tipShow} from "../../../scripts/scripts";
import React from "react";
import AiringTip from "./AiringTip";
import TimelineRow from "./TimelineRow";
import {Title} from "./Title";
import {imageCDN, statuses} from "../../../scripts/consts";
import {Link} from "react-router-dom";

export default function Entry({entry, maxDay, minDay, sections}) {

    const status = statuses[entry.status];

    const media = entry.media;
    const type = media.type;

    // IMAGE
    const imageURL = imageCDN + (type === 0 ? 'anime' : 'manga') + '/cover/';
    const imageMid = imageURL + media.cover.medium;
    const imageBig = imageURL + media.cover.large;

    const timeframe = maxDay - minDay + 1;
    const percent = (x) => x / timeframe * 100 + '%';

    const item = entry.timelineItem;
    const airing = media.timelineItem;
    const tip = item.tip;

    // TIP
    let info = `<p>${tip.dateRange}</p>`;
    if (tip.episodes)
        info += `<p>${tip.episodes} ${type === 0 ? 'episode' : 'chapter'}${tip.episodes > 1 ? 's' : ''}</p>`;
    if (tip.averageSpeed)
        info += `<p>${tip.averageSpeed}</p>`;

    return (
        <div className="entry">
            <div className="cover">
                <div className="image color"
                     style={{
                         backgroundImage: `url(${imageBig}), url(${imageMid})`,
                         '--color-blue': media.cover.color
                     }}>
                </div>
                <Link className="link" to={media.url} target="_blank">{type === 0 ? "ア" : "マ"}</Link>
            </div>
            <Title status={status} titles={media.title}/>
            <div className="timeline">
                <TimelineRow sections={sections} timeframe={timeframe} text={false}/>
                {
                    airing && <AiringTip airing={airing} percent={percent}/>
                }
                <div className="timeline-item tip"
                     style={{
                         '--left': percent(item.offset),
                         '--width': percent(item.length)
                     }}>
                    <div className={"range" + (item.stripes ? " stripes" : "")}
                         style={{
                             '--color-blue': media.cover.color
                         }}>
                        <div className="hover-box"
                             onMouseOver={event => tipShow(event.target, info)}
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