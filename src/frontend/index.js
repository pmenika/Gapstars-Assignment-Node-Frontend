const { getRandomWordSync, getRandomWord } = require('word-maker');
const https = require('https')
const endPointConfig = require('./http-config/http-config')

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

const finalOutputSync = getResultsWithFizzBuzzSync();

const syncReqData = JSON.stringify({
    syncResult: finalOutputSync
})

const options = {
    hostname: endPointConfig.hostname,
    port: endPointConfig.port,
    path: endPointConfig.path,
    method: endPointConfig.method,
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': syncReqData.length
    }
}

const syncReq = https.request(options, res => {
    res.on('data', d => {
        process.stdout.write(d)
    })
})

syncReq.on('error', error => {
    console.error(error)
})

syncReq.write(syncReqData)
syncReq.end()

//Solution for 3rd and 4th tasks - With asynchronous function

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

    const finalOutputAsync = result
    const asyncReqData = JSON.stringify({
        syncResult: finalOutputAsync
    })

    const options = {
        hostname: endPointConfig.hostname,
        port: endPointConfig.port,
        path: endPointConfig.path,
        method: endPointConfig.method,
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': asyncReqData.length
        }
    }

    const asyncReq = https.request(options, res => {
        res.on('data', d => {
            process.stdout.write(d)
        })
    })

    asyncReq.on('error', error => {
        console.error(error)
    })

    asyncReq.write(asyncReqData)
    asyncReq.end()

    console.timeEnd("executetime");

}).catch(err => console.log(err));

/* solution for task 5
When you hit node src/frontend/index.js, final output of each synchronous and asynchronous functions will be sent through the http call. Since it doesn't have actual endpoint the call will fail.

 Bonus point tasks
    It's displaying in ascending order.
    When executing with getRandomWord({ slow: true }), executetime is giving execution duration as 523.847ms which is less than 1000ms
*/
