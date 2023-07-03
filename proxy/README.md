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

### Using the proxy
