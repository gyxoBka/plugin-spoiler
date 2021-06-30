# plugin-spoiler
This is a simple useful plugin for creating adaptive spoilers on the page

# Usage
Import module with WebPack
```php
import { Spoiler } from "./Spoiler/Spoiler";
```

Then create new instance of Spoiler then us it
```php
const spoilers = new Spoiler();
spoilers.init();
```

#### html data
[data-spoilers] data attr to select parent block of spoiler. It has to props:
1) window size
2) media query type

##### Example
Spoiler will work when when window size is BIGGER than 650px
```
data-spoilers="650,min"
```
Spoiler will work when when window size is SMALLER than 650px
```
data-spoilers="650,max"
```

[data-spoiler-accordeon] data attr to enable one spoiler view. Just add it to parent block near [data-spoilers]


## Options
| Props | typeof | value | description |
|:----------------|:---------:|:----------------:|:----------------:|
| spoilerAttr| string | data-spoilers | html data attribute to select spoilers|
| duration | number | 500 | open/close transition duration |
|icon | string | spoiler__vertical | You may set your own class to display icon or use defaults: spoiler__plus, spoiler__arrow, spoiler__vertical |
| icon | object | object props | or you may add your own icon with html assert |
| icon object props | object | | wrapperClass: 'css class', element: 'html to insert in div with wrapperClass' |

### Examples

```php
const spoilers = new Spoiler({
    duration: 500,
    icon: 'spoiler__arrow',
});
```

```php
const spoilers = new Spoiler({
    spoilerAttr: 'data-second-spoilers',
    duration: 500,
    icon: {
        wrapperClass: 'spoiler__icon',
        element: '<img src="./assets/images/icon-arrow.svg" alt="">'
    },
});
```

## HTML struct
you have to follow html structure

```
Parent block [data-spoilers]
    child spoiler title [data-spoiler]
    HERE IS YOUR BLOCK WITH SPOILER
```

```html
<div class="spoiler" data-spoilers data-spoiler-accordeon>
    <div class="block__item">
        <div class="spoiler__title" data-spoiler>Spoiler №1</div>
        <div class="block__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ducimus magnam recusandae culpa quae ipsam eos ad, voluptas totam accusantium?
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ducimus magnam recusandae culpa quae ipsam eos ad, voluptas totam accusantium?</p>
        </div>
    </div>
    <div class="block__item">
        <div class="spoiler__title" data-spoiler>Spoiler №2</div>
        <div class="block__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ducimus magnam recusandae culpa quae ipsam eos ad, voluptas totam accusantium?
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ducimus magnam recusandae culpa quae ipsam eos ad, voluptas totam accusantium?</p>
        </div>
    </div>
    <div class="block__item">
        <div class="spoiler__title" data-spoiler>Spoiler №3</div>
        <div class="block__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ducimus magnam recusandae culpa quae ipsam eos ad, voluptas totam accusantium?
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ducimus magnam recusandae culpa quae ipsam eos ad, voluptas totam accusantium?</p>
        </div>
    </div>
</div>
```

Parent block may contain more than one spoiler

### Notice
- Spoiler is a next sibling after [data-spoiler]
