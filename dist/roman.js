/*
   Roman Numerals vI
   © 2021 sbgib, MIT License
   https://github.com/sbgib/roman-numerals
*/

/*
   Read a Roman numerals string and return its numeric value
   arg: [input:string] Roman numerals
   return: [number/null] number
 */
let read = (text) => {
   const numerals = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000};
   let last, result;

   //Check for valid input
   if(typeof text !== 'string' || text.length === 0) {
       console.error('Error: String of Roman numerals (' + Object.keys(numerals).join(', ') + ') expected.');
       return null;
   }

   //Process first text in string
   text = text.trim();

   if(0 <= text.indexOf(' ')) {
      text = text.split(' ')[0];
   }

   //Loop through the string in reverse order to calculate value
   result = text.toUpperCase().split('').reverse().reduce(function(total, char) {
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
   Write a number in Roman numerals
   arg: [input:number] number to convert
   return: [string/null] Roman numerals
 */
let write = (number) => {
   const numerals = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000};
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
   Convert a number to Roman numerals or vice-versa
   arg: [input:number] number to convert to Roman Numerals, or
   arg: [input:string] Roman Numerals string to convert to a number
   return: [number/string/null] conversion result
*/
var convert = (input) => {
   if(typeof input === 'number') {
      return write(input);
   } else if(typeof input === 'string') {
      return read(input);
   } else {
      console.error('Error: Unknown input. Expected: number or string.');
      return null;
   }
}