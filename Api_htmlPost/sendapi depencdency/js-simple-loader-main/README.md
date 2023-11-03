# js-simple-loader

Vanilla JS Simple Loader

## How to Use

You can set the 'mode' you want to display the loader (md = material design, ios = ios...).
You can set it adding a 'mode' attribute to the HTML, with the values 'md' or 'ios', or you can manually set it on the 'open' method.

Import the CSS and JS files on your webpage and use one of the codes bellow:

```javascript
Loader.open();
//or
Loader.open('md');
//or
Loader.open('ios');

Loader.close();

Loader.ifClosed(function () {
  //some callback here;
}, "openLoader");

Loader.ifOpened(function () {
  //some callback here;
}, "closeLoader");
```
