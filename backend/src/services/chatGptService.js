const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

exports.generateCode = async (messages, retries = 3, backoff = 300) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4', // Atualize para o modelo correto
        messages,
        temperature: 0
      })
    });

    if (response.status === 429) { // Rate limit excedido
      if (retries > 0) {
        console.warn(`Rate limit atingido. Tentando novamente em ${backoff}ms...`);
        await sleep(backoff);
        return exports.generateCode(messages, retries - 1, backoff * 2);
      } else {
        throw new Error('Taxa de requisições excedida. Tente novamente mais tarde.');
      }
    }

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Erro na API do ChatGPT: ${response.status} - ${errorData}`);
    }

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
