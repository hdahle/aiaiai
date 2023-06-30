/*
 * Simple ChatBot for OpenAI
 * Based on the FreeCodeCamp/Scrimba course
 * Numerous changes have been made:
 * 
 * 1. The original used Netlify as an API proxy in order to hide OpenAI Credentials
 *    - I am using a simple home made proxy which I deployed in AWS/Lightsail
 *    - The original also used the Node.js library "openai"
 *    - I am simply using fetch() and the URLs described in the OpenAI docs
 *    - This avoids pulling in yet another node/JS module
 * 2. Client look and feel
 *    - The original had a lot of custom CSS, and was not responsive
 *    - The original looked not so good on mobile
 *    - I am using w3.css, and the design is responsive
 * 
 */

console.log('index.js')
const chatbotConversation = document.getElementById('chatbot-conversation')

let conversationStr = ''

document.addEventListener('submit', async (e) => {
  e.preventDefault()

  // User input received
  const userInput = document.getElementById('user-input')
  conversationStr += " " + userInput.value + " ->"
  console.log(conversationStr)

  // Render User input as a speech bubble
  const newSpeechBubble = document.createElement('div')
  newSpeechBubble.classList.add('speech', 'speech-human', 'w3-container', 'w3-padding', 'w3-right-align')
  chatbotConversation.appendChild(newSpeechBubble)
  newSpeechBubble.textContent = userInput.value
  userInput.value = ''
  chatbotConversation.scrollTop = chatbotConversation.scrollHeight

  // POST the question including the entire conversation to OpenAI
  console.log('question', conversationStr)
  const reply = await fetchReplyUsingProxy()
  console.log('answer', reply)

  // Render the answer, append answer to conversation for context
  renderTypewriterText(reply)
  conversationStr += reply + ' \n '
})

// Sends request to OpenAI via proxy
// The entire BODY of the POST request is sent unchanged to OpenAI
async function fetchReplyUsingProxy() {
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
  const answer = result.choices[0].text
  return answer
}

function renderTypewriterText(text) {
  const newSpeechBubble = document.createElement('div')
  newSpeechBubble.classList.add('speech', 'speech-ai', 'blinking-cursor', 'w3-container', 'w3-padding')
  chatbotConversation.appendChild(newSpeechBubble)
  let i = 0
  const interval = setInterval(() => {
    newSpeechBubble.textContent += text.slice(i - 1, i)
    if (text.length === i) {
      clearInterval(interval)
      newSpeechBubble.classList.remove('blinking-cursor')
    }
    i++
    chatbotConversation.scrollTop = chatbotConversation.scrollHeight
  }, 5)
}
