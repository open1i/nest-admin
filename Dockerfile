# 第一阶段：构建阶段
FROM node:20-alpine AS builder

WORKDIR /app

# 复制依赖文件
COPY package.json .
COPY pnpm-lock.yaml .

# 安装pnpm和项目依赖
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建项目
RUN pnpm build

# 第二阶段：生产镜像
FROM node:20-alpine

WORKDIR /app

# 从构建阶段复制构建结果和运行时依赖
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json .

# 复制必要的配置文件
COPY .env .

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["node", "dist/main.js"]