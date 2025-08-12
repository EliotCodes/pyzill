const { parseBodyHome, parseBodyDepartments } = require('./parse');

const headers = {
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "Accept-Language": "en",
  "Cache-Control": "no-cache",
  "Pragma": "no-cache",
  "Sec-Ch-Ua": '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"Windows"',
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Sec-Fetch-User": "?1",
  "Upgrade-Insecure-Requests": "1",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
};

async function getFromHomeUrl(homeUrl, proxyUrl = null) {
  const res = await fetch(homeUrl, { headers });
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  const body = await res.text();
  return parseBodyHome(body);
}

function getFromHomeId(propertyId, proxyUrl = null) {
  const url = `https://www.zillow.com/homedetails/any-title/${propertyId}_zpid/`;
  return getFromHomeUrl(url, proxyUrl);
}

async function getFromDepartmentId(departmentId, proxyUrl = null) {
  const url = `https://www.zillow.com/apartments/texas/the-lennox/${departmentId}`;
  return getFromDepartmentUrl(url, proxyUrl);
}

async function getFromDepartmentUrl(url, proxyUrl = null) {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  const body = await res.text();
  return parseBodyDepartments(body);
}

module.exports = {
  getFromHomeId,
  getFromDepartmentId,
  getFromDepartmentUrl,
  getFromHomeUrl,
};
