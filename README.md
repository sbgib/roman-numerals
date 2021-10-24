# Roman Numerals
Open-source JavaScript module for converting numbers to and from Roman Numerals.

This lightweight (<1KB minified and gzipped), dependency-free vanilla JS code is written as a [UMD (Universal Module Definition)](http://jargon.js.org/_glossary/UMD.md) using modern [ES6](https://www.w3schools.com/js/js_es6.asp) techniques.

## Installation:
**Script tag**
```
<script src="roman.min.js"></script>
```

**Module bundler**\
This module is built based on [The Vanilla JS Toolkit UMD Boilerplate](https://vanillajstoolkit.com/boilerplates/umd/). It supports JavaScript module bundlers and loaders, like [RequireJS](http://requirejs.org/) and [CommonJS](http://www.commonjs.org/).

## Usage:
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

## Further Information
You can learn more about writing Roman numerals manually via the useful resources below.

**Resources:**
- [Maths is Fun - Roman Numerals](https://www.mathsisfun.com/roman-numerals.html)
- [Wikipedia - Roman Numerals](https://en.wikipedia.org/wiki/Roman_numerals)

\[@sbgib](https://github.com/sbgib) © 2021