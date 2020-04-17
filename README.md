## 创建自己的脚手架工具

### 预计实现的功能
+  实现可以在命令行中直接运行代码 
+ 实现可以用npm安装 npm install `yfm-cli -g`
+ 根据模板初始化项目 `yfm-cli create project-name`
+ 模板库代码拉取初始化配置文件 `yfm-cli config set repo repo-name`


### 本项目工具cli已经实现

```
 yfm-cli create <projectName>
```
create可以生成一个项目，会询问提示是否下载默认的地址项目，还可以通过config配置:


#### config命令已经配置

```
yfm-cli config set <k> <v>
```
举例：
yfm-cli config set orgs lxy-cli


### 本项目中需要很多的模块

+ commander.js，可以自动的解析命令和参数，用于处理用户输入的命令。
+ download-git-repo，下载并提取 git 仓库，用于下载项目模板。
+ inquirer.js，通用的命令行用户界面集合，用于和用户进行交互。
+ handlebars.js，模板引擎，将用户提交的信息动态填充到文件中。---暂时还没有用到
+ ora，下载过程久的话，可以用于显示下载中的动画效果。
+ chalk，可以给终端的字体加上颜色。
+ log-symbols，可以在终端上显示出 √ 或 × 等的图标。
+ metalsmith ：读取所有文件，实现模板渲染
+ consolidate ：统一模板引擎


### 使用方法
```
  npm unlink
  npm i yfm-cli -g
```


### 打包发布到npm
```
  npm login
  npm publish
```

### 本地调试

```
  本目录下，执行npm link，将yfm-cli连接到全局
```