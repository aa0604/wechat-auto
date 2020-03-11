module.exports = {
  isEmptyObject (obj) {
    for (let o in obj) {
      return false
    }
    return true
  },

  keySort(obj) {//排序的函数
    let newkey = Object.keys(obj).sort();
    //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    let newObj = {};//创建一个新的对象，用于存放排好序的键值对
    for (let i = 0; i < newkey.length; i++) {//遍历newkey数组
      newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj;//返回排好序的新对象
  },
  toArray(object)
  {
    let arr = [];
    for (let k in object) arr.push(object[k]);
    return arr;
  },
  getKey(object, value)
  {
    for (let k in object) {
      if (value === object[k]) return k;
    }
    return null;
  },
  getIndexKey(object, index)
  {
    let arr = this.toArray(object);
    for (let i in arr) {
      if (index === parseInt(i)) return this.getKey(object, arr[i]);
    }
    return null;
  },
  deepCopy(obj) {
    let result = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          result[key] = deepCopy(obj[key]);   //递归复制
        } else {
          result[key] = obj[key];
        }
      }
    }
    return result;
  },
  /**
   * 对象转url参数
   * @param {*} data
   * @param {*} isPrefix
   */
  queryParams (data, isPrefix) {
    isPrefix = isPrefix ? isPrefix : false
    let prefix = isPrefix ? '?' : ''
    let _result = []
    for (let key in data) {
      let value = data[key]
      // 去掉为空的参数
      if (['', undefined, null].includes(value)) {
        continue
      }
      if (value.constructor === Array) {
        value.forEach(_value => {
          _result.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(_value))
        })
      } else {
        _result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
      }
    }

    return _result.length ? prefix + _result.join('&') : ''
  }
} ;