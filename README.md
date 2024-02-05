# Backend Challenge B2Rise

### Opa tudo bem? 
Esta é minha conclusão do teste pratico backend challenge da b2rise.

<br>
<br>

## 🤔 Como executar o projeto

Faça o clone do repositorio:
<br>
```bash
git clone https://github.com/vinicius-virtuoso/backend-challenge-b2rise.git
```
Entre no diretorio do projeto clonado:
```bash
cd backend-challenge-b2rise
```
Instale as depencias:
```bash
npm install
```
Crie e edite na raiz do projeto um arquivo .env:
<br/>
```env
DATABASE_URL="postgresql://root:12345@localhost:5432/ec-back-challenger?schema=public"

SECRET_KEY="2024-api-7422kfc-ll223d"
EXPIRES_IN="2 days"


BASE_URL_APP="http://localhost:3000"
```
<p style="font-size: 0.1rem;">*Observação: Lembre-se de verificar o arquivo `docker-compose` para garantir que as configurações estão corretas.*</p>
<br/>

Para executar o projeto:
```bash
npm run dev
```
<br/>

<br>
<br>

## 🧪 Como testar
```bash
npm run test
```
<br>
<br>

## Você pode utilizar o insomnia pra testa as rotas:
Se preferir faça o download da coleção: <a href="https://drive.google.com/file/d/1WVy4-jr0ogYPCg7vEVzhJqRuRBlEaAJH/view?usp=sharing" target="_blank" >Baixar<a>



<br>
<br>

## 🚀 Tecnologias utilizadas

- TypeScript
- Node.JS
- Epress.js
- PrismaORM
- Docker
- PostgreSQL
- Vitest

<br>

<hr>
