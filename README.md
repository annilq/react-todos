# react-todos
1. npm i 安装依赖
2. npm run server 开启并且初始化服务
3. 访问 http://localhost:8080/

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

tip:{code:Number,Data:{},message:String}
##### code:
1. 0 success
2. -1 error
3. -2 logout
