require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.generateCode = async (messages) => {
  try {
    // console.log('Chamando a API do ChatGPT com as mensagens:', messages, "\n\n");

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages,
        temperature: 0
      })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content.trim();
    } else {
      throw new Error('Nenhuma resposta recebida do ChatGPT.');
    }
  } catch (error) {
    console.error('Erro ao chamar a API do ChatGPT:', error);
    throw error;
  }
};
