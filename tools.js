export const sleep = ms => new Promise(r => setTimeout(r, ms));

export const randomId = () => {
    return (Math.random() * 1000000).toFixed(0).toString();
}


export const prettyTime = () => {
    let now = new Date();
    let date = now.getFullYear().toString() + '-'
        + (now.getMonth() + 1).toString() + '-'
        + now.getDate().toString();
    let time = now.getHours().toString() + ':' + now.getMinutes().toString();
    return date + ' ' + time + '; '
}



export const typeText = async(element, text, newElementType = 'span', classList = [], speed = 100, removeMarker = true) => {
    let span = document.createElement('span');
    let blinkMarker = document.createElement("span");
    let newElement = document.createElement(newElementType);
    blinkMarker.classList.add(['code'])
    blinkMarker.classList.add(['blinkMarker'])
    blinkMarker.innerText = '|'
    element.appendChild(span);
    element.appendChild(blinkMarker)
    for (const c of classList) {
        span.classList.add(c);
        newElement.classList.add(c);
    }
    for (let i = 0; i < text.length; i++) {
        let letter = text[i];
        let substring = text.substring(0, i + 1);
        span.innerText = substring;
        if (substring == text) {
        }
        await sleep(speed)
    }
    blinkMarker.remove();
    span.remove();
    newElement.innerHTML = text;
    element.appendChild(newElement);
    !removeMarker ? newElement.appendChild(blinkMarker) : null;
    return newElement;
}