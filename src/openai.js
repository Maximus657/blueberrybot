import { Configuration, OpenAIApi } from 'openai'
import config from 'config'
import { createReadStream } from 'fs'

class OpenAI{
    roles = {
        ASSISTANT: 'assistant',
        USER: 'user',
        SYSTEM: 'system',
    }
    constructor(apiKey) {
        const configuration = new Configuration({
            apiKey,
          })
          this.openai = new OpenAIApi(configuration)
    }

   async chat(messages) {
        try {
            await new Promise(resolve => setTimeout(resolve, 4000)) // задержка на 5 секунд
            const reponse = await this.openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages,
            })
            return reponse.data.choices[0].message
        } catch (e) {
           console.log('efrg', e.message)
        }
      
       
    }
    
    async transcription(filepath) {
     try {
      const response = await this.openai.createTranscription(
            createReadStream(filepath),
            'whisper-1'
        )
        return response.data.text
     } catch (e) {
        console.log('erar', e.message)
        if (e.response.status === 429) 
            console.log('Too many requests, waiting for 10 second...')
            
        await new Promise(resolve => setTimeout(resolve, 10000))
        return this.transcription(filepath)
     }
    }
}  

export const openai = new OpenAI(config.get('OPENAI_KEY'))