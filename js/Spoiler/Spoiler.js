import { SpoilerComponent } from "./SpoilerComponent";

export class Spoiler extends SpoilerComponent{
    constructor(options = {}) {
        super(options);
    }

    init() {
        const $spoilers = document.querySelectorAll(`[${this.spoilerAttr}]`);
        const spoilersRegular = [], spoilersMedia = [];

        filterSpoilers.call(this, $spoilers, spoilersRegular, spoilersMedia);
        this.initSpoilers(spoilersRegular);

        if (spoilersMedia.length > 0) {
            const breakPoints = getMediaBreakPoints.call(this, spoilersMedia);
            const mediaQueries = getUniqQueries(breakPoints);

            mediaQueries.forEach(breakPoint => {
                const paramsArray = breakPoint.split(',');
                const matchMedia = window.matchMedia(paramsArray[0]);
                const mediaBreakPoint = paramsArray[1].trim();
                const mediaType = paramsArray[2].trim();

                const spoilers = getCurMediaSpoilers(breakPoints, mediaBreakPoint, mediaType);

                matchMedia.addEventListener('change',  () => {
                    this.initSpoilers(spoilers, matchMedia);
                });

                this.initSpoilers(spoilers, matchMedia);
            });
        }
    }
}

function filterSpoilers($spoilers, regular, media) {
    Array.from($spoilers).forEach(item => {
        const mediaAttr = item.getAttribute(this.spoilerAttr);
        if (mediaAttr.split(',')[0]) {
            media.push(item);
        } else {
            regular.push(item);
        }
    })
}

function getMediaBreakPoints(spoilers) {
    return spoilers.map(spoiler => {
        const paramsArray = spoiler.getAttribute(this.spoilerAttr).split(',');

        return {
            value: paramsArray[0],
            type: paramsArray[1] ? paramsArray[1].trim() : 'max',
            item:spoiler,
        }
    })
}

function getUniqQueries(breakPoints) {
    return breakPoints.map(item => {
        return `(${item.type}-width: ${item.value}px), ${item.value},${item.type}`;
    }).filter((item, index, self) => self.indexOf(item) === index);
}

function getCurMediaSpoilers(breakPoints, mediaBreakPoint, mediaType) {
    return breakPoints.filter(item => {
        if (item.value === mediaBreakPoint && item.type === mediaType) {
            return true;
        }
    });
}