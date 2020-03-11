
const { Wechaty } = require('wechaty')
const { PuppetPadplus } = require('wechaty-puppet-padplus')
const QrcodeTerminal = require('qrcode-terminal')
const Requst = require('./logic/Requst')
const RoomLogic = require('./logic/RoomLogic')
const fs = require('fs');

const token = '你的token'

const puppet = new PuppetPadplus({
    token,
})

const name  = 'wechat-auto'

const bot = new Wechaty({
    puppet,
    name, // generate xxxx.memory-card.json and save login data for the next login
})

let topic = RegExp(/test/) // 群关键字，需要在聊天记录出现
let newUrl = '获取新闻的api网址' // 如http://xxx.com/api/get-new
let firstText = '今日新闻推荐'
let dayTime = 8; // 设置每天几点发送，0则表示关闭或不使用此设置
let dayLastSend = null; // 上次发送时间
let timing = 10; // 每隔多少分钟就触发一次？

fs.readFile('day-send.log',(error, data) => {
    error ? console.log('读取文件失败') : dayLastSend = data.toString()
})

bot
    .on('scan', (qrcode, status) => {
        QrcodeTerminal.generate(qrcode, {
            small: true
        })
    })
    .on('login', async (user) => {
        console.log(`user ${user} login`)
        // console.log(user)
// after logged in
        if (Number(timing) > 0) {

            // 启动时触发一次
            let roomList = await bot.Room.findAll({topic})
            console.log(roomList, {topic})
            RoomLogic.batchSend(roomList, newUrl, firstText).then(list => {
                console.log(`本次发送${list.length}条新数据`)
            })

            // 定时触发
            setInterval(async () => {
                let roomList = await bot.Room.findAll({topic})
                RoomLogic.batchSend(roomList, newUrl, firstText).then(list => {
                    console.log(`本次发送${list.length}条新数据`)
                })
            }, timing * 1000 * 60)

        }

    })
    /*.on('message', msg => {
        console.log(`msg : ${msg}`)
    })*/
    .on('message', async m => {
        const room = m.room()
        if (room) {
            const topic = await room.topic()
            console.log(`room topic is : ${topic}`)
        }

        let day = (new Date()).getDate()
        if (Number(dayTime) === (new Date()).getHours() && day !== dayLastSend) {
            let roomList = await bot.Room.findAll({topic})
            RoomLogic.batchSend(roomList, newUrl, firstText).then(list => {
                dayLastSend = day
                fs.writeFile('day-send.log', dayLastSend,'utf8',function(err){
                    err ? console.log('写文件出错了，错误是：' + err) : console.log('保存日期成功')
                })
                console.log(`本次发送${list.length}条新数据`)
            })
        }
    })
    .start()