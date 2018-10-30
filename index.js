const WEBHOOK = process.env.GULLIBLE_WEBHOOK;
const request = require('request');
const moment = require('moment');
const facts = require('./facts.json');

const post = (entry) => {
    const facts = entry.facts.reduce((body, fact) => {
        return `${body}• ${fact}\n`;
    }, '');

    const options = {
        uri: WEBHOOK,
        method: 'POST',
        json: {
          "text": facts
        }
      };
      
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body.id) // Print the shortened url.
            console.log(`Posted facts for ${entry.date}!`);
        }
    });
}

const relativeMoment = moment().subtract(14, 'year').startOf('day');
const timestamp = relativeMoment.format();
const monthKey = relativeMoment.format('YYYY-MM');
const month = facts[monthKey];
const entry = month.find((entry) => {
    return entry.timestamp === timestamp;
});

post(entry);
