# Gerador de Código para Micro-Serviços e Micro-Frontend usando ChatGPT

Este projeto utiliza o ChatGPT para gerar código para micro-serviços e micro-frontends, facilitando a criação e manutenção de aplicações escaláveis e modulares.

## Índice

1. [Estrutura do Projeto](#estrutura-do-projeto)
2. [Tipos de Arquivos](#tipos-de-arquivos)
3. [Como Usar](#como-usar)
4. [Dependências](#dependências)
5. [Licença](#licença)

## Estrutura do Projeto

A organização do projeto está dividida entre backend e frontend, com diretórios específicos para documentação, seeds e controladores.

```
├── backend
│   ├── docs
│   │   └── Exemplos de descrições de formulários
│   ├── seeds
│   │   ├── projeto
│   │   │   └── Exemplo do backend com o prompt
│   │   └── arquivos
│   │       └── Prompts para geração de cada arquivo
│   └── src
│       └── Outras partes de prompts
├── frontend
│   └── [Diretórios e arquivos do frontend]
├── .env
├── package.json
└── LICENSE
```

- **backend/docs**: Contém exemplos de descrições de formulários que auxiliam na geração de código.
- **backend/seeds**:
  - **projeto**: Exemplo do backend configurado com o prompt necessário.
  - **arquivos**: Prompts específicos para a geração de cada arquivo do backend.
- **backend/controllers/codeGeneratorController.js**: Gerador com mais prompts utilizadas no processo de geração.

## Tipos de Arquivos

Os arquivos gerados pelo projeto são classificados em dois tipos:

1. **Estáticos**: Arquivos que são criados sempre com o mesmo conteúdo, independentemente do contexto ou das entradas fornecidas.
2. **Dinâmicos**: Arquivos gerados pelo ChatGPT com base nos prompts fornecidos, adaptando-se às necessidades específicas do projeto.

## Como Usar

Siga os passos abaixo para configurar e utilizar o gerador de código:

1. **Configuração das Variáveis de Ambiente**:
   - Renomeie o arquivo `.env.example` para `.env`.
   - Insira suas variáveis de ambiente, incluindo a API-Key da OpenAI.

2. **Importação dos Seeds para o Banco de Dados**:
   - Execute os scripts de seed presentes no diretório `backend/seeds` para popular o banco de dados com os prompts necessários.

3. **Execução do Serviço Backend**:
   - Navegue até o diretório `backend` e instale as dependências com `npm install`.
   - Inicie o backend com `npm run dev` ou o comando correspondente.

4. **Execução do Frontend**:
   - Navegue até o diretório `frontend` e instale as dependências com `npm install`.
   - Inicie o frontend com `npm run dev` ou o comando correspondente.

5. **Descrição dos Campos e Validações no Frontend**:
   - Acesse o formulário no frontend.
   - Descreva os campos e as validações necessárias. Exemplo disponível no diretório `backend/docs`.

6. **Geração do Código**:
   - Após descrever os campos, clique em **Gerar Código**.
   - O sistema utilizará os prompts para gerar os arquivos necessários no diretorio `backend/generated`.

7. **Criação e Teste dos Projetos**:
   - Crie seus projetos seguindo a arquitetura sugerida.
   - Teste os prompts para garantir que os arquivos são gerados conforme esperado.

8. **Melhorias e Compartilhamento**:
   - Revise o código gerado e faça as melhorias que considerar importantes.
   - Compartilhe suas contribuições para aprimorar o projeto.

## Dependências

Certifique-se de instalar todas as dependências listadas nos arquivos `package.json` dos diretórios `backend` e `frontend`. Utilize o seguinte comando em cada diretório:

```bash
npm install
```

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Esperamos que este gerador de código facilite o desenvolvimento de seus micro-serviços e micro-frontends. Para quaisquer dúvidas ou contribuições, sinta-se à vontade para abrir uma issue ou enviar um pull request.