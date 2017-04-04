# Set Order

> Tiny module for sorting by a set order, using a custom sort function for omitting explicits.<br /><br />
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

Imagine a scenario where you have a set of bedroom counts, however if the bedroom count is zero then it's labelled as "studio". Using the typical `sort` function would yield the following unusual result.

```javascript
const bedrooms = [4, 2, 'Studio', 1, 3];

bedrooms.sort((a, b) => a > b);
```

> **Result:** `[2, 4, 'Studio', 1, 3]`

Using `set-order` you can be explicit in specifying that *Studio* must **always** be at the beginning.

```javascript
import { exact } from 'set-order';

const bedrooms = [4, 2, 'Studio', 1, 3];
exact(bedrooms, [
    { value: 'Studio' },
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 }
]);
```

> **Result:** `['Studio', 1, 2, 3, 4]`

However the problem with the above is obvious &mdash; you need to be explicit in specifying **all** of the possible bedroom counts, which could be into their hundreds for a chateau. Using the third parameter of the `exact` function allows you to specify a typical `sort` comparator (`(a, b) => a > b`) for unspecified items.

```javascript
import { exact } from 'set-order';

const bedrooms = [4, 2, 'Studio', 1, 3];
exact(bedrooms, [
    { value: 'Studio' }
], (a, b) => a - b);
```

> **Result:** `['Studio', 1, 2, 3, 4]`

Assume now that we've added an additional bedroom *count* named *etc...* which will appear at the end &ndash; to achieve that we use the `position` key which defaults to `head`.

```javascript
import { exact, tail } from 'set-order';

const bedrooms = [4, 'etc...', 2, 'Studio', 1, 3];
exact(bedrooms, [
    { value: 'Studio' },
    { value: 'etc...', position: tail }
], (a, b) => a - b);
```

> **Result:** `['Studio', 1, 2, 3, 4, 'etc...']`
