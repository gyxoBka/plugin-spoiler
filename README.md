# plugin-spoiler
This is a simple useful plugin for creating adaptive spoilers on the page

# Usage
Import module with WebPack
```
import { Spoiler } from "./Spoiler/Spoiler";
```

Then create new instance of Spoiler then us it
```
const spoilers = new Spoiler();
spoilers.init();
```

## Options
| Props | typeof | value | description |
|:----------------|:---------:|:----------------:|:----------------:|
| spoilerAttr| string | data-spoilers | html data attribute to select spoilers|
| duration | number | 500 | open/close transition duration |
|icon | string | spoiler__vertical | You may set your own class to display icon or use defaults: spoiler__plus, spoiler__arrow, spoiler__vertical |
| icon | object | object props | or you may add your own icon with html assert |
| icon object props | object | | wrapperClass: 'css class', element: 'html to insert in div with wrapperClass' |

### Examples

```
const spoilers = new Spoiler({
    duration: 500,
    icon: 'spoiler__arrow',
});
```

```
const spoilers = new Spoiler({
    spoilerAttr: 'data-second-spoilers',
    duration: 500,
    icon: {
        wrapperClass: 'spoiler__icon',
        element: '<img src="./assets/images/icon-arrow.svg" alt="">'
    },
});
```
