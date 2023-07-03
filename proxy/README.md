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
