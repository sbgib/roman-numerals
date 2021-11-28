/*
   Roman Numerals vI.I
   sbgib © 2021, MIT License
   https://github.com/sbgib/roman-numerals
*/

const numerals = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000};

//Helper functions
let patternContains = () => (new RegExp('\\b([' + Object.keys(numerals).join('') + ']+)\\b', 'gi'));
let patternIs = () => (new RegExp('^([' + Object.keys(numerals).join('') + ']+)$', 'gi'));
let checkArray = array => Array.isArray(array);
let checkString = text => (typeof text === 'string' && text.length !== 0);
let checkNumeral = text => (typeof text === 'string' && text.length !== 0 && patternIs().test(text));


/*
   Read a Roman numerals string and return its numeric value
   arg: [input:string] Roman numerals value
   return: [number/null] integer
   ex: roman.read('MMXXI')
   result: 2021
*/
let read = (text) => {
   let last, result;

   //Check for valid input
   if(!checkNumeral(text)) {
      return null;
   }

   //Process first entry in text
   text = text.trim();

   if(0 <= text.indexOf(' ')) {
      text = text.split(' ')[0];
   }

   //Loop through the string in reverse order to calculate value
   result = text.toUpperCase().split('').reverse().reduce((total, char) => {
      let value = numerals[char];

      if(typeof value === 'number') {
         //Check combination of numerals to determine additive or subtractive method
         total += value * (last !== undefined && value < last ? -1 : 1);
         last = value;
      }

      return total;
   }, 0);

   //Return null if no Roman Numerals are found
   return (result !== 0 ? result : null);
}


/*
   Write an integer in Roman numerals
   arg: [input:number] Integer to convert
   return: [string/null] Roman numerals value
   ex: roman.write(2021)
   result: 'MMXXI'
   */
let write = (number) => {
   const keys = Object.keys(numerals);
   let i, part, output = '';

   let writePart = (j, part) => {
      let result, output = '', total = part;

      //Attempt additive method first

      //Check if more than 3 repetitions of the same numeral would be used (where applicable)
      if(part < 1000 && (numerals[keys[j]] * 4) <= total) {
         return null;
      }
      
      //Deduct numeral from total up to 3 times
      while(numerals[keys[j]] <= total) {
         total -= numerals[keys[j]];
         output += keys[j];
      }
      
      //Check if the number has been fully represented
      if(total !== 0 && 0 < j) {
         //If not, then go to next largest numeral
         result = writePart(j - 1, total);

         if (result === null) {
            //Try getting subtractive representation, otherwise, return null
            return (part < numerals[keys[j]] ? writePart(j - 1, numerals[keys[j]] - total) + keys[j] : null);
         } else {
            output += result;
         }
      }

      return output;
   }

   //Check for valid input
   if(typeof number !== 'number' || number === Infinity) {
      //Return null if the input is not a number or is infinite (cannot be represented in Roman numerals)
      return null;
   }

   //Split number into orders of 10 and convert them in order from highest - lowest
   for(i = 3; 0 <= i; i--) {
      part = number - (number % Math.pow(10, i));

      if(part !== 0) {
         number -= part;
         output += writePart(keys.length - 1, part);
      }
   }
   
   return output;
}


/*
   Convert an integer to Roman numerals or vice-versa
   arg: [input:number/string] Integer to convert to Roman Numerals, or
   arg: [input:string] Roman Numerals value to convert to an integer
   return: [number/string/null] Conversion result
   ex: roman.convert('2021')
   result: 'MMXXI'
*/
let convert = (input) => {
   const type = typeof input;

   if(type === 'number' || (type === 'string' && /^([\d]+)/g.test(input))) {
      return write(parseInt(input));
   } else if(type === 'string') {
      return read(input);
   } else {
      //Unknown input
      return null;
   }
}


/*
   Check that a string is a Roman numerals value
   arg: [text:string] Text containing one or more numeric values
   return: [boolean/null] True/false
   ex: roman.check('XVI')
   result: true
*/
let check = (text) => {
   //Find Roman numerals in the text
   return (checkString(text) ? patternIs().test(text) : null);
}

/*
   Check that a string contains a Roman numerals value
   arg: [text:string] Text
   arg: [exclude:array] Optional list of words to exclude (the English word 'I' could be considered here)
   return: [boolean/null] True/false
   ex: roman.contains('Count up to XVI.')
   result: true
*/
let contains = (text, exclude = []) => {
   let matches;

   //Check for valid argument
   if(!checkString(text)) {
      return null;
   }

   //Find Roman numerals in the text
   matches = text.match(patternContains());

   return (matches ? 0 < matches.filter(match => exclude.indexOf(match) < 0).length : false);
}


/*
   Read all Roman numerals in a string and return them in an array without converting them
   arg: [text:string] Text containing one or more numeric values
   arg: [exclude:array] Optional list of words to exclude (the English word 'I' could be considered here)
   return: [array/null] Array of Roman Numerals value strings
   ex: roman.extract('This sentence contains XIII words, made up of LXXXVI characters, including XII spaces.')
   result: ['XIII', 'LXXXVI', 'XII']
*/
let extract = (text, exclude = []) => {
   let matches;

   //Check for valid arguments
   if(!checkString(text) || !checkArray(exclude)) {
      return null;
   }

   //Find Roman numerals in the text
   matches = text.match(patternContains());

   //Return null if no Roman numerals are found
   return (matches ? matches : null);
}


/*
   Read all Roman numerals in a string and return an array of their numeric values
   arg: [text:string] Text containing one or more numeric values
   arg: [exclude:array] Optional list of words to exclude (the English word 'I' could be considered here)
   return: [array/null] Array of integers
   ex: roman.extractNumerals('This sentence contains XIII words, made up of LXXXVI characters, including XII spaces.')
   result: [13, 86, 12]
*/
let extractNumerals = (text, exclude = []) => {
   //Extract matches
   const matches = extract(text, exclude);

   //Convert matches to Roman numerals
   return (matches ? matches.map(match => read(match)) : null);
}


/*
   Read all integers in a string and return them as an array of Roman Numerals
   arg: [text:string] Text containing one or more Roman Numerals values
   return: [array/null] Array of Roman Numerals value strings
   ex: roman.extractNumbers('This sentence contains 13 words, made up of 79 characters, including 12 spaces.')
   result: ['XIII', 'LXXIX', 'XII']
*/
let extractNumbers = (text) => {
   let matches;

   //Check for valid argument
   if(!checkString(text)) {
      return null;
   }

   //Find integers in the text
   matches = text.match(/(\d+)/g);

   //Return null if no integers are found
   return (matches ? matches.map(match => write(parseInt(match))) : null);
}


/*
   Replace Roman numerals in a string with integers
   arg: [text:string] Text containing one or more Roman Numerals values
   arg: [exclude:array] Optional list of words to exclude (the English word 'I' could be considered here)
   return: [string/null] Updated string
   ex: roman.replaceNumerals('This sentence contains XIII words, made up of LXXXVI characters, including XII spaces.')
   result: 'This sentence contains 13 words, made up of 86 characters, including 12 spaces.'
*/
let replaceNumerals = (text, exclude = []) => {
   //Check for valid arguments
   if(!checkString(text) || !checkArray(exclude)) {
      return null;
   }

   //Return updated text
   return text.replace(patternContains(), match => (0 <= (exclude.indexOf(match) ? match : read(match))));
}


/*
   Replace integers in a string with Roman numerals
   arg: [text:string] Text containing one or more numeric values
   return: [string/null] Updated string
   ex: roman.replaceNumbers('This sentence contains 13 words, made up of 79 characters, including 12 spaces.')
   result: 'This sentence contains XIII words, made up of LXXIX characters, including XII spaces.'
*/
let replaceNumbers = (text, exclude = []) => {
   //Check for valid arguments
   if(!checkString(text) || !checkArray(exclude)) {
      return null;
   }

   //Return updated text
   return text.replace(/(\d+)/g, match => write(parseInt(match)));
}


/*
   Add an array of Roman numerals values together, returning the result as a Roman numerals value
   arg: [array] Array of Roman Numerals value strings
   return: [string/null] Roman numerals value
   ex: roman.add(['XIII', 'LXXIX', 'XII'])
   result: 'CIV'
*/
let add = (array) => {
   //Convert each numeral, add to total, then convert back
   return (checkArray(array) ? write(array.reduce((total, text) => (total + read(text)), 0) || null) : null);
}


/*
   Subtract one Roman numeral value from another, returning the result as a Roman numerals value
   arg: [positive:string] Roman numerals value
   arg: [negative:string] Roman numerals value
   return: [string/null] Roman numerals value
   ex: roman.subtract('XIII', 'XII')
   result: 'I'
*/
let subtract = (positive, negative) => {
   //Convert each Roman numerals value
   positive = read(positive);
   negative = read(negative);

   //If valid, subtract, then convert back
   return (positive !== null && negative !== null ? write(positive - negative) : null);
}


/*
   Multiply an array of Roman numerals values together, returning the result as a Roman numerals value
   arg: [array] Array of Roman Numerals value strings
   return: [string/null] Roman numerals value
   ex: roman.multiply(['XIII', 'LXXIX', 'XII'])
   result: 'MMMMMMMMMMMMCCCXXIV'
*/
let multiply = (array) => {
   //Convert each numeral, multiply, then convert back
   return (checkArray(array) ? (write(array.reduce((total, text) => (total * read(text)), 1)) || null) : null);
}


/*
   Divide one Roman numeral value by another, returning the result as a Roman numerals value (whole number only, excluding the remainder)
   arg: [dividend:string] Roman numerals value
   arg: [divisor:string] Roman numerals value
   return: [string/null] Roman numerals value
   ex: roman.divide('M', 'XII')
   result: 'LXXXIII'
*/
let divide = (dividend, divisor) => {
   //Convert each Roman numerals value
   dividend = read(dividend);
   divisor = read(divisor);

   //If valid, divide, then convert back
   return (dividend !== null && divisor !== null ? write(Math.floor(dividend/divisor)) : null);
}


//Export constants and functions
export {
   numerals,
   read,
   write,
   convert,
   check,
   contains,
   extract,
   extractNumerals,
   extractNumbers,
   replaceNumerals,
   replaceNumbers,
   add,
   subtract,
   multiply,
   divide
}