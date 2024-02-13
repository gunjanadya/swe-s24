const fs = require('fs');


function processFile(inputFile) {
    const data  = fs.readFileSync(inputFile, 'utf-8');
    const lines = data.split('\n');
    let timestamps   = [];
    let currentEvent = [];
    let lineNumber   = 0;
    let inEvent      = false;
    let isPID        = false;
    let isVer        = false;

    for (const line of lines) {
    lineNumber++;

    // check formatting of lines
    const keyValue = line.split(':');
    if (keyValue.length !== 2 || !keyValue[0].trim() || !keyValue[1].trim()) {
        console.error('Splitting Error');
        return false;
    }
    const [key, value] = keyValue.map(str => str.trim().toUpperCase());

    // file must start with begin:vcal
    if(lineNumber == 1 && !(line.toUpperCase() === 'BEGIN:VCALENDER')){
        console.error('Error: No Begin Calendar');
        return false;
    }else if(lineNumber == 1){
        continue;
    }
    //file must end with end:vcal
    if(lineNumber == lines.length && !(line.toUpperCase() === 'END:VCALENDER')){
        console.error('Error: No End Calendar');
        return false;
    }else if(lineNumber == lines.length){
        break;
    }

    // change the status of whether we are or are not in an event
    if(value == 'VEVENT'){
        if((key === 'BEGIN' && inEvent) ||
            key === 'END' && !inEvent){
                console.error('Error: Begin/End Event Error');
                return false;
        }
        if(key === 'BEGIN'){
            inEvent = true;
            currentEvent = [];
        }
        if(key === 'END'){
            let eventTimestamp = validateEvent(currentEvent)
            if(!eventTimestamp){
                console.error('Error: Invalid Event');
                return false;
            }else{
                inEvent = false;
                currentEvent = [];
                if(!timestamps.includes(eventTimestamp)){
                    timestamps.push(eventTimestamp);
                }else{
                    console.error('Error: Overlapping Timestamp');
                    return false;
                }
            }
        }
    }else if (!inEvent){
        // Check for overhead properties
        if(key === 'PRODID'){
            if(isPID){
                console.error('Error: no ProdID');
                return false;
            }
            isPID = true;
        }else if(key == 'VERSION'){
            if(isVer){
                console.error('Error: No Version');
                return false;
            }
            isVer = true;
        }else{
            console.error(`Error: Unrecognized Key - ${key} at line ${lineNumber}`);
            return false;
        }
    }else if(inEvent){
        // add intraevent properties to array to be checked all together
        currentEvent.push(line);
    }
    }
    if(isVer && isPID && timestamps.length){
        console.log('File Processed Successfully!');
        return true;
    }else{
        console.error('Error: Required Property Missing')
        return false;
    }

}

function validateEvent(event){
    const etcProps = [
        "class", 
        "created", 
        "description", 
        "geo", 
        "last-mod", 
        "location", 
        "organizer", 
        "priority", 
        "seq", 
        "summary", 
        "transp", 
        "url", 
        "recurid", 
        "rrule", 
        "dtend", 
        "duration", 
        "attach", 
        "categories", 
        "comment", 
        "contact", 
        "exdate", 
        "rstatus", 
        "related", 
        "resources", 
        "rdate", 
        "x-prop", 
        "iana-prop" ];
    const options = [
        "CREATED",
        "DTEND",
        "DTSTAMP",
        "DURATION",
        "LAST-MODIFIED",
        "NAME",
        "ORGANIZER",
        "DESCRIPTION",
    ];
    const reqd = [
        "ATTENDEE",
        "DTSTART",
        "DTSTAMP",
        "METHOD",
        "STATUS"
    ];
    const warnings = etcProps.map(prop => prop.toUpperCase());
    let props      = [];
    let attendee   = false;
    let start      = false;
    let stamp      = false;
    let method     = false;
    let status     = false;

    // validate every key-value pair
    for(const property of event){
        // split into key-value pairs
        const [key, value] = property.toUpperCase().split(':');

        // check for repeat keys
        if (props.includes(key)){
            console.error('Event Error: Repeat Key');
            return false;
        
        // check for different categories of keys
        }else if(reqd.includes(key)){
            if(key === 'ATTENDEE'){
                attendee = true;
                props.push(key);
            }else if(key === 'DTSTART'){
                try{
                    start = new Date(value);
                }catch{
                    console.error('Event Error: Invalid DTSTART Date');
                    return false;
                }
                if (isNaN(start.getTime())) {
                    console.error('Event Error: Invalid DTSTART Date');
                    return false;
                }
            }else if(key === 'DTSTAMP'){
                try{
                    stamp = new Date(value);
                }catch{
                    console.error('Event Error: Invalid DTSTAMP Date');
                    return false;
                }
                if (isNaN(stamp.getTime())) {
                    console.error('Event Error: Invalid DTSTAMP Date');
                    return false;
                }
            }else if(key === 'METHOD'){
                if(value === 'REQUEST'){
                    method = true;
                }else{
                    console.error('Event Error: Invalid METHOD');
                    return false;
                }
            }else if(key === 'STATUS'){
                if(value === 'TENTATIVE' ||
                   value === 'CONFIRMED' ||
                   value === 'CANCELLED'){
                    status = true;
                   }else{
                    console.error('Event Error: Invalid STATUS');
                    return false;
                   }
            }
            props.push(key);
        }else if(options.includes(key)){
            props.push(key);
        }else if(warnings.includes(key)){
            console.log("Warning: Unsupported Property");
            props.push(key);
        }else{
            console.log('Event Error: Unrecognized Key');
            return false;
        }
    }

    // ensure all required properties are present
    if(attendee && start && stamp && method && status){

        // ensure stamp date is prior to start date
        if (stamp > start){
            console.error('Event Error: DTSTAMP > DSTART');
            return false;
        }

        // if event is valid, return start time
        return start;
    }else{
        console.error('Event Error: Missing Required Property');
        return false;
    }
}

processFile("test22.txt");
module.exports = {processFile, validateEvent};