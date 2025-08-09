const transferService = require('../service/transferService');

// Filename: transferService.test.js

describe('transferService', () => {
    describe('transfer', () => {
        it('should create a transfer with valid data', () => {
            const data = { from: 'A', to: 'B', amount: 100 };
            const result = transferService.transfer(data);
            expect(result).toHaveProperty('from', 'A');
            expect(result).toHaveProperty('to', 'B');
            expect(result).toHaveProperty('amount', 100);
        });

        it('should throw error with invalid data', () => {
            const data = { from: '', to: '', amount: -10 };
            expect(() => transferService.transfer(data)).toThrow();
        });
    });

    describe('getTransfers', () => {
        it('should return an array of transfers', () => {
            const result = transferService.getTransfers();
            expect(Array.isArray(result)).toBe(true);
        });
    });
});