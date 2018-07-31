import {votes} from './votes';
import {format} from 'url'
// import * as pify from 'pify'
import {load} from 'cheerio';
// import {getRandom} from 'random-fake-useragent'
import {getRandom} from 'random-useragent';

const got = require('got');
const request = require('request');
export const lookup = (word, callback) => {
    let url = format({
        protocol: 'https:',
        hostname: 'www.powerthesaurus.org',
        pathname: word
    })

    const requestOpts = {
        headers: {
            // 'method':'GET',
            'user-agent': getRandom([navigator.appName]),
            'Access-Control-Allow-Origin': '*',
            // 'X-Content-Type-Options': 'nosniff',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type'
        }

    }


    const options = {
        url: url,
        method: 'GET',
        headers: {
            // 'user-agent': getRandom([navigator.appName]),
            'user-agent': navigator.userAgent,
            // 'Access-Control-Allow-Origin': 'https://www.powerthesaurus.org',
            // 'Origin':'https://www.powerthesaurus.org',
            // // 'X-Content-Type-Options': 'nosniff',
            // 'Content-Type':'text/plain',
            // 'Access-Control-Allow-Methods': 'GET',
            // 'Access-Control-Allow-Headers': 'Content-Type'
        }
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            console.log(info.stargazers_count + " Stars");
            console.log(info.forks_count + " Forks");
        } else {
            console.error(error)
        }
    }

    return request(options, callback);
    // console.log(requestOpts.headers["user-agent"]);
    // console.log(requestOpts.headers);
    // console.log(url);
    // got(url, requestOpts).then(response => {
    //     var $ = load(response.body)
    //     var results = $('tr.theentry').map((i, el) => {
    //         var v = votes($(el).find('.rating').attr('title'))
    //
    //         return {
    //             word: $(el).find('td.abbdef a').first().text(),
    //             upVotes: v.up,
    //             downVotes: v.down
    //         }
    //     }).get()
    //     return callback(null, results)
    // })
    //     .catch(error => {
    //         return callback(error)
    //     })
};
export const googleLookup = (word, callback) => {
    let url = format({
        protocol: 'https:',
        hostname: 'translate.google.com',
        pathname: `/%23en/cs/${word}`
    })

    const requestOpts = {
        headers: {'user-agent': getRandom([navigator.appName])}
    }
    console.log(requestOpts.headers["user-agent"]);
    console.log(url);
    got(url, requestOpts.headers["user-agent"]).then(response => {
        var $ = load(response.body)
        var results = $('tr.theentry').map((i, el) => {
            var v = votes($(el).find('.rating').attr('title'))

            return {
                word: $(el).find('td.abbdef a').first().text(),
                upVotes: v.up,
                downVotes: v.down
            }
        }).get()
        return callback(null, results)
    })
        .catch(error => {
            return callback(error)
        })
};

// module.exports = pify(lookup)

// export default pify(lookup);
