import chai from 'chai';
import distanceBetweenTwoLocations from '../utils/distanceBetweenTwoLocations.mjs';
import { OFFICE_LOCATION } from '../utils/constants.mjs';

const TEST_LOCATION = {
    "latitude": "42.6661417",
    "partner_id": 12,
    "name": "Kristian Mandradzhiev",
    "longitude": "23.293435",
}

const TEST_DISTANCE = '4.766';

const COORDINATES_ARE_NOT_A_NUMBER = {
    "latitude": "x",
    "partner_id": 12,
    "name": "Kristian Mandradzhiev",
    "longitude": "23.293435",
}

const COORDINATES_ARE_OUT_OF_SCOPE = {
    "latitude": "200",
    "partner_id": 12,
    "name": "Kristian Mandradzhiev",
    "longitude": "23.293435",
}

describe('distanceBetweenLocations tests', () => {
    describe('input is correct', () => {
        it('should equal to 4.766', () => {
            const distance = (distanceBetweenTwoLocations(OFFICE_LOCATION, TEST_LOCATION)).toFixed(3);
            chai.expect(distance).to.equal(TEST_DISTANCE);
        });
    });

    describe('input is not a number', () => {
        it('should throw error: Location coordinates are not correct!', () => {
            chai.expect(() => distanceBetweenTwoLocations(OFFICE_LOCATION, COORDINATES_ARE_NOT_A_NUMBER)).to.throw('Location coordinates are not correct!');
        });
    });

    describe('input is out of scope', () => {
        it('should throw error: Location coordinates are not correct!', () => {
            chai.expect(() => distanceBetweenTwoLocations(OFFICE_LOCATION, COORDINATES_ARE_OUT_OF_SCOPE)).to.throw('Location coordinates are not correct!');
        });
    });
});
