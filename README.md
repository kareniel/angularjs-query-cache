# angularjs-query-cache

<div align="left">
  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-unstable-green.svg?style=flat-square"
      alt="API stability" />
  </a>
  <!-- NPM version -->
  <a href="https://npmjs.org/package/angularjs-query-cache">
    <img src="https://img.shields.io/npm/v/angularjs-query-cache.svg?style=flat-square"
      alt="NPM version" />
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/angularjs-query-cache">
    <img src="https://img.shields.io/npm/dm/angularjs-query-cache.svg?style=flat-square"
      alt="Downloads" />
  </a>
  <!-- Standard -->
  <a href="https://standardjs.com">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square"
      alt="Standard" />
  </a>
</div>

<br />

Sometimes you want to keep the result to a query you made previously.
This module decorates the $http service to add better caching.

This module uses sessionStorage which means restarting the browser will reset the cache.

## Usage

Set the `_cache` field to `true` in the `options` object when making a get request using $http. 
Optionally, you can see the max age (in milliseconds) on individual calls through the `_maxAge` key.


```js
var opts = { 
  _cache: true, 
  _maxAge: 5 * 60 * 1000 // <- this is the default value (5 minutes)
}

$http.get('https://api.my-service.io/endpoint', opts)
```

## Installation

Using npm:

`npm install --save angularjs-query-cache`


