const { getRandomWordSync, getRandomWord } = require('word-maker');
const fs = require('fs');

console.log('It works!');

const getWordFizzBuzz = w => `${w % 3 === 0 ? 'Fizz' : ''}${w % 5 === 0 ? 'Buzz' : ''}`;

/* Solution for 1st and 2nd tasks - With synchronous function.
Since 4th task is asking to handle error for synchronous function as well, added try, catch and { withErrors: true } to the code. */

function getResultsWithFizzBuzzSync() {
    return Array(100).fill().map((value, index) => {
        index++;
        try {
            return `${index}: ${getWordFizzBuzz(index) || getRandomWordSync({ withErrors: true })}`;
        } catch (err) {
            return `${index}: It shouldn't break anything!`;
        }
    });
}

const finalOutputSync = getResultsWithFizzBuzzSync().join('\n');
fs.writeFileSync('Synchronous task solution.txt', finalOutputSync);
console.log('Synchronous task solution has been saved');


//Solution for 3rd and 4th tasks - With asynchronous function

async function getResultsWithFizzBuzzAsync() {
    console.time("executetime");
    const promisesArray = Array(100).fill().map(async (value, index) => {
        index++;
        try {
            return `${index}: ${getWordFizzBuzz(index) || await getRandomWord({ withErrors: true })}`;
        } catch (err) {
            return `${index}: It shouldn't break anything!`;
        }

    });

    return await Promise.all(promisesArray);
}

getResultsWithFizzBuzzAsync().then(result => {

    const finalOutputAsync = result.join('\n')
    fs.writeFileSync('Asynchronous task solution.txt', finalOutputAsync);
    console.log('Asynchronous task solution has been saved');
    console.timeEnd("executetime");

}).catch(err => console.log(err));

/* Solution for task 5
 When you hit npm start, each of the sync and async solutions will be store in to separate files.

Bonus point tasks
    It's displaying in ascending order.
    When executing with getRandomWord({ slow: true }), executetime is giving execution duration as 524.647ms which is less than 1000ms
*/
