import {tipHide, tipShow} from "../../scripts/scripts";
import React, {useContext, useEffect, useState} from "react";

import AiringTip from "./AiringTip";
import TimelineRow from "./TimelineRow";
import {OptionsContext} from "./Animanga";

export default function Entry({item, maxDay, minDay, sections, index}) {

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
        <div className="entry">
            <div className="cover">
                <div className="image color"
                     style={{
                         backgroundImage: `url(${large}), url(${medium})`,
                         '--color-blue': media.cover.color
                     }}>
                </div>
                <a className="link" href={media.url} target="_blank">{media.type === 0 ? "ア" : "マ"}</a>
            </div>
            <Title status={status} titles={media.title}/>
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

function Title({status, titles}) {

    const options = useContext(OptionsContext);
    const [title, setTitle] = useState(options.language === 'japanese' ? titles.japanese : titles.english);

    useEffect(() => {
        setTitle(options.language === 'japanese' ? titles.japanese : titles.english);
    }, [options.language]);

    return (
        <div className={"title " + status}>{title}</div>
    )
}

const statuses = ["CURRENT", "PLANNING", "COMPLETED", "DROPPED", "PAUSED", "REPEATING"];