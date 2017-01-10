
function UriUtils () {
}

UriUtils.encode = function (value) {
  return window.encodeURIComponent(value);
};

UriUtils.decode = function (value) {
  try {
    return window.decodeURIComponent('' + value);
  } catch (err) {
    return value;
  }
};

UriUtils.parseQuery = function () {
  var query = window.location.hash.replace(/^\#\?/, '');

  if (!query) {
    return null;
  }

  return query.split('&').map(function(param) {
    var splitPoint = param.indexOf('=');

    return {
      key : param.substring(0, splitPoint),
      value : param.substring(splitPoint + 1)
    };
  }).reduce(function(params, param){
    if (param.key && param.value) {
      params[param.key] = UriUtils.decode(param.value);
    }
    return params;
  }, {});
};

UriUtils.updateQuery = function (object) {
  var query = Object.keys(object).map(function(key){
    return key + '=' + UriUtils.encode(object[key]);
  }).join('&');

  window.location.hash = '?' + query;
};

module.exports = UriUtils;
