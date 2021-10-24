/*
   Roman Numerals vI
   sbgib © 2021, MIT License
   https://github.com/sbgib/roman-numerals
*/
((root, factory) => {
   if ( typeof define === 'function' && define.amd ) {
      define([], () => {
         return factory(root);
      });
   } else if ( typeof exports === 'object' ) {
      module.exports = factory(root);
   } else {
      root.roman = factory(root);
   }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, (window) => {
   'use strict';

   const numerals = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000};
   let roman = {};

   /*
      Read a Roman numerals string and return its numeric value
      arg: [input:string] Roman numerals
      return: [number/null] integer
      ex: roman.read('MMXXI')
      result: 2021
   */
   roman.read = (text) => {
      let last, result;
   
      //Check for valid input
      if(typeof text !== 'string' || text.length === 0) {
          console.error('Error: String of Roman numerals (' + Object.keys(numerals).join(', ') + ') expected.');
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
   
      //Return the result
      if(result !== 0) {
         return result;
      } else {
         console.warn('Warning: No Roman numerals found.');
         return null;
      }
   }
   
   
   /*
      Write an integer in Roman numerals
      arg: [input:number] Integer to convert
      return: [string/null] Roman numerals
      ex: roman.write(2021)
      result: 'MMXXI'
    */
   roman.write = (number) => {
      const keys = Object.keys(numerals);
      let i, part, output = '';
   
      let writePart = (j, part) => {
          let result, output = '', total = part;
   
          //Attempt additive method first
   
          //Check if more than 3 repetitions of the same numeral would be used
          if((numerals[keys[j]] * 4) <= total) {
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
      if(typeof number !== 'number') {
          console.error('Error: Number input expected.');
          return null;
      }
   
      //Split number into orders of 10 and convert them in order from highest - lowest
      for(i = 3; 0 <= i; i--) {
          part = number - (number % Math.pow(10, i));
          number -= part;
          output += writePart(keys.length - 1, part);
      }
      
      return output;
   }
   
   
   /*
      Convert an integer to Roman numerals or vice-versa
      arg: [input:number/string] Integer to convert to Roman Numerals, or
      arg: [input:string] Roman Numerals string to convert to an integer
      return: [number/string/null] Conversion result
      ex: roman.convert('2021')
      result: 'MMXXI'
   */
   roman.convert = (input) => {
      const type = typeof input;

      if(type === 'number' || type === 'string' && /^([\d]+)/g.test(input)) {
         return roman.write(parseInt(input));
      } else if(type === 'string') {
         return roman.read(input);
      } else {
         console.error('Error: Unknown input. Number or string expected.');
         return null;
      }
   }

   /*
      Allows numerals to be read by an application
      return: [object] Numerals
      ex: roman.numerals()
      result: {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000}
   */
   roman.numerals = () => {
      return numerals;
   }

   /*
      Replace Roman numerals in a string with integers
      arg: [text:string] Text containing one or more instance of Roman Numerals
      arg: [exclude:array] Optional list of words to exclude (the English word 'I' could be considered here)
      return: [string/null] Updated string
      ex: roman.replaceNumerals('This sentence contains XIII words, made up of LXXXVI characters, including XII spaces.')
      result: 'This sentence contains 13 words, made up of 86 characters, including 12 spaces.'
   */
   roman.replaceNumerals = (text, exclude = []) => {
      //Check for valid argument
      if(typeof text !== 'string' || text.length === 0) {
         console.error('Error: String expected.');
         return null;
      }

      //Return updated text
      return text.replace(new RegExp('([' + Object.keys(numerals).join('') + ']+)', 'g'), (match) => (0 <= exclude.indexOf(match) ? match : roman.read(match)));
   }

   /*
      Replace integers in a string with Roman numerals
      arg: [text:string] Text containing one or more numeric values
      return: [string/null] Updated string
      ex: roman.replaceNumbers('This sentence contains 13 words, made up of 79 characters, including 12 spaces.')
      result: 'This sentence contains XIII words, made up of LXXIX characters, including XII spaces.'
   */
   roman.replaceNumbers = (text, exclude = []) => {  
      //Check for valid argument
      if(typeof text !== 'string' || text.length === 0) {
         console.error('Error: String expected.');
         return null;
      }

      //Return updated text
      return text.replace(/(\d+)/g, (match) => roman.write(parseInt(match)));
   }

   /*
      Read all Roman numerals in a string and return an array of their numeric values
      arg: [text:string] Text containing one or more numeric values
      arg: [exclude:array] Optional list of words to exclude (the English word 'I' could be considered here)
      return: [array/null] Array of integers
      ex: roman.extractNumerals('This sentence contains XIII words, made up of LXXXVI characters, including XII spaces.')
      result: [13, 86, 12]
   */
   roman.extractNumerals = (text, exclude = []) => {
      let matches;

      //Check for valid argument
      if(typeof text !== 'string' || text.length === 0) {
         console.error('Error: String expected.');
         return null;
      }

      //Find Roman numerals in the text
      matches = text.match(new RegExp('([' + Object.keys(numerals).join('') + ']+)', 'g'));

      if(matches) {
         //Filter out excluded strings, then convert the rest to integers
         return matches.filter((match) => exclude.indexOf(match) < 0).map((match) => roman.read(match));
      } else {
         console.warn('Warning: No Roman numerals found.');
         return null;
      }
   }

   /*
      Read all integers in a string and return them as an array of Roman Numerals
      arg: [text:string] Text containing one or more instance of Roman Numerals
      return: [array/null] Array of Roman Numeral strings
      ex: roman.extractNumbers('This sentence contains 13 words, made up of 79 characters, including 12 spaces.')
      result: ['XIII', 'LXXIX', 'XII']
   */
   roman.extractNumbers = (text) => {
      let matches;

      //Check for valid argument
      if(typeof text !== 'string' || text.length === 0) {
         console.error('Error: String expected.');
         return null;
      }

      //Find integers in the text
      matches = text.match(/(\d+)/g);

      if(matches) {
         //Replace each integer with its equivalent in Roman numerals
         return matches.map((match) => roman.write(parseInt(match)));
      } else {
         console.warn('Warning: No integers found.');
         return null;
      };
   }

   return roman;
});
