import fs from 'fs';

export default function saveResultToFile(output) {
    let text = 'Guest list:\r\n';
    for (let index = 0; index < output.length; index++) {
        const guest = output[index];
        text += `${index + 1}. ${guest.name} - [id: ${guest.partner_id}] - [distance: ${guest.distance}km]\r\n`;
    }
    fs.writeFile("./output/guestList.txt", text, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}
