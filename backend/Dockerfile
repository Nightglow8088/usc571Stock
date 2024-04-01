# 使用Node.js官方镜像作为基础镜像
FROM node:20

# 设置容器内应用的工作目录
WORKDIR /app

# 复制package.json和package-lock.json到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install

# 将项目文件复制到工作目录
COPY . .

# 应用监听的端口
EXPOSE 3001

# 启动应用
CMD ["node", "server.js"]
