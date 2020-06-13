import { once } from 'events';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import distanceBetweenTwoLocations from './utils/distanceBetweenTwoLocations.mjs';
import printResult from './utils/printResult.mjs';
import saveResultToFile from './utils/saveResultToFile.mjs';
import { OFFICE_LOCATION } from './utils/constants.mjs';

(async function processLineByLine() {
    try {
        let guestList = [];
        const rl = createInterface({
            input: createReadStream('partners.txt'),
            crlfDelay: Infinity
        });
        // Note: we use the crlfDelay option to recognize all instances of CR LF
        // ('\r\n') in input.txt as a single line break.

        rl.on('line', (line) => {
            const currentLocation = JSON.parse(line);
            const distance = distanceBetweenTwoLocations(OFFICE_LOCATION, currentLocation);
            currentLocation.distance = distance.toFixed(3);
            if (distance <= 100) {
                guestList.push(currentLocation);
            }
        });

        await once(rl, 'close');

        guestList = guestList.sort((a, b) => { return a.partner_id - b.partner_id });
        printResult(guestList);
        // saveResultToFile(guestList);
    } catch (err) {
        console.error(err);
    }
})();
