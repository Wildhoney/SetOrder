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

Take a scenario where you have a list of bedroom counts where if the `count` is **zero** then it's labelled as **Studio** &mdash; those labelled as such should appear at the beginning of the array.

Using the native `sort` with a simple function would yield an undesired result.

```javascript
const bedrooms = [4, 2, 'Studio', 1, 3];
bedrooms.sort((a, b) => a - b);

// [2, 4, 'Studio', 1, 3]
```

Instead by utilising `set-order` you're able to be explicit about which items should be grouped together in the sorting process, as well as where they reside in the array &mdash; at the beginning or at the end.

```javascript
import { exact } from 'set-order';

const bedrooms = [4, 2, 'Studio', 1, 3];
bedrooms.sort(exact(['Studio', 1, 2, 3, 4]));

// ['Studio', 1, 2, 3, 4]
```

### Sort

Taking the previous approach, its downside is immediately obvious in that you're required to specify **all** of the possible bedroom counts. Instead we'll specify **only** where **Studio** since the other values can be numerically sorted using `a - b`.

```javascript
import { exact } from 'set-order';

const bedrooms = [4, 2, 'Studio', 1, 3];
bedrooms.sort(exact(['Studio'], (a, b) => a - b));

// ['Studio', 1, 2, 3, 4]
```

### Position

Building on the previous example we'll add an additional item entitled **etc...** which should appear at the end of the array: `['Studio', ..., 'etc...']` which we can easily achieve by using the `position` property which accepts two possible values: `head` and `tail` where the default is `head`.

```javascript
import { exact, tail } from 'set-order';

const bedrooms = [4, 'etc...', 2, 'Studio', 1, 3];
bedrooms.sort(exact([
    { value: 'Studio' },
    { value: 'etc...', position: tail }
], (a, b) => a - b));

// ['Studio', 1, 2, 3, 4, 'etc...']
```

### Associative

Although the above is *almost* what we want, in real-life scenarios we're likely to be faced with an array of objects, rather than an array of primitives. For this `set-order` uses the fantastic [`object-path`](https://github.com/mariocasciaro/object-path) module which allows you to specify nested keys in the format of `my.nested.key`.

```javascript
import { exact, tail } from 'set-order';
import by              from 'sort-by';

const bedrooms = [
    { id: 1, bedrooms: 4 },
    { id: 2, bedrooms: 'etc...' },
    { id: 3, bedrooms: 2 },
    { id: 4, bedrooms: 'Studio' },
    { id: 5, bedrooms: 1 },
    { id: 6, bedrooms: 3 }
];

bedrooms.sort(exact([
    { property: 'bedrooms', value: 'Studio' },
    { property: 'bedrooms', value: 'etc...', position: tail }
], by('bedrooms')));

// [{ id: 4, bedrooms: 'Studio' }, { id: 5, bedrooms: 1' }] etc...
```

### Shorthand

Using the [associative](#Associative) approach we're successfully sorting an array of objects on the key `bedrooms`, but being explicit in saying that **Studio** should appear first &mdash; regardless of how many instances of **Studio** there may be in the array &mdash; and **etc...** should appear at the very end.

However memorising the `{ value, property, position }` interface may be somewhat difficult, nor is it too elegant. Instead we can be more succinct and chic by using `head` and `tail` as functions which take two parameters each: `value` and `property` where `property` is optional for arrays of objects.
 
 ```javascript
import { exact, head, tail } from 'set-order';

const bedrooms = [4, 'etc...', 2, 'Studio', 1, 3];
bedrooms.sort(exact([head('Studio'), tail('etc...')], (a, b) => a - b));

// ['Studio', 1, 2, 3, 4, 'etc...']
 ```
