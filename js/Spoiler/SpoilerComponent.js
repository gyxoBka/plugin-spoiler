export class SpoilerComponent {
    constructor(options) {
        this.spoilerAttr = options.spoilerAttr || 'data-spoilers';
        this.duration = options.duration || 500;
        this.icon = options.icon || 'spoiler__icon';
    }

    open(el) {
        if (!el.classList.contains('_slide')) {
            el.classList.add('_slide');
    
            if (el.hidden) {
                el.hidden = false;
            }
    
            let height = getHeight(el);
    
            el.style.overflow = 'hidden';
            el.style.height = 0;
            el.style.paddingTop = 0;
            el.style.paddingBottom = 0;
            el.style.marginTop = 0;
            el.style.marginBottom = 0;
            el.offsetHeight;
            el.style.transitionProperty = 'height, margin, padding';
            el.style.transitionDuration = this.duration + 'ms';
            el.style.height = height + 'px';
    
            el.style.removeProperty('padding-top');
            el.style.removeProperty('padding-bottom');
            el.style.removeProperty('margin-top');
            el.style.removeProperty('margin-bottom');
    
            setTimeout(() => {
                el.style.removeProperty('height');
                el.style.removeProperty('overflow');
                el.style.removeProperty('transition-duration');
                el.style.removeProperty('transition-property');
    
                el.classList.remove('_slide');
            }, this.duration);
        }
    }

    close(el) {
        if (!el.classList.contains('_slide')) {
            el.classList.add('_slide');
    
            el.style.transitionProperty = 'height, margin, padding';
            el.style.transitionDuration = this.duration + 'ms';
            el.style.height = getHeight(el) + 'px';
            el.offsetHeight;
            el.style.overflow = 'hidden';
            el.style.height = 0;
            el.style.paddingTop = 0;
            el.style.paddingBottom = 0;
            el.style.marginTop = 0;
            el.style.marginBottom = 0;
    
            setTimeout(() => {
                el.hidden = true;
    
                el.style.removeProperty('height');
                el.style.removeProperty('padding-top');
                el.style.removeProperty('padding-bottom');
                el.style.removeProperty('margin-top');
                el.style.removeProperty('margin-bottom');
                el.style.removeProperty('overflow');
                el.style.removeProperty('transition-duration');
                el.style.removeProperty('transition-property');
    
                el.classList.remove('_slide');
            }, this.duration);
        }
    }

    toggle(el) {
        return el.hidden ? this.open(el) : this.close(el);
    }

    initSpoilers(spoilers, matchMedia = false) {
        spoilers.forEach(spoiler => {
            spoiler = matchMedia ? spoiler.item : spoiler;

            if (matchMedia.matches || !matchMedia) {
                spoiler.classList.add('_init');
                initSpoilerBody.call(this, spoiler);
                this.spoilerAction = setSpoilerAction.bind(this);
                spoiler.addEventListener('click', this.spoilerAction);
            } else {
                spoiler.classList.remove('_init');
                initSpoilerBody.call(this, spoiler, false);
                spoiler.removeEventListener('click', this.spoilerAction);
            }
        })

        function setSpoilerAction(e) {
            const el = e.target;
        
            if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
                const spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
                const spoilersBlock = spoilerTitle.closest(`[${this.spoilerAttr}]`);
                const accordeonSpoiler = spoilersBlock.hasAttribute('data-spoiler-accordeon') ? true : false;
        
                if (!spoilersBlock.querySelectorAll('._slide').length) {
                    if (accordeonSpoiler && !spoilerTitle.classList.contains('_active')) {
                        hideSpoilerbody.call(this, spoilersBlock);
                    }
        
                    spoilerTitle.classList.toggle('_active');
                    this.toggle(spoilerTitle.nextElementSibling);
                }
        
                e.preventDefault();
            }
        }
    }
}

function initSpoilerBody(spoiler, hideSpoilerbody = true) {
    const spoilerTitles = spoiler.querySelectorAll('[data-spoiler]');

    if (spoilerTitles.length) {
        spoilerTitles.forEach(spoilerTitle => {
            if (hideSpoilerbody) {
                spoilerTitle.removeAttribute('tabindex');
                
                if (typeof this.icon === 'string') {
                    spoilerTitle.classList.add(this.icon)
                } else {
                    spoilerTitle.appendChild(createSpoilerIcon.call(this));
                }

                if (!spoilerTitle.classList.contains('_active')) {
                    spoilerTitle.nextElementSibling.hidden = true;
                } 
            } else {
                spoilerTitle.setAttribute('tabindex', '-1');
                spoilerTitle.nextElementSibling.hidden = false;

                if (typeof this.icon === 'string') {
                    spoilerTitle.classList.remove(this.icon)
                } else {
                    const spoilerIcon = spoilerTitle.querySelector(`.${this.icon.wrapperClass}`);
                    spoilerIcon && spoilerTitle.removeChild(spoilerIcon);
                }
            }
        })
    }
}

function getHeight(el) {
    let elHeight = parseInt(document.defaultView.getComputedStyle(el, '').getPropertyValue('height'));
    let elMargin = parseInt(document.defaultView.getComputedStyle(el, '').getPropertyValue('margin-top')) + 
                    parseInt(document.defaultView.getComputedStyle(el, '').getPropertyValue('margin-bottom'));
    
    return elHeight + elMargin;
}

function hideSpoilerbody(spoilersBlock) {
    const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler]._active');

    if (spoilerActiveTitle) {
        spoilerActiveTitle.classList.remove('_active');
        this.close(spoilerActiveTitle.nextElementSibling);
    }
}

function createSpoilerIcon() {
    const icon = document.createElement('div');

    icon.classList.add(this.icon.wrapperClass);
    icon.innerHTML = this.icon.element;

    return icon;
}