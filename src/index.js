const { getRandomWordSync, getRandomWord } = require('word-maker');
const fs = require('fs');

console.log('It works!');

const getWordFizzBuzz = w => `${w % 3 === 0 ?  'Fizz' : ''}${w % 5 === 0 ? 'Buzz' : ''}`;

// Solution for 1st Task and 4th Task (Handling errors for synchronous with getRandomWordSync({ withErrors: true }))

function getResultsSync() {
    return Array(100).fill().map((value, index) => {
        index++;
        try {
            return `${index}: ${getRandomWordSync({ withErrors: true })}`;
        } catch (err) {
            return `${index}: It shouldn't break anything!`;
        }
    });
}

var syncRandomWordResults = getResultsSync();
const finalOutputFirstTask = syncRandomWordResults.join('\n');
fs.writeFileSync('First task solution.txt', finalOutputFirstTask);
console.log('First task solution has been saved');


// Solution for 2nd Task

function getResultsSyncWithFuzzBizz() {
    let wordResultWithFizBuzz=[];
    wordResultWithFizBuzz =  syncRandomWordResults.map((value,index)=>{
        index++;
            return `${index}: ${getWordFizzBuzz(index) || value.replace(index+': ','')}`;
    })
    return wordResultWithFizBuzz;

}

const finalOutputSecondTask = getResultsSyncWithFuzzBizz().join('\n');
fs.writeFileSync('Second task solution.txt', finalOutputSecondTask);
console.log('Second task solution has been saved');

// 3rd and 4th tasks

async function getResultsWithFizzBuzzAsync() {
    console.time("executetime");
    const promisesArray = Array(100).fill().map(async (value, index) => {
        index++;
        try {
            return `${index}: ${getWordFizzBuzz(index) || await getRandomWord({ slow: true })}`;
        } catch (err) {
            return `${index}: It shouldn't break anything!`;
        }

    });

    return await Promise.all(promisesArray);
}

getResultsWithFizzBuzzAsync().then(result => {
    const finalOutputThirdAndForth = result.join('\n')
    fs.writeFileSync('Third and Forth task solution.txt', finalOutputThirdAndForth);
    console.log('Third and Forth task solution has been saved');
    console.timeEnd("executetime");

}).catch(err => console.log(err));

/* Solution for task 5
 When you hit npm start, each of the tasks solutions will be store in to separate files.

Bonus point tasks
    It's displaying in ascending order.
    When executing with getRandomWord({ slow: true }), executetime is giving execution duration around 523.640ms which is less than 1000ms
*/
