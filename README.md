# Roman Numerals
Open-source JavaScript module for converting numbers to and from Roman Numerals.

This lightweight (1KB), dependency-free vanilla JS code is written using modern [ES6](https://www.w3schools.com/js/js_es6.asp) techniques.

## Installation:
```
<script src="roman.min.js"></script>
```

## Usage:
### Read Roman numerals:
```
read('MMXXI') //2021
read('MCMLXXXIV') //1984
read('LXX') //70
read('XLII') //42
read('VI') //6
```

### Write Roman numerals:
```
write(2021) //'MMXXI'
write(1984) //'MCMLXXXIV'
write(70) //'LXX'
write(42) //'XLII'
write(6) //'VI'
```

### Convert to/from Roman numerals:
```
convert(2021) //'MMXXI'
convert('LXX') //70
convert(70) //'LXX'
convert('XXXXVI') //46
convert(6) //'VI'
```

## Further Information
You can learn more about writing Roman numerals manually via the useful resources below.

Resources:\
[Maths is Fun - Roman Numerals](https://www.mathsisfun.com/roman-numerals.html)\
[Wikipedia - Roman Numerals](https://en.wikipedia.org/wiki/Roman_numerals)


[@sbgib](https://github.com/sbgib)