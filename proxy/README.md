# API Proxy for the AIAIAI project

A hacked-together proxy

I deployed this on AWS (actually AWS Lightsail) since I had a Ubuntu server available there

## Deployment-notes on AWS Lightsail

### Runtime monitor
Run open-proxy.js under PM2 so that it restarts if (when?) it crashes

### Ports
I randomly chose these ports
- HTTP: 8080
- HTTPS: 4443

### Certificates
For HTTPS I use the following
````
// For the certificate stuff
const keyFile = '/opt/bitnami/letsencrypt/certificates/api.dashboard.eco.key';
const crtFile = '/opt/bitnami/letsencrypt/certificates/api.dashboard.eco.crt';
````

### How it works
- The proxy listens on 8080 for HTTP and 4443 for HTTPS
- The proxy has access to the OpenAI API key
- When it receives a POST from the app, it forwards the POST body along with the API key to OpenAI
- The proxy awaits a response from OpenAI
- The proxy then takes the response body from OpenAI and returns it to the calling frontend-app

### Using the proxy
The frontend app uses the proxy like this:
````
const response = await fetch('https://api.dashboard.eco:4443/', {
    method: 'POST',
    body: JSON.stringify({
      model: 'davinci:ft-hamachi-as-2023-06-27-08-20-34',
      prompt: conversationStr,
      max_tokens: 100,
      presence_penalty: 0,
      frequency_penalty: 0,
      temperature: 0,
      stop: ['\n', ' ->']
    }),
    headers: {
      "Accept": "application/json, text/plain, */*"
    }
  })
  const result = await response.json()
````

