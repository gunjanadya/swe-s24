// initialize readline?
var readline = require('readline');
var log = console.log;
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// placeholder input value
let input = "20030716T050300";

var recieve_input = function() {
    rl.question('Please enter a date and time of format YYYYMMDDTHHMMSS: ', function(answer) {
        if(validate(answer)){
            inputDate = returnDate(answer);
            // output date
            console.log(inputDate.toString());
        }
        else if(answer == 'stop'){
            return rl.close();
        }else{
            console.log("That input was not formatted correctly. Type 'stop' to exit.")
        }
        recieve_input();
    });
}

recieve_input();
function returnDate(input){
    year  = input.substring(0,4)
    month = input.substring(4,6) - 1 // month indexing starts at 0
    day   = input.substring(6,8)
    hour  = input.substring(9,11)
    min   = input.substring(11,13)
    sec   = input.substring(13,15)
    
    // convert to Date object
    const inputDate = new Date(year, month, day, hour, min, sec);
    return inputDate;
}
function validate(date){
    // first, ensure valid format
    if(date.length !== 15){
        return false;
    }
    digits1 = isStringMadeOfDigits(date.substring(0,8));
    digits2 = isStringMadeOfDigits(date.substring(9,15));
    if(!digits1  || date.substring(8,9) !== 'T' || !digits2){
        return false;
    }
    
    // then, ensure valid numbers
    year  = date.substring(0,4)
    month = date.substring(4,6) - 1 // month indexing starts at 0
    day   = date.substring(6,8)
    hour  = date.substring(9,11)
    min   = date.substring(11,13)
    sec   = date.substring(13,15)

    // upper limits
    if(month < 0 || month > 11 || day > 31 || hour > 23 || min > 59 || sec > 59){
        return false;
    }

    // specify 'day' constraints
    if(day == 31 && (month == 1 || month == 3 || month == 5 || month == 8 || month == 10)){
        return false;
    }
    if(month == 1 && day > 28){
        if(day == 30){
            return false;
        }
        if(year % 4 !== 0 || (year % 100 == 0 && year % 400 !== 0)){
            return false;
        }
    }

    return true;
}

const isStringMadeOfDigits = (s) => /^\d+$/.test(s);


module.exports = { validate, returnDate };