const {processFile} = require('../../HW2/recordsKeeper')

describe("Records Keeper", function() {
    it('should throw an error if there is more than one : on a single line', function(done) {
        let error = false;
        try {
          processFile('test1.txt', 'output.txt');
        } catch (e) {
          error = true;
        }
        expect(error).toBe(true);
    });

      it('should throw an error if there is no IDENTIFIER', function() {
        let error = false;
        try {
          processFile('test2.txt', 'output.txt');
        } catch (e) {
          error = true;
        }
        expect(error).toBe(true);
      });

      it('should throw an error if there is no TIME', function() {
        let error = false;
        try {
          processFile('test3.txt', 'output.txt');
        } catch (e) {
          error = true;
        }
        expect(error).toBe(true);
      });

      it('should throw an error if there is WEIGHT but no UNITS', function() {
        let error = false;
        try {
          processFile('test4.txt', 'output.txt');
        } catch (e) {
          error = true;
        }
        expect(error).toBe(true);
      });

      it('should throw an error if there is an invalid TIME', function() {
        let error = false;
        try {
          processFile('test5.txt', 'output.txt');
        } catch (e) {
          error = true;
        }
        expect(error).toBe(true);
      });

      it('should throw an error if there is an invalid WEIGHT', function() {
        let error = false;
        try {
          processFile('test6.txt', 'output.txt');
        } catch (e) {
          error = true;
        }
        expect(error).toBe(true);
      });

      it('should throw an error if there is an invalid UNITS', function() {
        let error = false;
        try {
          processFile('test7.txt', 'output.txt');
        } catch (e) {
          error = true;
        }
        expect(error).toBe(true);
      });

      it('should throw an error if there is an invalid COLOR', function() {
        let error = false;
        try {
          processFile('test8.txt', 'output.txt');
        } catch (e) {
          error = true;
        }
        expect(error).toBe(true);
      });

      it('should throw an error if there is a repeat IDENTIFIER', function() {
        let error = false;
        try {
          processFile('test9.txt', 'output.txt');
        } catch (e) {
          error = true;
        }
        expect(error).toBe(true);
      });

      it('should sort the records in ascending time order if the format is valid', function() {
        let error = false;
        processFile('test10.txt', 'output.txt');
        expect(error).toBe(false);
      });
});