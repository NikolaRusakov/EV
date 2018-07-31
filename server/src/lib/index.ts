import {votes} from './votes';
import {format} from 'url'
// import * as pify from 'pify'
import {load} from 'cheerio';
// import {getRandom} from 'random-fake-useragent'
import {getRandom} from 'random-useragent';

const pify = require('pify');
const got = require('got');
const request = require('request');
export const lookup = (browser,word, callback) => {
    let url = format({
        protocol: 'https:',
        hostname: 'www.powerthesaurus.org',
        pathname: word
    })
    const requestOpts = {
        headers: {
            // 'method':'GET',
            'user-agent': getRandom([browser]),
            // 'Access-Control-Allow-Origin': '*',
            // 'X-Content-Type-Options': 'nosniff',
            // 'Access-Control-Allow-Methods': 'GET',
            // 'Access-Control-Allow-Headers': 'Content-Type'
        }

    }


    const options = {
        url: url,
        method: 'GET',
        headers: {
            // 'user-agent': getRandom([navigator.appName]),
            // 'user-agent': getRandom([navigator.appName]),
            // 'Access-Control-Allow-Origin': 'https://www.powerthesaurus.org',
            // 'Origin':'https://www.powerthesaurus.org',
            // // 'X-Content-Type-Options': 'nosniff',
            // 'Content-Type':'text/plain',
            // 'Access-Control-Allow-Methods': 'GET',
            // 'Access-Control-Allow-Headers': 'Content-Type'
        }
    };

    got(url, requestOpts).then(response => {
        let $ = load(response.body)
        // pt-thesaurus-card__term-title
        let customBody=response.body
        customBody.replace("\n","");
        customBody.replace("/\\\\/g","");
        console.log(customBody);
        let results = $('tr.theentry').map((i, el) => {
            let v = votes($(el).find('.rating').attr('title'))
            console.log($(el).find('td.abbdef a').first().text());
            return {
                word: $(el).find('td.abbdef a').first().text(),
                upVotes: v.up,
                downVotes: v.down
            }
        }).get()
        const fun={
            data:[response.body]
        }
        // return callback(null, results)
        return callback(null, fun)
    })
        .catch(error => {
            return callback(error)
        })
};
export const googleLookup = (browser,word, callback) => {
    let url = format({
        protocol: 'https:',
        hostname: 'translate.google.com',
        pathname: `/%23en/cs/${word}`
    })

    const requestOpts = {
        headers: {'user-agent': getRandom([browser])}
    }
    request(url, function (error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });
    console.log(requestOpts.headers["user-agent"]);
    console.log(url);
    got(decodeURI(url), requestOpts.headers["user-agent"]).then(response => {
        console.log(typeof response.body);
        let customBody=response.body.toString()
        customBody.replace("\n","");
        customBody.replace("/\\\\/g","");
        console.log(customBody);
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

module.exports = pify(lookup)

// export default pify(lookup);
