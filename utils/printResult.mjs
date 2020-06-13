export default function printResult(output) {
    console.log('Guest list:');
    for (let index = 0; index < output.length; index++) {
        const guest = output[index];
        console.log(`${index + 1}. ${guest.name} - [id: ${guest.partner_id}] - [distance: ${guest.distance}km]`);
    }
}