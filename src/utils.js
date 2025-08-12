const regexSpace = /[\s\u00A0]+/g;

function removeSpace(value) {
  return value.trim().replace(regexSpace, ' ');
}

function getNestedValue(obj, keyPath, defaultValue = null) {
  return keyPath.split('.').reduce((acc, key) => {
    if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
      return acc[key];
    }
    acc = undefined;
    return undefined;
  }, obj) ?? defaultValue;
}

function parseProxy(ipOrDomain, port, username, password) {
  const encUser = encodeURIComponent(username);
  const encPass = encodeURIComponent(password);
  return `http://${encUser}:${encPass}@${ipOrDomain}:${port}`;
}

module.exports = { removeSpace, getNestedValue, parseProxy };
