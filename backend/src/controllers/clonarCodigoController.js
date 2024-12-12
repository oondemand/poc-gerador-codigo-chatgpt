const fs = require('fs').promises;
const path = require('path');
const Arquivo = require('../models/Arquivo');
const Projeto = require('../models/Projeto');
const { generateCode } = require('../services/chatGptService'); // Função que chama o GPT-4

exports.clonarCodigo = async (req, res) => {
  try {
    const { caminho } = req.body;
    if (!caminho) {
      return res.status(400).json({ error: 'caminho é obrigatório.' });
    }

    const projectName = path.basename(caminho);
    const projetoPrompt = `Projeto clonado do código existente no caminho: ${caminho}. Futuramente será convertido em um prompt de alto nível.`;

    const projeto = new Projeto({
      nome: projectName,
      status: 'ativo',
      prompt: projetoPrompt
    });
    await projeto.save();

    let ordem = 10;

    async function mapearArquivos(basePath, currentPath = '') {
      const dirPath = path.join(basePath, currentPath);
      const entries = await fs.readdir(dirPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
          await mapearArquivos(basePath, path.join(currentPath, entry.name));
        } else {
          const conteudo = await fs.readFile(fullPath, 'utf8');

          const messages = [
            {
              role: 'system',
              content: 'Você é um assistente que transforma código em um prompt descritivo de alto nível. Não precisa ter explicações do que é, apenas a especificação para fazer o caminho reverso do prompt para o código. Sempre responda apenas com o prompt, sem usar blocos de código Markdown, sem explicações adicionais, sem comentários. O prompt deve descrever o que o código faz, suas regras e propósito de forma abstrata e clara.'
            },
            {
              role: 'user',
              content: `Abaixo está o conteúdo de um arquivo do projeto clonado. Gere exclusivamente um prompt descritivo, sem código, sem comentários:\n${conteudo}`
            }
          ];

          try {
            const arquivoPromptGerado = await generateCode(messages);

            const novoArquivo = new Arquivo({
              projeto: projeto._id,
              nome: entry.name,
              caminho: currentPath || '.',  // <- Ajuste aqui
              conteudo: conteudo,
              tipo: 'estatico',
              prompt: arquivoPromptGerado.trim(),
              pascalCase: false,
              nomeConcatenado: false,
              ordem: ordem
            });

            console.log("\n---------------------------------------------------");
            console.log(`Arquivo ${entry.name} mapeado com sucesso!`);
            console.log(novoArquivo);
            
            await novoArquivo.save();

            ordem += 10;
          } catch (error) {
            console.error(`Erro ao gerar prompt para o arquivo ${entry.name}:`, error);
            // Opcional: Continue processando outros arquivos ou interrompa
          }
        }
      }
    }

    await mapearArquivos(caminho);

    res.status(201).json({ message: 'Projeto e arquivos clonados com sucesso, prompts gerados!', projetoId: projeto._id });
  } catch (error) {
    console.error('Erro ao clonar código:', error);
    res.status(500).json({ error: 'Erro interno ao clonar o código.' });
  }
};
