## Exact Order

> Dead simple module for ordering by an explicit order weighing in at ~325b.

`npm i exact-order --save`

Useful for when you have an array of dynamic data, but you need to sort by a set order, rather than a natural sort order, such as alphabetically or numerically.

### Getting Started

```javascript
import as from 'exact-order';

// Primitives.
[1, 2, 3].sort(as([2, 1, 3])); // [2, 1, 3]

const countries = [
    { name: 'Russian Federation' },
    { name: 'United Kingdom' },
    { name: 'The Netherlands' }
];

// Complex.
countries.sort(as({
    name: ['United Kingdom', 'The Netherlands', 'Russian Federation']
}))
```
