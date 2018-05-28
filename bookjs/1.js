var u = 'User-Agent: Mozilla/5.0 (Linux; Android 7.1.2; MI 5X Build/N2G47H; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/64.0.3282.137 Mobile Safari/537.36 zylcapp/3.0.1 deviceId/5f4181f7c5bd1b35c10facad663c048d sarg1/865722037642926'

var t = u.replace(/^.*deviceId\/([\w.]+).*$/, '$1')

var c = u.replace(/^.*sarg1\/([\w.]+).*$/, '$1')

console.log(t);
console.log(c);