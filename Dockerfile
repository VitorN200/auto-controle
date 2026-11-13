# Imagem única para o Railway: compila o front-end e a API o entrega junto com os dados.
# (o desenvolvimento local continua usando o docker-compose.yml, que não usa este arquivo)
FROM node:20-slim AS front
WORKDIR /usr/auto-controle/app
COPY app/package*.json ./
RUN npm ci --no-audit --no-fund
COPY app ./
# URL da API vazia = mesmo endereço do site
ENV VITE_API_URL=""
RUN npm run build

FROM node:20-slim
ENV NODE_ENV=production
WORKDIR /usr/auto-controle/api
COPY api/package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund
COPY api ./
COPY --from=front /usr/auto-controle/app/dist /usr/auto-controle/app/dist
CMD ["node", "index.js"]
