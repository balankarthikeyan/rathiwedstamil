const { createServer } = require('http')
const next = require('next')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res)
  }).listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

// const express = require('express')
// const next = require('next')
// const port = +process.env.PORT || 3000
// const isProduction = process.env.NODE_ENV === 'production'
// const app = next({ dev: !isProduction })
// const handle = app.getRequestHandler()
// const compression = require('compression')
// const server = express()

// const shouldCompress = (req, res) => {
//   if (req.headers['x-no-compression']) {
//     return false
//   }
//   return compression.filter(req, res)
// }

// server.use(compression({ filter: shouldCompress }))

// app.prepare().then(() => {
//   server.get('*', (req, res) => {
//     res.removeHeader('X-Powered-By')
//     res.set('X-Frame-Options', 'SAMEORIGIN')
//     res.set('X-Content-Type-Options', 'nosniff')
//     res.set('X-XSS-Protection', '1; mode=block')
//     res.set('Strict-Transport-Security', 'max-age=63072000')
//     res.set('Content-Security-Policy', `frame-ancestors 'none'`)
//     res.set('Connection', 'keep-alive')

//     if (isProduction === true) {
//       res.set('access-control-allow-origin', 'https://www.classico.com')
//       /**
//        * @note
//        * this should be done dynamically in future
//        */
//       if (
//         req.originalUrl === '/nprogress.css' ||
//         req.originalUrl === '/storelocator.json' ||
//         req.originalUrl === '/ga.js' ||
//         req.originalUrl === '/robots.txt' ||
//         req.originalUrl === '/sitemap.xml'
//       ) {
//         res.setHeader('Cache-Control', 'public, max-age=31356000')
//       } else {
//         res.setHeader('Cache-Control', 'public, max-age=3600')
//       }
//     } else {
//       res.set('X-Robots-Tag', 'noindex, nofollow')
//     }
//     return handle(req, res)
//   })

//   server.listen(port, err => {
//     if (err) {
//       throw err
//     }
//     console.log(`> Ready on http://localhost:${port}`)
//   })
// })
