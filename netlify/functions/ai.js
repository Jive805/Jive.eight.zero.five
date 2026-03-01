const https = require('https');

exports.handler = async (event) => {
    const url = 'https://api.anthropic.com/v1/aiRequest'; // Replace with actual URL 
    const apiKey = process.env.ANTHROPIC_API_KEY;

    const data = JSON.parse(event.body);

    return new Promise((resolve, reject) => {
        const req = https.request(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        }, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                resolve({ statusCode: 200, body: body });
            });
        });

        req.on('error', (e) => {
            reject({ statusCode: 500, body: e.message });
        });

        req.write(JSON.stringify(data));
        req.end();
    });
};