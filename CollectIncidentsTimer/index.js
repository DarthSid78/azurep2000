let Parser = require('rss-parser');
let parser = new Parser();
 
module.exports = async function (context) {

    const URL = process.env.P2000_FEED;

    if(!URL) {
        context.log.error('P2000 not configured!');
        context.done();
    }

    context.log('Start collecting incidents');

    let feed = await parser.parseURL(URL); 
    let data = [];

    feed.items.forEach(item => {
    
        let i = {
            id: item.guid,
            title: item.title,
            description: item.content,
            ts: item.isoDate
        };
        data.push(i);
    });

    context.log('Collected %d incidents,', data.length);

    context.bindings.incident = data;
};