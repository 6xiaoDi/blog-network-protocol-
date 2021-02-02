const http = require('http')
const fs = require('fs')

// 为了模拟真实接口，使接口请求变慢
const wait = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
        resolve()
    }, seconds * 1000)
  })
}

http.createServer(function (request, response) {
  console.log('request come', request.url)

  if (request.url === '/') {
    const html = fs.readFileSync('test.html', 'utf8')
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })
    response.end(html)
  }

  // 声明一个接口
  if (request.url === '/data') {
    response.writeHead(200, {
      'Cache-Control': 'max-age=20000',
    })
    wait(2).then(() => response.end('success'))
  }
}).listen(8888)

console.log('server listening on 8888')