
const Requst = require('./Requst')

const {UrlLink } = require('wechaty')

module.exports = {
    batchSend(roomList, newUrl, firstText)
    {
        return new Promise(((resolve, reject) => {
            Requst.post(newUrl).then(async ({list}) => {
                if (list.length > 0) {
                    for (let room of roomList) {
                        if (firstText) room.say(firstText)
                        console.log('正在发送：' + room.payload.topic)
                        for (let v of list) {
                            switch (v.msgType) {
                                // 发送链接
                                case 'url':
                                    let urlLink = new UrlLink ({
                                        description : v.description,
                                        thumbnailUrl: v.thumbnailUrl,
                                        title       : v.title,
                                        url         : v.url,
                                    })
                                    await room.say(urlLink)
                                    break;
                                default:
                                    await room.say(v.description)
                            }
                        }
                    }

                }
                resolve(list)
            }).catch(err => {
                reject(err)
            })
        }))
    }
}