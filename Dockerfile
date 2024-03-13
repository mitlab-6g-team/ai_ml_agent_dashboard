FROM node:20.11.1

# 設置工作目錄。容器中的所有操作都會在這個目錄下執行
WORKDIR /app

# 複製 package.json 和 yarn.lock 檔案到容器中
COPY package.json yarn.lock ./

# 安裝專案依賴。使用 `--frozen-lockfile` 確保安裝的依賴與 yarn.lock 檔案一致
RUN yarn install --frozen-lockfile

# 複製剩餘的專案檔案到容器中
COPY . .

# 構建應用。這一步會根據 package.json 中的 scripts 執行 build 指令
RUN yarn build

# 指定運行時容器的啟動命令。這裡使用 serve 套件來服務靜態檔案。
# 注意：若尚未安裝 serve，需在之前的步驟中加入 `RUN yarn global add serve`
CMD ["serve", "-s", "build"]