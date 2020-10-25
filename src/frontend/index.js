const { getRandomWordSync, getRandomWord } = require('word-maker');
const https = require('https')
const endPointConfig = require('./http-config/http-config')

console.log('It works!');

const getWordFizzBuzz = w => `${w % 3 === 0 ? 'Fizz' : ''}${w % 5 === 0 ? 'Buzz' : ''}`;

const options = {
    hostname: endPointConfig.hostname,
    port: endPointConfig.port,
    path: endPointConfig.path,
    method: endPointConfig.method,
    headers: {
        'Content-Type': 'application/json'
    }
}

// Solution for 1st Task and 4th Task (Handling errors with getRandomWordSync({ withErrors: true }))

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
console.log('syncRandomWordResults', syncRandomWordResults)

// Solution for 2nd Task

function getResultsSyncWithFuzzBizz() {
    let wordResultWithFizBuzz = [];
    wordResultWithFizBuzz = syncRandomWordResults.map((value, index) => {
        index++;
        return `${index}: ${getWordFizzBuzz(index) || value.replace(index + ': ', '')}`;
    })
    return wordResultWithFizBuzz;

}

const finalOutputSecondTask = getResultsSyncWithFuzzBizz();

// Sending final solution for 1st and 2nd task through http request
const syncReqData = JSON.stringify({
    syncResult: finalOutputSecondTask
})
options.headers['Content-Length'] = syncReqData.length

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

    const finalOutputThirdAndForth = result
    // Sending final solution for 3rd and 4nd task through http request
    const asyncReqData = JSON.stringify({
        syncResult: finalOutputThirdAndForth
    })

    options.headers['Content-Length'] = asyncReqData.length

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
When you hit node src/frontend/index.js, final output will be sent through the http call. Since it doesn't have actual endpoint the call will fail.

 Bonus point tasks
    It's displaying in ascending order.
    When executing with getRandomWord({ slow: true }), executetime is giving execution duration around 521.364ms which is less than 1000ms
*/
