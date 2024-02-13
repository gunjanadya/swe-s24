const fs = require('fs');

// Parse Individual Records
// Function to parse a record and check for required properties
function parseRecord(record, records) {
  const requiredProperties = ['IDENTIFIER', 'TIME'];
  let hasWeight = false;
  const properties = {};

  for (const line of record) {
    // CHECK FOR MULTIPLE PROPERTIES PER LINE HERE

    let [name, value] = line.split(':').map((part) => part.trim());

    // check for repeat properties
    if(properties[name]){
      console.error(`Repeated property: ${name}`);
    }

    // process individual properties
    if (name.toUpperCase() === 'TIME') {
      if(!validate(value)){
        console.error('Invalid value: TIME');
      } else {
        value = returnDate(value);
      }
    } else if (name.toUpperCase() === 'WEIGHT') {
      hasWeight = true;
      if(!isNumeric(value)){
        console.error('Invalid value: WEIGHT');
      }
    } else if (name.toUpperCase() === 'COLOR') {
      if(isNumeric(value)){
        console.error('Invalid value: COLOR');
      }
    } else if (name.toUpperCase() === 'UNITS') {
      if(isNumeric(value)){
        console.error('Invalid value: UNITS');
      }
    } else if (name.toUpperCase() == 'IDENTIFIER'){
        checkForRepeats(value, records);
    }
    if (value == null){
      console.error(`Unassigned value: ${name}`);
    }

    properties[name.toUpperCase()] = value;

  }

  // ensure required properties are present
  for (const prop of requiredProperties) {
    if (!properties[prop]) {
      console.error(`Missing required property: ${prop}`);
    }
  }

  if (hasWeight && !properties['UNITS']) {
    console.error('Missing required property: UNITS');
  }

  return properties;
}

function checkForRepeats(id, records){
  for (const r of records) {
    if (r['IDENTIFIER'] === id){
      console.error('Duplicate IDENTIFIERs found');
    }
  }
}
function sortRecords(records) {
  return records.sort((a, b) => {
    const timeA = a['TIME']
    const timeB = b['TIME']
    return timeA - timeB;
  });
}


// Function to read the file, parse records, and sort them
function processFile(inputFile) {
  try {
    const data = fs.readFileSync(inputFile, 'utf-8');
    outputFile = 'output.txt';
    const records = [];
    let currentRecord = [];
    let lineNumber = 0;

    for (const line of data.split('\n')) {
      lineNumber++;

      // create individual records
      if (line.toUpperCase().startsWith('BEGIN:RECORD')) {
        currentRecord = [];
      } else if (line.toUpperCase().startsWith('END:RECORD')) {
        const recordProperties = parseRecord(currentRecord, records);
        records.push(recordProperties);
      } else {
        // check formatting of lines
        const keyValue = line.split(':');
        if (keyValue.length !== 2 || !keyValue[0].trim() || !keyValue[1].trim()) {
          throw new Error('Incorrectly formatted line');
        }
        currentRecord.push(line);
      }
    }

    const sortedRecords = sortRecords(records);

    fs.writeFileSync(outputFile, JSON.stringify(sortedRecords, null, 2));
    console.log('File processed successfully.');
  } catch (error) {
    console.error('Error processing file:', error.message);
    return false
  }
}


function isNumeric(str) {
  if (typeof str != "string") return false 
  return !isNaN(str) && !isNaN(parseFloat(str)) 
}
const isStringMadeOfDigits = (s) => /^\d+$/.test(s);
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


// Example usage
const inputFile = 'test9.txt';
const outputFile = 'output.txt';
processFile(inputFile, outputFile);

module.exports = {processFile}