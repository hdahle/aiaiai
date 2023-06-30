/*
 * A super-simple node.js HTTP(S) API-proxy
 *
 * H Dahle
 *
 *  Example of properly formatted BODY in POST request
 *       {
 *         model: "davinci:ft-hamachi-as-2023-06-27-08-20-34",
 *         prompt: "What is the meaning of life?",
 *         temperature: 0.3,
 *         max_tokens: 100,
 *         presence_penalty: 0,
 *         frequency_penalty: 0,
 *         stop: ['\n', ' ->']
 *       }
 */


var http = require('http');
var https = require('https');
var fs = require('fs');
var process = require('./env');
const HTTP_PORT = 8080;
const HTTPS_PORT = 4443;
var fetch = require('node-fetch');

// For the certificate stuff
const keyFile = '/opt/bitnami/letsencrypt/certificates/api.dashboard.eco.key';
const crtFile = '/opt/bitnami/letsencrypt/certificates/api.dashboard.eco.crt';

// Start HTTPS server if KEY and CERT exists
if (fs.existsSync(keyFile) && fs.existsSync(crtFile)) {
  var httpsOptions = {
    key: fs.readFileSync(keyFile),
    cert: fs.readFileSync(crtFile),
    rejectUnauthorized: false,
    agentOptions: {
      checkServerIdentity: function () { }
    }
  };
  https.createServer(httpsOptions, requestListener).listen(HTTPS_PORT);
} else {
  console.log('Warning: Not starting HTTPS server. Cert not found');
}

// Start HTTP server 
let httpServer = http.createServer(requestListener).listen(HTTP_PORT);
httpServer.on('error', function (e) {
  console.log(`Error starting HTTP server on port ${HTTP_PORT}. Use sudo in order to get root access to low port numbers`);
});

// Listener for both HTTPS and HTTP servers 
// We are only proxying POST requests
function requestListener(request, response) {
  if (request.method == 'POST') {
    response.writeHead(200, {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*'
    });
    let json = '';
    request.on('data', (data) => {
      json += data;
    })
    request.on('end', async () => {
      console.log('complete body', json)
      const OPENAI_URL = "https://api.openai.com/v1/completions"
      const OPENAI_API_KEY = process.process.env.OPENAI_API_KEY;
      const openAiResponse = await fetch(OPENAI_URL, {
        method: 'POST',
        body: json,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json, text/plain, */*",
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "User-Agent": "OpenAI/NodeJS/3.3.0"
        }
      })
      const answer = await openAiResponse.json()
      console.log(answer)
      response.write(JSON.stringify(answer))
      response.end('\n')
    })
  }
  else {
    // This is a GET request which we're not interested in
    console.log('get request')
    response.writeHead(200, {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*'
    });
    response.end('\n')
  }
}
