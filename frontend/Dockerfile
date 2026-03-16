# --- ÉTAPE 1 : Build ---
FROM node:20-alpine AS build
WORKDIR /app

# On copie les fichiers de configuration
COPY package.json package-lock.json ./
RUN npm install

# On copie le reste du code
COPY . .
# Vite génère les fichiers dans le dossier /dist par défaut
RUN npm run build

# --- ÉTAPE 2 : Serve ---
FROM nginx:stable-alpine

# Configuration Nginx pour gérer le routage React (évite les erreurs 404 au refresh)
RUN echo "server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files \$uri \$uri/ /index.html; \
    } \
}" > /etc/nginx/conf.d/default.conf

# On récupère le build de l'étape précédente
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]