# Deploy do Library Control na Cloudflare Workers

## Correção implementada

O frontend deste repositório usa React com `react-scripts` (Create React App), e NÃO Vite.
A pasta de saída é `library-frontend/build`. O arquivo `wrangler.jsonc` na raiz
aponta para essa pasta e configura fallback para as rotas do React Router.

## Configuração do painel (Workers & Pages > library-control-master > Settings > Builds)

- Root directory: raiz do repositório (`/`).
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

O build na raiz executa `npm ci` dentro de `library-frontend` e depois
`react-scripts build`. O Wrangler publica `library-frontend/build`.

## API: necessária para funcionalidades completas

A Cloudflare Workers, com esta configuração, hospeda APENAS o frontend estático.
O backend Java/Spring Boot e seu banco H2 não são executados nesse Worker.
É necessário hospedar o Spring Boot separadamente em um servidor compatível
(com Java e armazenamento persistente), com URL HTTPS pública.

Nas variáveis de ambiente do BUILD da Cloudflare, configure:

`REACT_APP_API_URL=https://URL-PUBLICA-DO-BACKEND`

Essa variável é incorporada ao JS durante o build (não é segredo).
Sem ela, o frontend continua apontando para `http://localhost:8080`, que
só funciona quando o backend está sendo executado no computador do visitante.

O backend também precisa permitir a origem HTTPS do seu frontend no CORS.
Há suporte à variável `APP_CORS_ALLOWED_ORIGINS`, que recebe origens separadas por vírgulas.
Por exemplo: `APP_CORS_ALLOWED_ORIGINS=https://library-control-master.SEU-SUBDOMINIO.workers.dev`

## Execução local

Frontend: `cd library-frontend && npm ci && npm start`
Backend: `mvn spring-boot:run` (Java 17+, na raiz).

## Observação

Um deploy bem-sucedido do frontend não significa que as ações de CRUD
estarão funcionando até a API Java estar hospedada e configurada.
