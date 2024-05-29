<p align="center">
    <img src=https://img.freefish.love/logo.png width=188/>
</p>
<h1 align="center">咸鱼-API 接口开放平台</h1>
<p align="center"><strong>咸鱼-API 接口开放平台是一个为用户和开发者提供全面API接口调用服务的平台 🛠</strong></p>
<div align="center">
<a target="_blank" href="https://github.com/which0113/api-backend">
    <img alt="" src="https://github.com/which0113/api-backend/badge/star.svg?theme=gvp"/>
</a>
    <img alt="Maven" src="https://raster.shields.io/badge/Maven-3.8.1-red.svg"/>
<a target="_blank" href="https://www.oracle.com/technetwork/java/javase/downloads/index.html">
        <img alt="" src="https://img.shields.io/badge/JDK-1.8+-green.svg"/>
</a>
    <img alt="SpringBoot" src="https://raster.shields.io/badge/SpringBoot-2.7+-green.svg"/>
</div>

## 项目介绍

😀 作为用户您可以通过注册登录账户，获取接口调用权限，并根据自己的需求浏览和选择适合的接口。您可以在线进行接口调试，快速验证接口的功能和效果。

💻 作为开发者，我们提供了[咸鱼-API SDK](https://github.com/which0113/api-sdk)，
通过[开发者凭证](https://www.freefish.love/account/center)即可将轻松集成接口到您的项目中，实现更高效的开发和调用。

🤝 您可以将自己的接口接入到 **_咸鱼-API_** 接口开放平台平台上，并发布给其他用户使用。
您可以管理和各个接口，以便更好地分析和优化接口性能。

🔎 您只需要导入最原始的数据集，输入需要分析的目标，就能利用[AI智能生成](https://www.freefish.love/analyse)
一个可下载的数据分析图表和分析结论。

🏁 无论您是用户还是开发者，**_咸鱼-API_**
咸鱼-API 接口开放平台都致力于提供稳定、安全、高效的接口调用和数据分析服务，帮助您实现更高效、便捷化的开发和调用体验。

## 网站导航

- [项目在线演示地址 🔗](https://www.freefish.love)
- 演示账号：demo
- 密码：12345678
- [项目前端地址 🔗](https://github.com/which0113/api-frontend)
- [项目后端地址 🔗](https://github.com/which0113/freefish-api)

## 使用指导

### 克隆项目到本地

```bash
git clone git@github.com:which0113/freefish-api.git
```

### 运行前端

确保 node >= 18，查看 node 版本

```bash
node -v
```

#### 安装依赖

```bash
npm install
```

#### 启动

```bash
npm run dev
```

#### 其他

- [config.ts](config%2Fconfig.ts) 文件可修改对接后端服务器接口的地址，默认：http://localhost:9001
- 如果更改后端服务器接口的地址，则需要更改 WebSocket 连接地址，默认：ws://localhost:9001/api/ws/

#### 部署前端

方法一：生成 dist 文件部署

```bash
npm run build
```

方法二：使用 docker 容器部署

构建：

```bash
docker build -t freefish-api-frontend:v0.0.1 .
```

运行：

```bash
docker run -p 80:80 -d freefish-api-frontend:v0.0.1
```

## 项目展示

### 首页

![home.png](doc%2Fhome.png)

### 接口广场

#### 接口展示

![api-display.png](doc%2Fapi-display.png)

#### 接口详情

![api-details.png](doc%2Fapi-details.png)

##### API文档

![api-doc.png](doc%2Fapi-doc.png)

##### 错误码

![error-codes.png](doc%2Ferror-codes.png)

##### 示例代码

![sample-code.png](doc%2Fsample-code.png)

##### 在线调试

![online-commissioning.png](doc%2Fonline-commissioning.png)

### 智能分析

![intelligent-analytics.png](doc%2Fintelligent-analytics.png)

### 我的图表

#### 图表展示

![chart-display.png](doc%2Fchart-display.png)

#### 图表下载

![chart-download.png](doc%2Fchart-download.png)

### 用户功能

#### 登录

![login.png](doc%2Flogin.png)

#### 注册

![register.png](doc%2Fregister.png)

#### 个人中心

![personal-center.png](doc%2Fpersonal-center.png)

### 管理员功能

#### 接口管理

![interface-management.png](doc%2Finterface-management.png)

#### 图表管理

![chart-management.png](doc%2Fchart-management.png)

#### 用户管理

![user-management.png](doc%2Fuser-management.png)

## 技术栈

- React 18
- Ant Design Pro 5.x 脚手架
- Ant Design & Procomponents 组件库
- Umi 4 前端框架
- OpenAPI 前端代码生成
