# HoverShiftButton.js

### How to

1. Add Button, css

```html
<div class="button-container">
    <div class="button-shadow"></div>
    <a href="#" class="button">Button text goes here</a>
</div>
```

```css
.button-container {
    position: relative;
    display: inline-block;
}

.button-container .button-shadow {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    left: 1.5rem;
    bottom: 1.5rem;
    background: rgba(0,0,0,.2);
    z-index: 1;
    box-shadow: 0 0 30px 19px rgba(21,31,27,.2);
    transition: -webkit-transform .15s cubic-bezier(.17,.67,.83,.67);
    transition: transform .15s cubic-bezier(.17,.67,.83,.67);
    transition: transform .15s cubic-bezier(.17,.67,.83,.67),-webkit-transform .15s cubic-bezier(.17,.67,.83,.67);
}

.button-container .button {
    position: relative;
    margin: 0;
    z-index: 2;
    box-shadow: none;
    min-width: 16rem;
}

.button {
    display: inline-block;
    padding: 2rem 4rem;
    margin: 2rem 0;
    background: #3ecf8e;
    color: #fff;
    text-decoration: none;
    font-size: 18px;
    border-radius: 3px;
    font-weight: 700;
    box-shadow: 4px 5px 26px 5px rgba(21,31,27,.15);
    transition: background .15s ease,-webkit-transform .15s cubic-bezier(.17,.67,.83,.67);
    transition: background .15s ease,transform .15s cubic-bezier(.17,.67,.83,.67);
    transition: background .15s ease,transform .15s cubic-bezier(.17,.67,.83,.67),-webkit-transform .15s cubic-bezier(.17,.67,.83,.67);
    border: 0;
    cursor: pointer;
}
```


2. Build js & include HoverShiftButton.js
 
3. Fire Js

```javascript
import HoverShiftButton from './HoverShiftButton'
HoverShiftButton.init();
```

