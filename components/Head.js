import React from 'react'
import Head from 'next/head'

export default () => (
  <div>
    <Head>
      <title>Hannover Gophers</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/favicon-16x16.png"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Fira+Mono|Roboto:300,400"
        rel="stylesheet"
      />
    </Head>
    <style global jsx>{`
      body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: 1.5;
        margin: 0;
        background: #333;
        color: #fff;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 300;
      }

      *,
      *:before,
      *:after {
        box-sizing: border-box;
      }

      h1,
      h2,
      h3,
      h4,
      h5 {
        margin-top: 0;
        font-weight: 400;
      }

      h1 {
        font-size: 36px;
        line-height: 44px;
      }

      h2 {
        font-size: 22px;
      }

      h3 {
        font-size: 20px;
      }

      h4 {
        font-size: 18px;
      }

      h5 {
        font-size: 16px;
      }

      a {
        text-decoration: none;
      }
    `}</style>
  </div>
)
