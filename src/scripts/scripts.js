class Toggler
{
    static FindById(id)
    {
        return new Toggler(document.getElementById(id));
    }

    constructor(toggler)
    {
        this.a = toggler.getAttribute("a");
        this.b = toggler.getAttribute("b");
        this.t = toggler;
    }

    toggle()
    {
        this.t.setAttribute("a", this.b);
        this.t.setAttribute("b", this.a);
    }

    setText(text)
    {
        this.t.innerText = text;
    }
}

export function cookiesHas(text)
{
    return document.cookie.toString().includes(text);
}

export function delay(milliseconds)
{
    return new Promise(resolve =>
    {
        setTimeout(resolve, milliseconds);
    });
}

export function ToggleInnerHTML(target_selector, toggle_id)
{
    let toggler = Toggler.FindById(toggle_id);

    document.querySelectorAll(target_selector).forEach(x => x.innerHTML = x.getAttribute(toggler.b));

    toggler.toggle();
    return toggler;
}

export function ReverseList(target_id)
{
    let target = document.getElementById(target_id);
    let children = target.children;
    let i = children.length;

    while (i--) target.appendChild(children[i]);
}

export function SwitchLanguage()
{
    let lang = ToggleInnerHTML('#animanga .entry .title', 'lang');
    lang.setText(lang.a === "english" ? "English" : "日本語");

    document.cookie = 'lang=' + lang.b + '; max-age=7776000; path=/'
}

export function ChangeOrder()
{
    let toggler = Toggler.FindById("reverse");

    ReverseList("animanga");

    toggler.toggle();

    document.cookie = 'reverse=' + toggler.b + '; max-age=7776000; path=/'
}

export function ToggleGrouping()
{
    let toggler = Toggler.FindById("group");
    if (toggler.a === "default")
    {
        GroupElements();
        toggler.setText("Restore");
    }
    else
    {
        UngroupElements();
        toggler.setText("Group");

        if (Toggler.FindById("reverse").a !== "default")
        {
            ReverseList("animanga");
        }
    }
    toggler.toggle();

    document.cookie = 'group=' + toggler.b + '; max-age=7776000; path=/'
}

export function GroupElements()
{
    let target = document.getElementById("animanga");
    let children = target.children;

    let series = new Set();

    for (let i = 0; i < children.length; i++)
    {
        series.add(children[i].attributes["series"].value);
    }

    let hr = document.createElement("hr");

    for (const group of series)
    {
        let items = document.querySelectorAll(`#animanga [series='${group}']`);
        if (items.length > 1)
        {
            for (let j = items.length - 1; j >= 0; j--)
            {
                target.insertBefore(items[j], items[(j + 1) % items.length]);
            }
        }
        let next = items[items.length - 1].nextSibling;
        target.insertBefore(hr.cloneNode(), next);
    }

    document.querySelector("#animanga hr:last-child").remove();
}

export function GroupEntries(entries)
{
    const series = new Set();

    for (let i = 0; i < entries.length; i++)
    {
        series.add(entries[i].media.seriesId);
    }

    const copy = [];

    for (const group of series)
    {
        const items = entries.filter(x => x.media.seriesId === group);
        for (let j = 0; j < items.length; j++)
        {
            copy.push(items[j]);
        }
        copy.push('-');
    }

    copy.pop();

    return copy;
}

export function UngroupElements()
{
    document.querySelectorAll("#animanga > hr").forEach(x => x.remove());

    let target = document.getElementById("animanga");
    let children = target.children;

    for (let i = 0; i < children.length; i++)
    {
        let element = document.querySelector(`#animanga .entry[n='${i}']`);
        target.appendChild(element);
    }
}

export function setCookie(key, value) {
    new Promise(() => document.cookie = `${key}=${value}; max-age=7776000; path=/`).catch(function ignore() {});
}

export function tipShow(element, data)
{
    let hoverbox = element.getBoundingClientRect();
    let body = document.body.getBoundingClientRect();
    let tip =  document.getElementById("tip");
    let edge = document.querySelector(".timeline").getBoundingClientRect().right - 20;

    tip.innerHTML = data;
    tip.style.display = "block";

    let tipbox = tip.getBoundingClientRect();
    let top = hoverbox.top - body.top - 12 - tipbox.height;
    let left = hoverbox.left - body.left;
    if (left + tipbox.width > edge) left -= (tipbox.width + 5);

    tip.style.top = top + "px";
    tip.style.left = left + "px";
}
export function tipHide()
{
    document.getElementById("tip").style.display = "none";
}