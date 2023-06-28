# OpenAI Playground

Frontend application inspired by 
https://scrimba.com/learn/buildaiapps

## Random comments

- Get an API key from OpenAPI
- Import the openai object from openai
- The Youtube/Scrimab project this is based on used Vite for deployment
- While Vite worked well for hosting on localhost, I could not get it to build an app correctly for remote deployment
- I decided to go old-school and use webpack

For 'production' deployment, the original Scrimba app used Netlify in order to hide the OpenAI key in a serverless function on Netlify, so the front-end app would call Netlify which in turn would call OpenAI API, instead of having the front-end app call OpenAI API directly which would expose the key

## The custom training data

- This is really the difficult part - preparing enough data in the right format for fine-tuning (training) the AI model.
- My original CSV-formatted training file is in ```data```
- I used openai CLI to convert it to JSONL format
- The JSONL-file is then fine tuned and a model is created. This can take minutes, hours, days
