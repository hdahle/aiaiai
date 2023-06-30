# OpenAI Playground

Frontend application inspired by 
https://scrimba.com/learn/buildaiapps

Completely rewritten to remove dependencies on
- Netlify
- OpenAI node.js module
- Vite for bundling of js

In order to make front-end responsive, using w3.css instead of home-brew Scrimba CSS

## Random comments

- Get an API key from OpenAPI
- The Youtube/Scrimba project this is based on used Vite for deployment
- While Vite worked well for hosting on localhost, I could not get it to build an app correctly for remote deployment
- It seemed better to remove any unnecessary dependencies and avoid having to bundle

For 'production' deployment, the original Scrimba app used Netlify in order to hide the OpenAI key in a serverless function on Netlify, so the front-end app would call Netlify which in turn would call OpenAI API, instead of having the front-end app call OpenAI API directly which would expose the key

This app uses a similar approach:

- In the proxy folder, there is a banal proxy which is deployed on AWS/Lightsail
- The front-end app will simply do a POST to this proxy, and the BODY in the POST is simply forwarded to OpenAI
- Whatever OpenAI returns is returned blindly back to the front end app

## The custom training data

- This is really the difficult part - preparing enough data in the right format for fine-tuning (training) the AI model.
- My original CSV-formatted training file is in ```data```
- I used openai CLI to convert it to JSONL format
- The JSONL-file is then fine tuned and a model is created. This can take minutes, hours, days
