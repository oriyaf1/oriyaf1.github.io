import Router from "./router.js";
import { sleep, typeText, randomId, prettyTime} from "./tools.js";


var smallLogs = [];
const log = async (action = 'no - action', data = '') => {
    if (!localStorage.getItem('user-id')) {
        localStorage.setItem('user-id', randomId());
        await sleep(20);
        log(action = 'new user', data = 'no id inside localStorage')
    }
    if (!data) {
        data = 'Last hovers' + smallLogs.toString();
        smallLogs = [];
    }
    let id = localStorage.getItem('user-id');
    let url = document.url;
    if (!url) {
        console.count('log ')
        console.log('action ', action, '\ndata ', data)
        return;
    }
    let now = new Date();
    let date = now.getFullYear().toString() + '-'
        + (now.getMonth() + 1).toString() + '-'
        + now.getDate().toString();
    let time = now.getHours().toString() + ':' + now.getMinutes().toString();
    const hook = "https://hooks.zapier.com/hooks/catch/13714525/bxr4tmv/?"
    return fetch(hook
        + 'id=' + id
        + '&action=' + action
        + '&url=' + url
        + '&date=' + date
        + '&time=' + time
        + '&data=' + data);
}


async function replaceImages(msPerImg, images) {

    for (let i = 0; i < images.length; i++) {
        images[i].style.display = 'block'
        await sleep(msPerImg);
        images[i].style.display = 'none'
        i == images.length - 1 ? i = -1 : null;
    }
    // }
}


let zoomControl = {
    document: null,
    svg: null,
    windowRectViewBox: null,
    houseViewBox: null,
    smokeArea: null,
    windowShutter: null,
    windowShutterOpts: {
        open: '130',
        close: '300',
    },
    startSmokePosition: {
        x: 0,
        y: 0,
    },
    rootViewBox: [0, 0, 0, 0],
    officeViewBox: [0, 0, 0, 0],
    zoopRequest: null,
    viewBox: [0, 0, 0, 0],
    zoomUnitBox: [0, 0, 0, 0],
    currentMode: 'viewWallpaper',
    modeOpts: {
        house: 'house',
        viewWallpaper: 'viewWallpaper',
        tank: 'tank',
        office: 'office,'
    },
    openScreenViewBox: null,
    isIdeOpen: false,
    lock: false,
};
const setZoomUnixBox = (fromBox, toBox, scrollUnit = 1) => {
    zoomControl.zoomUnitBox = [];
    for (let i = 0; i < fromBox.length; i++) {
        if (fromBox[i] > toBox[i])
            zoomControl.zoomUnitBox.push((fromBox[i] - toBox[i]) / scrollUnit)
        else
            zoomControl.zoomUnitBox.push((toBox[i] - fromBox[i]) / scrollUnit)
    }
}

const zoom = async (zoomUnits, svg) => {

    zoomControl.viewBox = zoomControl.svg.getAttribute('viewBox').split(' ').slice(0, 4).map(x => parseFloat(x));

    zoomControl.viewBox[0] = zoomControl.viewBox[0] + (zoomControl.zoomUnitBox[0] * zoomUnits)
    if (zoomControl.viewBox[0] < 0)
        return;
    zoomControl.viewBox[1] = zoomControl.viewBox[1] + (zoomControl.zoomUnitBox[1] * zoomUnits)
    zoomControl.viewBox[2] = zoomControl.viewBox[2] - (zoomControl.zoomUnitBox[2] * zoomUnits)
    zoomControl.viewBox[3] = zoomControl.viewBox[3] - (zoomControl.zoomUnitBox[3] * zoomUnits)
    svg.setAttribute('viewBox', zoomControl.viewBox.join(' '))

}
const animateWindow = (dir) => {
    zoomControl.windowShutter.setAttribute('height', zoomControl.windowShutterOpts[dir]);
}

const openIde = async () => {
    document.getElementById('ide').style.display = 'block';
    zoomControl.isIdeOpen = true;
    let div = document.getElementById('code-area')
    div.innerHTML = ''
    // gtag('event', 'open-ide', {
    //     'app_name': 'myAppName',
    //     'screen_name': 'Home'
    // });
    log('open-ide')

    zoomControl.isIdeOpen == true ? await typeText(div, "Hi! glad you're here!", 'div', ['code']) : null;
    zoomControl.isIdeOpen == true ? await typeText(div, "I am Oriya First", 'div', ['code']) : null;
    zoomControl.isIdeOpen == true ? await typeText(div, "Software-Developer, currently working in my own independent business", 'div', ['code'], 30) : null;
    zoomControl.isIdeOpen == true ? await typeText(div, "planning and building software tools that will suit my clients needs,", 'div', ['code'], 30) : null;
    zoomControl.isIdeOpen == true ? await typeText(div, "I studied for a computer science degree during high school,", 'div', ['code'], 40) : null;
    zoomControl.isIdeOpen == true ? await typeText(div, "in recent years develop for a living.", 'div', ['code'], 40) : null;
    zoomControl.isIdeOpen == true ? await typeText(div, "I would love to meet or talk about your dreams! [also introduce myself, see if we can collaborate :) ]", 'div', ['code']) : null;
    zoomControl.isIdeOpen == true ? await typeText(div, "Thank you, and have a wonderful day!", 'div', ['code'], 100, false) : null;

    if (zoomControl.isIdeOpen) {
        log('finish ide text')
    }

}
const closeIde = () => {
    document.getElementById('ide').style.display = 'none';
    if (zoomControl.isIdeOpen)
        log('close-ide')
    zoomControl.isIdeOpen = false;
}

const zoomToTarget = async (target) => {
    zoomControl.lock = true;


    let fromBox = zoomControl.svg.getAttribute('viewBox').split(' ').slice(0, 4)
        .map(x => parseFloat(x));
    setZoomUnixBox(fromBox, target);

    let scroll = target[0] - fromBox[0];
    let dir = scroll / Math.abs(scroll);
    for (let i = 0; i < Math.abs(scroll); i = i + 10) {

        window.requestAnimationFrame(() => {
            zoom(dir * 10 / Math.abs(scroll), zoomControl.svg);
        });
        await sleep(30);
    }

    zoomControl.lock = false;
}
const isAllowedZoom = (zoomUnit) => {
    if (zoomControl.lock)
        return false;
    if (zoomControl.isIdeOpen && zoomUnit > 0) {

        return false;
    }
    if (zoomControl.houseViewBox[0] < zoomControl.viewBox[0]) {
        if (zoomControl.openScreenViewBox[0] < zoomControl.viewBox[0]) {
            if (zoomControl.currentMode != zoomControl.modeOpts.office) {
                zoomControl.currentMode = zoomControl.modeOpts.office;
                zoomToTarget(zoomControl.windowRectViewBox);
            }
            return;
        }
        else {
            zoomControl.isIdeOpen = false;
            document.getElementById('ide').style.display = 'none';
        }
        if (zoomControl.currentMode != zoomControl.modeOpts.house) {
            zoomControl.currentMode = zoomControl.modeOpts.house;
            animateWindow('open');
        };
    }
    else {
        if (zoomControl.currentMode != zoomControl.modeOpts.viewWallpaper) {
            zoomControl.currentMode = zoomControl.modeOpts.viewWallpaper;
            animateWindow('close');
        }
    }
    return true;
}

const animateZoom = async (event) => {
    if (zoomControl.lock)
        return;
    setZoomUnixBox(zoomControl.svg.getAttribute('viewBox').split(' ').slice(0, 4)
        .map(x => parseFloat(x)),
        zoomControl.windowRectViewBox);
    let scroll = event.deltaY;
    let dir = scroll / Math.abs(scroll);
    for (let i = 0; i < Math.abs(scroll); i = i + 7) {
        let zoomUnit = 15 / 2000 * dir;
        if (!isAllowedZoom(zoomUnit))
            return;
        window.requestAnimationFrame(() => {
            zoom(zoomUnit, zoomControl.svg);
        });
        await sleep(30);
    }
}


const addWrodToSmoke = (word) => {
    let newWord = zoomControl.svg.getElementById('123').cloneNode(true);
    let tspan = document.createElement('tspan');
    tspan.setAttribute('x', zoomControl.startSmokePosition.x);
    tspan.setAttribute('y', zoomControl.startSmokePosition.y);
    tspan.textContent = word;
    newWord.innerHTML = '';
    newWord.appendChild(tspan);
    newWord.setAttribute('id', word)
    zoomControl.smokeArea.appendChild(newWord);
    return newWord;
}

const initZoomControl = () => {
    zoomControl.document = document.getElementById('wallpaper-img').contentDocument;
    zoomControl.svg = zoomControl.document.getElementsByTagName('svg')[0];

    zoomControl.rootViewBox = zoomControl.svg.getAttribute('viewBox').split(' ').slice(0, 4)
        .map(x => parseFloat(x));
    let windowRect = zoomControl.svg.getElementById("window-rect");
    zoomControl.windowShutter = zoomControl.svg.getElementById("window-shutter");
    zoomControl.windowRectViewBox = [
        parseFloat(windowRect.getAttribute('x')),
        parseFloat(windowRect.getAttribute('y')),
        parseFloat(windowRect.getAttribute('width')),
        parseFloat(windowRect.getAttribute('height'))
    ];
    let houseRect = zoomControl.svg.getElementById("house-rect");
    zoomControl.houseViewBox = [
        parseFloat(houseRect.getAttribute('x')),
        parseFloat(houseRect.getAttribute('y')),
        parseFloat(houseRect.getAttribute('width')),
        parseFloat(houseRect.getAttribute('height'))
    ];
    let openScreenRect = zoomControl.svg.getElementById("open-screen-rect");
    zoomControl.openScreenViewBox = [
        parseFloat(openScreenRect.getAttribute('x')),
        parseFloat(openScreenRect.getAttribute('y')),
        parseFloat(openScreenRect.getAttribute('width')),
        parseFloat(openScreenRect.getAttribute('height'))
    ];
    zoomControl.svg.getElementById("screen").addEventListener('click', (e) => {
    });
    let overlay = document.getElementById('wallpaper-container-overlay');
    overlay.addEventListener('click', () => {
        log('overlay click')
        document.getElementById('wallpaper-container').classList.add('wallpaper-active');
    })
    let exitFullScreen = document.getElementById('exit-full-screen');
    exitFullScreen.addEventListener('click', () => {
        log('exitFullScreen click')
        closeIde();
        document.getElementById('wallpaper-container').classList.remove('wallpaper-active');
    });
    zoomControl.svg.getElementById('screen').addEventListener('click', () => {
        openIde();
    });
    let screenDiv = document.createElement('div');
    screenDiv.innerHTML = 'click my'
    zoomControl.svg.getElementById('screen').appendChild(screenDiv);
    document.getElementById('close-ide-button').addEventListener('click', closeIde);
    document.getElementById('ide-contact-tab').addEventListener('click', () => {
        log('ide-contact-tab click');
        closeIde();
        document.getElementById('wallpaper-container').classList.remove('wallpaper-active');
        document.getElementById('nav-contact').click();

    });
    document.getElementById('send-message-from-contact-button').addEventListener('click', () => {
        let text = document.getElementById('textarea-from-contact').value;
        text = text.replace(/[^a-zA-Z!@., ]/g, "")
        if (!text)
            return;
        log('contact meggage', text).then(() =>
            document.getElementById('textarea-from-contact').value = ''
        );


});

}


const startSmokeWords = async () => {
    zoomControl.smokeArea = zoomControl.svg.getElementById("smoke-area");
    let tspan = zoomControl.svg.getElementById('for').getElementsByTagName('tspan')[0]
    zoomControl.startSmokePosition = {
        x: tspan.getAttribute('x'),
        y: tspan.getAttribute('y'),
    }
    // addWrodToSmoke('test');
}


const initRouter = () => {
    let nav = document.getElementById('nav');
    for (let i = 0; i < nav.children.length; i++) {
        let a = nav.children[i];
        a.addEventListener('click', (event) => {
            Router.route(event);
            log('route tab', event.target.href.toString())
            for (let i = 0; i < nav.children.length; i++) {
                nav.children[i].classList.remove('active-a');
            }
            a.classList.add('active-a')
        });
    }
    Router.init('rootComponent', ['about', 'clients-projects', 'contact'], 'about')
}


const typeHeroText = async () => {
    let heroTextDiv = document.getElementById('hero-text');
    let textList = [];
    let letterCount = 0;
    for (let i = 0; i < heroTextDiv.children.length - 1; i++) {
        let element = heroTextDiv.children[i];
        textList.push(element.innerHTML);
        element.innerHTML = '';
        for (let j = 0; j < textList[i].length; j++) {
            const letter = textList[i][j];
            let span = document.createElement("span");
            span.innerHTML = letter;
            if (letter != ' ') {
                span.style.setProperty('--i', j + letterCount + i * 10);
                span.classList.add('letter-pop')
            }
            element.appendChild(span);
        }
        letterCount += textList[i].length;

    }
}

const main = () => {

    log('main loaded', window.innerHeight.toString() + window.innerWidth.toString());
    typeHeroText();
    // TODO: hide login animathion
    initZoomControl();
    // startSmokeWords();
    initRouter();
    zoomControl.document.addEventListener('wheel', async (event) => {
        animateZoom(event);
    })

    replaceImages(150, document.getElementById('stack-tab').getElementsByTagName('img'))
}

addEventListener('beforeunload', (event) => { log('beforeunload', data = 'Leaving the page') });

addEventListener('load', (event) => main());

