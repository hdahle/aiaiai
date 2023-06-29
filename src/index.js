import { Configuration, OpenAIApi } from 'openai'
import { process } from './env'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const chatbotConversation = document.getElementById('chatbot-conversation')

let conversationStr = ''

document.addEventListener('submit', (e) => {
  e.preventDefault()
  const userInput = document.getElementById('user-input')
  conversationStr += " " + userInput.value + " ->"
  //console.log(conversationStr)
  fetchReply()
  const newSpeechBubble = document.createElement('div')
  newSpeechBubble.classList.add('speech', 'speech-human')
  chatbotConversation.appendChild(newSpeechBubble)
  newSpeechBubble.textContent = userInput.value
  userInput.value = ''
  chatbotConversation.scrollTop = chatbotConversation.scrollHeight
})

async function fetchReply() {
  const response = await openai.createCompletion({
    model: 'davinci:ft-hamachi-as-2023-06-27-08-20-34',
    prompt: conversationStr,
    max_tokens: 100,
    presence_penalty: 0,
    frequency_penalty: 0,
    temperature: 0,
    stop: ['\n', ' ->']
  })
  console.log('OpenAI response:', response)
  conversationStr += response.data.choices[0].text + '\n'
  renderTypewriterText(response.data.choices[0].text)
}

function renderTypewriterText(text) {
  const newSpeechBubble = document.createElement('div')
  newSpeechBubble.classList.add('speech', 'speech-ai', 'blinking-cursor')
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