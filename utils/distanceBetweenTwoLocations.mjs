import { EARTH_RADIUS } from './constants.mjs';

function checkIfLocationIsCorrect(locationX, locationY) {
    const latitudeX = locationX.latitude;
    const longitudeX = locationX.longitude;
    const latitudeY = locationY.latitude;
    const longitudeY = locationY.longitude;
    if (isNaN(latitudeX) || isNaN(longitudeX) || isNaN(latitudeY) || isNaN(longitudeY)
        || latitudeX < -90 || latitudeX > 90 || longitudeX < -180 || longitudeX > 180
        || latitudeY < -90 || latitudeY > 90 || longitudeY < -180 || longitudeY > 180) {
        throw new Error('Location coordinates are not correct!');
    }
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
}

function centralSubtendedAngle(locationX, locationY) {
    checkIfLocationIsCorrect(locationX, locationY);
    const locationXLatRadians = degreesToRadians(locationX.latitude);
    const locationYLatRadians = degreesToRadians(locationY.latitude);
    return radiansToDegrees(
        Math.acos(
            Math.sin(locationXLatRadians) * Math.sin(locationYLatRadians) +
            Math.cos(locationXLatRadians) *
            Math.cos(locationYLatRadians) *
            Math.cos(
                degreesToRadians(
                    Math.abs(locationX.longitude - locationY.longitude)
                )
            )
        )
    )
}

function greatCircleDistance(angle) {
    return 2 * Math.PI * EARTH_RADIUS * (angle / 360);
}

export default function distanceBetweenTwoLocations(locationX, locationY) {
    return greatCircleDistance(centralSubtendedAngle(locationX, locationY));
}