# Event Time Services - Luis Filipe J Alencar

O Event Time é um sistema de gerenciamento de eventos construída com Node.js e MongoDB. A API permite aos usuários se cadastrar e fazer login para visualizar dados de eventos, criar novo evento, editar e deletar eventos existentes.

## Desenvolvedor

O Projeto foi 100% desenvolvido por Luis Filipe Joaquim de Alencar, um experiente desenvolvedor com 3 anos de atuação na área. Luis Filipe já trabalhou em projetos robustos e profissionais.

## Pré-requisitos

- **MongoDB.**
- **Node.js**
- **Express**

## Endpoints

- **GET /**
- Recupera dados dos eventos .

- **POST /**
- Insere um novo registro de venda..

- **Exemplo do corpo da Requisição:**

```bash
{
  "title": "Teste de titulo",
  "description": "Teste de descrição",
  "startTime": "2024-01-27T12:00:00Z",
  "endTime": "2024-01-31T12:00:00Z"
}
```

- **Exemplo:**

```bash
 curl -X POST -H "Content-Type: application/json" -d '{"title":"Teste de titulo", "description": "Teste de descrição", "startTime": "2024-01-27T12:00:00Z", "endTime": "2024-01-31T12:00:00Z"}' http://localhost:8080
```

- **PUT /**
- Atualiza um registro de venda.

- **DELETE /**
- Atualiza um registro de venda.

## Banco de Dados

A API utiliza o MongoDB como banco de dados. Certifique-se de ter um servidor MongoDB em execução e configure os detalhes de conexão no arquivo .env.

## Como Executar o Projeto

1. **Clone o repositório::**

   ```bash
    https://github.com/filipedealencar/event-time-services.git
   ```

2. **Entre no repositório do projeto**

```bash
 cd event-time-services
```

3. **Instale as dependências:**

```bash
 npm install
```

4. **Inicie a aplicação:**

```bash
 npm run dev
```

Agora você pode acessar o projeto em http://localhost:8080.

## Contribuições

Contribuições são bem-vindas! Se você encontrar problemas, bugs ou melhorias potenciais, sinta-se à vontade para abrir uma issue ou enviar um pull request.
