const { removeSpace, getNestedValue } = require('./utils');

function parseBody(body) {
  const match = body.match(/<script id="__NEXT_DATA__" type="application\/json">([^<]+)<\/script>/);
  if (!match) return {};
  try {
    const json = JSON.parse(removeSpace(match[1]));
    return getNestedValue(json, 'props.pageProps.componentProps', {});
  } catch {
    return {};
  }
}

function parseBodyHome(body) {
  const componentProps = parseBody(body);
  const dataRaw = getNestedValue(componentProps, 'gdpClientCache');
  if (!dataRaw) return {};
  const propertyJson = JSON.parse(dataRaw);
  let parsed = {};
  for (const value of Object.values(propertyJson)) {
    if (value && typeof value === 'object' && 'property' in value) {
      parsed = value.property;
    }
  }
  return parsed;
}

function parseBodyDepartments(body) {
  const componentProps = parseBody(body);
  return getNestedValue(componentProps, 'initialReduxState.gdp', {});
}

module.exports = { parseBodyHome, parseBodyDepartments, parseBody };
