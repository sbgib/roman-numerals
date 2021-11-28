# Roman Numerals
Open-source JavaScript module for converting numbers to and from Roman Numerals.

This lightweight (<1KB minified and gzipped), dependency-free vanilla JS code is written as a [native module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) using modern [ES6](https://www.w3schools.com/js/js_es6.asp) techniques.

## Example
[JSFiddle](https://jsfiddle.net/o0yxzcmu/) (`roman.convert()`)

## Installation
By importing the module into a script (either adding the `dist/` file directly to a project or from [jsdelivr.net](https://cdn.jsdelivr.net/gh/sbgib/roman-numerals/dist/roman.min.js)):
```
import * as roman from './roman.min.js';

//Your code here...
```

```
import * as roman from 'https://cdn.jsdelivr.net/gh/sbgib/roman-numerals/dist/roman.min.js';

//Your code here...
```

## Browser Support
This module can be loaded directly using any modern browser that [supports ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#browser_support), as well as node.js. No module bundler, loader or additional software is needed (although optionally using a [module bundler](https://gomakethings.com/how-to-bundle-es-modules-with-rollup.js/) can improve performance in the browser).

## Usage
[Each function definition](https://github.com/sbgib/roman-numerals/blob/main/dist/roman.js) details intended inputs and output. Usage examples for key functions are shown below.

**Read Roman numerals:**
```
roman.read('MMXXI') //2021
roman.read('MCMLXXXIV') //1984
roman.read('LXX') //70
roman.read('XLII') //42
roman.read('VI') //6
```

**Write Roman numerals:**
```
roman.write(2021) //'MMXXI'
roman.write(1984) //'MCMLXXXIV'
roman.write(70) //'LXX'
roman.write(42) //'XLII'
roman.write(6) //'VI'
```

**Convert to/from Roman numerals:**
```
roman.convert(2021) //'MMXXI'
roman.convert('LXX') //70
roman.convert(70) //'LXX'
roman.convert('XXXXVI') //46
roman.convert(6) //'VI'
```
[(example)](https://jsfiddle.net/o0yxzcmu/)


**Check for Roman numerals:**
```
roman.check('XVI') //true
roman.check('HI') //false
```

**Check contains Roman numerals:**
```
roman.contains('Count up tp XVI.') //true
roman.contains('Count up to 16.') //false
```

**Extract Roman numerals:**
```
roman.extract('This sentence contains XIII words, made up of LXXXVI characters, including XII spaces.')
//['XIII', 'LXXXVI', 'XII']
```

**Extract Roman numerals as numbers:**
```
roman.extractNumerals('This sentence contains XIII words, made up of LXXXVI characters, including XII spaces.')
//[13, 86, 12]
```

**Extract numbers as Roman numerals:**
```
ex: roman.extractNumbers('This sentence contains 13 words, made up of 79 characters, including 12 spaces.')
//['XIII', 'LXXIX', 'XII']
```

**Replace Roman numerals:**
```
roman.replaceNumerals('This sentence contains XIII words, made up of LXXXVI characters, including XII spaces.')
//'This sentence contains 13 words, made up of 86 characters, including 12 spaces.'
```

**Replace numbers:**
```
roman.replaceNumbers('This sentence contains 13 words, made up of 79 characters, including 12 spaces.')
//'This sentence contains XIII words, made up of LXXIX characters, including XII spaces.'
```

**Add Roman numerals:**
```
roman.add(['XIII', 'LXXIX', 'XII']) //'CIV'
```

**Subtract Roman numerals:**
```
roman.subtract('XIII', 'XII') //'I'
```

**Multiply Roman numerals:**
```
roman.multiply(['XIII', 'LXXIX', 'XII']) //'MMMMMMMMMMMMCCCXXIV'
```

**Divide Roman numerals:**
```
roman.divide('M', 'XII') //'LXXXIII'
```

## Further Information
You can learn more about writing Roman numerals manually via the useful resources below.

**Resources:**
- [Maths is Fun - Roman Numerals](https://www.mathsisfun.com/roman-numerals.html)
- [Wikipedia - Roman Numerals](https://en.wikipedia.org/wiki/Roman_numerals)

\
[@sbgib](https://github.com/sbgib) © 2021