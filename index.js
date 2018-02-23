queryCache.$inject = ['$provide']

const STORAGE_KEY = 'angularjs_query_cache'
const MINUTE = 60 * 1000
const DEFAULT_MAX_AGE = 5 * MINUTE

module.exports = angular.module('angularjs-query-cache', [])
  .config(queryCache)
  .name

function queryCache ($provide) {
  $provide.decorator('$http', $httpDecorator)
}

function $httpDecorator ($delegate, $q) {
  var old = angular.copy($delegate.get)
  var cache = new Cache()

  $delegate.get = decoratedGet

  return $delegate

  function decoratedGet (url, config) {
    var isTemplate = typeof url === 'string' && url.indexOf('.html') !== -1

    if (isTemplate) return old(url, config)

    if (cache.contains(url)) return Promise.resolve(cache.get(url))

    return old(url, config).then(function (res) {
      if (config && config._cache && !isTemplate) {
        cache.set(url, res, config._maxAge)
      }

      return res
    })
  }
}

function Cache () {
  this._cache = this._load()
  this._timer = setInterval(this._clean.bind(this), MINUTE)

  this._clean()
}

Cache.prototype.get = function (url) {
  return angular.copy(this._cache[url])
}

Cache.prototype.set = function (url, data, maxAge) {
  this._cache[url] = Object.assign(angular.copy(data), {
    _cachedOn: new Date(),
    _maxAge: maxAge || DEFAULT_MAX_AGE
  })

  this._save()
}

Cache.prototype.contains = function (url) {
  return !!this._cache[url]
}

Cache.prototype._remove = function (url) {
  delete this._cache[url]
}

Cache.prototype._clean = function () {
  var now = new Date()
  var delta

  for (var key in this._cache) {
    delta = now - this._cache[key]._cachedOn

    if (delta > this._cache[key]._maxAge) {
      this._remove(key)
    }
  }

  this._save()
}

Cache.prototype._save = function () {
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this._cache))
}

Cache.prototype._load = function () {
  var cache = window.sessionStorage.getItem(STORAGE_KEY)

  if (!cache) return {}

  try {
    cache = JSON.parse(cache)

    for (var key in cache) {
      cache[key]._cachedOn = new Date(cache[key]._cachedOn)
    }

    return cache
  } catch (err) {
    return {}
  }
}
