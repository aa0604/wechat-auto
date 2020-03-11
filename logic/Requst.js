const objectHelper = require('../lib/ObjectHelper')
const axios = require('axios')

module.exports = {

    post(url, post = {}) {
        return new Promise((resolve, reject) => {
            let param = new URLSearchParams()
            for (let k in post) param.append(k, post[k])

            axios({
                headers: {
                    'deviceCode': 'A95ZEF1-47B5-AC90BF3'
                },
                method: 'post',
                url: this.domain + url,
                data: param
            })/*;
            axios.post(this.domain + url, post)*/
                .then(function (response) {
                    // 服务器返回错误处理
                    if (response.status !== 200 || response.data.status !== 1) {
                        reject({status: response.status, data: response.data})
                    } else {
                        resolve(response.data)
                    }
                })
                .catch(function (response) {
                    console.log('post.catch')
                    console.log(response)
                    reject({status: response.status, data: response.data})
                });
        })
    },
}