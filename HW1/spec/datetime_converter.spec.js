
const {validate, returnDate} = require('../../HW1/datetime_converter')

describe("Datetime Converter", function() {

    it("should return the correct datetime for valid input after epoch", function() {
        let actual = returnDate("20030716T050300");
        let expected = new Date("Wed Jul 16 2003 05:03:00 GMT-0400 (Eastern Daylight Time)");
        expect(actual).toEqual(expected); 

    });

    it("should return the correct datetime for valid input before epoch", function() {
        let actual = returnDate("19690716T050300");
        let expected = new Date("1969-07-16T05:03:00");
        expect(actual).toEqual(expected); 

    });

    it("should not return a datetime for feb 29 in a non centenial non leap year", function() {
        let actual = validate("20030229T050300");
        let expected = false;
        expect(actual).toBe(expected); 

    });

    it("should return a datetime for feb 29 in a non centenial leap year", function() {
        let actual = returnDate("20040229T220000");
        let expected = new Date("2004-02-29T22:00:00");
        expect(actual).toEqual(expected); 

    });

    it("should return a datetime for feb 29 in a centennial leap year", function() {
        let actual = returnDate("20000229T220000");
        let expected = new Date("2000-02-29T22:00:00");
        expect(actual).toEqual(expected); 

    });

    it("should not return a datetime for feb 29 in a centennial non leap year", function() {
        let actual = validate("21000229T050300");
        let expected = false;
        expect(actual).toBe(expected); 

    });

    it("should return a datetime for midnight", function() {
        let actual = returnDate("20030731T000000");
        let expected = new Date("2003-07-31T00:00:00");
        expect(actual).toEqual(expected); 

    });

    it("should not return a datetime for hours out of bounds", function() {
        let actual = validate("20030222T240000");
        let expected = false;
        expect(actual).toBe(expected); 

    });
    
    it("should not return a datetime for minutes out of bounds", function() {
        let actual = validate("20030222T226700");
        let expected = false;
        expect(actual).toBe(expected); 

    });

    it("should not return a datetime for seconds out of bounds", function() {
        let actual = validate("20030222T220067");
        let expected = false;
        expect(actual).toBe(expected); 

    });

    it("should not return a datetime for month greater than bounds", function() {
        let actual = validate("20032222T220000");
        let expected = false;
        expect(actual).toBe(expected); 

    });

    it("should not return a datetime for month lower than bounds", function() {
        let actual = validate("20030022T220000");
        let expected = false;
        expect(actual).toBe(expected); 

    });

    it("should not return a datetime for day out of bounds", function() {
        let actual = validate("20030735T220000");
        let expected = false;
        expect(actual).toBe(expected); 

    });

    it("should not return a datetime for the 31st of a 30 day month", function() {
        let actual = validate("20030431T220000");
        let expected = false;
        expect(actual).toBe(expected); 

    });

    it("should return a datetime for the 31st of a 31 day month", function() {
        let actual = returnDate("20030731T220000");
        let expected = new Date("2003-07-31T22:00:00");
        expect(actual).toEqual(expected); 

    });

    it("should not return a datetime without the T", function() {
        let actual = validate("200304312200000");
        let expected = false;
        expect(actual).toBe(expected); 

    });

    it("should not return a datetime with nonnumerical symbols", function() {
        let actual = validate("-2003073T220000");
        let expected = false;
        expect(actual).toBe(expected); 

    });


    
});