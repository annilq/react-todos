# react-todos
1. npm i 安装依赖
2. npm run server 开启并且初始化服务
3. npm start

或者
1. npm i 安装依赖
2. npm build
3. npm run server 开启服务访问http://localhost:8080/

tips: 项目前端UI由create-react-app创建,可以直接运行npm start进行开发，开发完成后运行npm run build 打包

#### 功能模块：
- 注册、登录、验证
- 清单列表
  - 新增,删除,编辑
- 任务详情
  - 编辑
  - 删除
  - star
  - 标记状态

#### 新增命令行功能命令行只能查看,做不好心塞
npm link 命令全局可用
todo help 看方法
1. 登录：todo login <user:pass>
  >ps:首先在web端注册,之后一定要先登录才能继续后续操作，而且没有错误提示
1. 看所有目录：todo show
2. 查看执行目录任务：todo show <folderName>
3. 已完成任务：todo done
4. 关注的任务：todo star
