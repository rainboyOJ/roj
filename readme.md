# war3oj

![](./assets/wc3-logo-red.png)

## 快速安装

本机已安装：

- redis
- mongodb 3.6
- nodejs >12.0
- zip
- unzip
- [JudgeServer](https://github.com/rainboyOJ/JudgeServer)

```
git clone https://github.com/roj/front-end.git
git clone https://github.com/roj/roj.git
cd roj
git submodule init 
git submodule update
cp default_config.yaml config.yaml
# modify config.yaml
npm install yarn -g
yarn 
yarn start
```


[详细的安装与使用](./docs/详细的安装与使用.md)

## 目录

```
.
├── app.js      入口
├── assets      资源
├── bin         启动文件
├── DB          数据函数库
├── Function    路由函数
├── lib         函数库
├── routes      路由表
├── utils       工具函数库
└── default_config.yaml 默认配置
```


## Author

**rainboy**

![](https://github.com/rainboylvx.png)

## LICENSE

[WTFPL](https://github.com/anak10thn/WTFPL)


