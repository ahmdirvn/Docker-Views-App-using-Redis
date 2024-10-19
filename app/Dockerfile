# Menggunakan image Node.js sebagai base image
FROM node:16

# Set working directory
WORKDIR /app

# Salin file package.json dan package-lock.json (jika ada)
COPY package.json ./
COPY package-lock.json ./

# Instal dependensi
RUN npm install

# Salin sisa aplikasi ke dalam image
COPY . .

# Ekspose port yang akan digunakan
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
