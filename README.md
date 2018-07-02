# SlideToUnlock/Lock Jquery Plugin

### Usage
```
    <link href="styles.css" rel="stylesheet"> 
    <script src="jquery.slideToUnlock.js"></script>  
```
```
    $("div").slideToUnlock();
```
### Options
* text: A string Change the default text
        default: Slide To Unlock
* allowToLock: a boolean value indecates if the 
                can lock back or not.
        default: false
* theme: A string refers to the CSS class to change the look and feel for 
        the slider
            default: green theme.

```
    $("div").slideToUnlock({
        text: "Hello World!",
        allowToLock: true,
        theme: "grayTheme"    
    });
```

### Features
* Ability to lock and unlock
* change theme.
* change width and height.
* Works with touch as well as mouse.
* Supported by most modern browsers


### Prerequisites
Jquery library


