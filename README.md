# 每日/定时群发 新闻/消息
本项目可以从服务端获取最新新闻、消息、打折优惠等数据，每天/定时把消息发送到指定的微信群里，实现自动化管理群消息。可应用于如：每日新闻推送，每日公众号文章推送、每日优惠打折消息发送，可以设定为每天或每隔n分钟发送

## 安装
```npm
npm install wechaty@next
npm install wechaty-puppet-padplus@latest
npm install qrcode-terminal
npm install fs
npm install axios
```

## 运行
```node
node index
```
## 配置
打开Index.js，

let topic = RegExp(/test/) // 群关键字，需要在聊天记录出现

let newUrl = '获取新闻的api网址' // 如http://xxx.com/api/get-new

let firstText = '今日新闻推荐' // 推送前说的话，留空则不多说

let dayTime = 8; // 设置每天几点发送，0则表示关闭或不使用此设置

let dayLastSend = null; // 上次发送时间

let timing = 10; // 每隔多少分钟就触发一次？