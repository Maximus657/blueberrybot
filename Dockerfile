# Используем базовый образ Node.js
FROM node:16-alpine

# Создаем и переходим в рабочую директорию
WORKDIR /app

# Устанавливаем зависимости
COPY package*.json ./

RUN npm ci

# Копируем файлы приложения
COPY . .

# Выставляем PORT
ENV PORT=3000
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]