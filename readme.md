# war3oj

![](./assets/wc3-logo-red.png)

## 快速安装

本机已安装：

- redis
- mongodb 3.6
- nodejs >12.0
- zip
- unzip

```
git clone https://github.com/roj/front-end.git
git clone https://github.com/roj/roj.git
cd roj
cp default_config.yaml config.yaml
# modify config.yaml
npm run start
```

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

压缩数据命令

```
zip -jr -ll data.zip <path>
```

## Author

**rainboy**

![](https://github.com/rainboylvx.png)

## LICENSE

[WTFPL](https://github.com/anak10thn/WTFPL)


