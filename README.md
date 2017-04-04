# Set Order

> Dead simple module for ordering by an explicit order weighing in at 1.3KB.<br /><br />
> `npm i set-order --save`<br /><br />
> Useful for when you have an array of dynamic data, but you need to sort by a set order, rather than a natural sort order, such as alphabetically or numerically.

![Travis](http://img.shields.io/travis/Wildhoney/SetOrder.svg?style=flat-square)
&nbsp;
![Coveralls](https://img.shields.io/coveralls/Wildhoney/SetOrder.svg?style=flat-square)
&nbsp;
![npm](http://img.shields.io/npm/v/set-order.svg?style=flat-square)
&nbsp;
![License MIT](https://img.shields.io/badge/license-mit-lightgrey.svg?style=flat-square)

## Getting Started

Simply pass in either an array or map of the set order. For sorting on multiple properties you're able to pass in a map with multiple keys &ndash; with the relevance being from top-to-bottom.

```javascript
import as from 'set-order';

// Primitives.
[1, 2, 3].sort(as([2, 1, 3])); // [2, 1, 3]

// Complex nested.
[{ value: 1 }, { value: 2 }, { value: 3 }].sort(as({
    value: [2, 1, 3]
})); // [{ value: 2 }, { value: 1 }, { value: 3 }]
```
