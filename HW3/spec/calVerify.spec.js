const  {processFile, validateEvent} = require('../../HW3/calVerify');

describe("iCal Verify", function(){
    it("should process a file formatted correctly", function(){
        let expected = true;
        let actual = processFile('test1.txt');
        expect(actual).toBe(expected);
    });

    it("should process a file formatted correctly with inconsistent case", function(){
        let expected = true;
        let actual = processFile('test2.txt');
        expect(actual).toBe(expected);
    });

    it("should not process a file without a begin calendar line", function(){
        let expected = false;
        let actual = processFile('test3.txt');
        expect(actual).toBe(expected);
    });

    it("should not process a file without an end calendar line", function(){
        let expected = false;
        let actual = processFile('test4.txt');
        expect(actual).toBe(expected);
    });

    it("should not process a file without a version property", function(){
        let expected = false;
        let actual = processFile('test5.txt');
        expect(actual).toBe(expected);
    });

    it("should not process a file without a prodID property", function(){
        let expected = false;
        let actual = processFile('test6.txt');
        expect(actual).toBe(expected);
    });

    it("should not process a file with an unrecognized property", function(){
        let expected = false;
        let actual = processFile('test7.txt');
        expect(actual).toBe(expected);
    });

    it("should not process a file without an event", function(){
        let expected = false;
        let actual = processFile('test8.txt');
        expect(actual).toBe(expected);
    });

    it("should not process a file with multiple : in one line", function(){
        let expected = false;
        let actual = processFile('test9.txt');
        expect(actual).toBe(expected);
    });

    it("should not process a file without : in one line", function(){
        let expected = false;
        let actual = processFile('test10.txt');
        expect(actual).toBe(expected);
    });

    it("should not process a file with repeat properties", function(){
        let expected = false;
        let actual = processFile('test11.txt');
        expect(actual).toBe(expected);
    });

    it("should not process a file without an attendee property", function(){
        let expected = false;
        let actual = processFile('test12.txt');
        expect(actual).toBe(expected);
    });

    it("should not process a file without a DTSTART property", function(){
        let expected = false;
        let actual = processFile('test13.txt');
        expect(actual).toBe(expected);
    });

    it("should not process a file without a DTSTAMP property", function(){
        let expected = false;
        let actual = processFile('test14.txt');
        expect(actual).toBe(expected);
    });

    it("should not process a file without a METHOD property", function(){
        let expected = false;
        let actual = processFile('test15.txt');
        expect(actual).toBe(expected);
    });

    it("should not process a file without a status property", function(){
        let expected = false;
        let actual = processFile('test16.txt');
        expect(actual).toBe(expected);
    });

    it("should not process a file with an invalid Date property", function(){
        let expected = false;
        let actual = processFile('test17.txt');
        expect(actual).toBe(expected);
    });

    it("should not process a file with an invalid METHOD property", function(){
        let expected = false;
        let actual = processFile('test18.txt');
        expect(actual).toBe(expected);
    });

    it("should not process a file with an invalud STATUS property", function(){
        let expected = false;
        let actual = processFile('test19.txt');
        expect(actual).toBe(expected);
    });

    it("should not process a file with a start time before stamp time", function(){
        let expected = false;
        let actual = processFile('test20.txt');
        expect(actual).toBe(expected);
    });

    it("should process a file with a specified optional property", function(){
        let expected = true;
        let actual = processFile('test21.txt');
        expect(actual).toBe(expected);
    });

    it("should process a file with an unspecified optional property", function(){
        let expected = true;
        let actual = processFile('test22.txt');
        expect(actual).toBe(expected);
    });

    it("should not process a file with an unknown property", function(){
        let expected = false;
        let actual = processFile('test23.txt');
        expect(actual).toBe(expected);
    });

    it("should not process a file with an empty key (no value)", function(){
        let expected = false;
        let actual = processFile('test24.txt');
        expect(actual).toBe(expected);
    });

    it("should not process a file with events on the same day", function(){
        let expected = false;
        let actual = processFile('test24.txt');
        expect(actual).toBe(expected);
    });
});
