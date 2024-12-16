const fs = require('fs').promises;
const path = require('path');
const Projeto = require('../models/Projeto');
const Arquivo = require('../models/Arquivo');
const { generateCode } = require('../services/chatGptService');
const { toCamelCase, removeCodeBlockMarkers } = require('../utils/namingUtils');
const { ensureDirExists } = require('../utils/fileUtils');

exports.createCode = async (req, res) => {
  try {
    const { projetoId, nome, prompt } = req.body;

    if (!projetoId) {
      return res.status(400).json({ error: 'projetoId são obrigatórios.' });
    }

    const projeto = await Projeto.findOne({ _id: projetoId, status: 'ativo' });
    if (!projeto) {
      return res.status(404).json({ error: `Nenhum projeto ativo encontrado para o projetoId ${projetoId}.` });
    }

    const arquivos = await Arquivo.find({ projeto: projeto._id }).sort({ ordem: 1 });
    const generatedFilePaths = [];

    // Mensagens base
    let messages = [
      {
        role: 'system',
        content: 'Você é um assistente de geração de código. Sempre responda apenas com o código necessário, sem usar blocos de código Markdown, sem explicações, sem comentários e sem texto adicional; Atenção sempre aos nomes e diretorios dos arquivos gerados para manter a concistência do projeto.'
      },
      {
        role: 'user',
        content: `Projeto: ${projeto.nome} ${nome}\nDescrição: ${projeto.prompt}\nInstruções Adicionais: ${prompt}`
      }
    ];
    console.log("prompt:", messages);

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    for (const arquivo of arquivos) {
      let code;

      let fileName = arquivo.nome;
      if (arquivo.nomeConcatenado) {
        fileName = `${nome}${arquivo.nome}`;
      }
      if (arquivo.camelCase) {
        fileName = toCamelCase(fileName);
      }
      console.log("fileName:", fileName);

      const fileDir = path.join(__dirname, `../../generated/${nome}-${toCamelCase(projeto.nome)}-${timestamp}/${arquivo.caminho}`);
      const filePath = path.join(fileDir, fileName);

      if (arquivo.tipo === 'dinamico') {
        const arquivoPrompt = {
          role: 'user',
          content: `Gere o código para o arquivo ${fileName} com as seguintes especificações:\n${arquivo.prompt}\nNão use blocos de código, não explique, não comente.`
        };
        console.log("prompt:", arquivoPrompt);

        const currentMessages = [...messages, arquivoPrompt];
        code = await generateCode(currentMessages);

        // Remove marcadores de código se houver
        code = removeCodeBlockMarkers(code);
      } else if (arquivo.tipo === 'estatico') {
        code = arquivo.conteudo;
      }

      // Adiciona o código gerado ao histórico, incluindo caminho e nome do arquivo
      mensagemCodigoGerado = {
        role: 'user',
        content: `lembre do código gerado para ${arquivo.caminho}/${fileName}: ${code}`
      };
      messages.push(mensagemCodigoGerado);
      console.log("mensagemCodigoGerado:", mensagemCodigoGerado);

      await ensureDirExists(fileDir);
      await fs.writeFile(filePath, code, 'utf8');
      generatedFilePaths.push(filePath);
    }

    console.log("[OPERAÇÃO REALIZADA COM SUCESSO]");
    

    res.status(200).json({ message: 'Código gerado com sucesso!', filePaths: generatedFilePaths });
  } catch (error) {
    console.error('Erro ao gerar código:', error);
    res.status(500).json({ error: 'Erro interno ao gerar o código.' });
  }
};
