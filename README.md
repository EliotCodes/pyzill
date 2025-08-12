# Zillow scraper in Node.js

## Overview
This project provides a Node.js utility for extracting property information from Zillow.

## Install

```bash
npm install
```

## Example

```js
const pyzill = require('./src');

(async () => {
  const data = await pyzill.getFromHomeId(2056016566);
  console.log(data);
})();
```
