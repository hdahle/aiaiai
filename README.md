# OpenAI Playground

Frontend application inspired by 
[Build AI Apps with ChatGPT, Dall-E and GPT-4](https://scrimba.com/learn/buildaiapps)

The frontend is a super-simple HTML/CSS/JS app which uses the [OpenAI API](https://platform.openai.com/docs/api-reference)

The Freecodecamp/Scrimba course on OpenAI was quite useful, but I decided to do some changes to my implementation. I removed the dependencies on
- Netlify
- OpenAI node.js module
- Vite for bundling of js

Also, I changed the CSS to be responsive, using [W3Schools W3.CSS framework](https://www.w3schools.com/w3css/defaulT.asp)

## Architecture

````
                                              OpenAI API Key
                                                    |
                                                    V
|--------------------|                      |---------------|                      |------------|
|                    | --> POST request --> |  API Proxy    | --> POST Request --> |            |
| Client HTML/JS app |                      |      in       |                      | OpenAI API |
|                    | <----  Reply  <----- | AWS/Lightsail | <----  Reply  <----- |            |
|--------------------|                      |---------------|                      |------------|
````


## Random comments

- You need Get an API key from OpenAPI
- The Youtube/Scrimba project this is based on used Vite for deployment
- While Vite worked well for hosting on localhost, I could not get it to build an app correctly for remote deployment
- Since the original App used the OpenAI node.js module, Vite was used to bundle the JS-app
- Removing the OpenAI node.js module obviated the need for bundling

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

## Lessons learned

Using the "Completions" API endpoint is actually the wrong API endpoint for this type of application.

Apparently, "Embeddings" is a better approach.
