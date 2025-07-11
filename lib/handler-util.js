'use strict';
const pug = require('pug')
const fs = require('node:fs')
const Cookies = require('cookies')
const { currentThemeKey } = require('../config')


function handleLogout(req, res) {
  res.writeHead(401, {
    'Content-Type': 'text/html; charset=utf-8'
  })
  res.end(
    `<!DOCTYPE html><html lang="ja">
      <body>
        <h1>ログアウトしました</h1>
        <a href="/posts">ログイン</a>
      </body>
    </html>`)
}

function handleChangeTheme(req, res) {
  const cookies = new Cookies(req, res)
  const currentTheme = (cookies.get(currentThemeKey) !== 'light' ? 'light' : 'dark')
  cookies.set(currentThemeKey, currentTheme)
  res.writeHead(303, {
    'Location': '/posts'
  })
  res.end()
}

function handleFavicon(req, res) {
  res.writeHead(200, {
    'Content-Type': 'image/vnd.microsoft.icon',
    'Cache-Control': 'public, max-age=604800'
  });
  const favicon = fs.readFileSync('./favicon.ico')
  res.end(favicon)
}

function handleStyleCssFile(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/css',
  });
  const cssFile = fs.readFileSync('./public/style.css')
  res.end(cssFile)
}

function handleNnChatJsFile(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/javascript',
  });
  const file = fs.readFileSync('./public/nn-chat.js')
  res.end(file)
}

function handleNotFound(req, res) {
  res.writeHead(404, {
    'Content-Type': 'text/html; charset=utf-8'
  })
  res.end(pug.renderFile('./views/404.pug'))
}

function handleBadRequest(req, res) {
  res.writeHead(400, {
    'Content-Type': 'text/plain; charset=utf-8'
  });
  res.end('未対応のリクエストです');
}

module.exports = {
  handleLogout,
  handleChangeTheme,
  handleNotFound,
  handleFavicon,
  handleStyleCssFile,
  handleNnChatJsFile,
  handleBadRequest
}