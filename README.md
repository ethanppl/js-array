# JavaScript Array

I reimplemented all 38 JavaScript Array functions (e.g. `.forEach()`, `.map()`,
`.sort()`, etc.) with while loops only. As always, I learned something as I work
on the all the functions. Some features, edge cases, considerations that I
previously do not know about JavaScript.

If you are interested, read about my learning on
[my blog](https://wiki.ethanppl.com/blog/2025/02/23/js-array). I share what I
learn about sparse arrays, copy of a reference, explained some algorithms, my
thoughts on JavaScript language design, and many more.

## Implementation Considerations

The major change I made is I wrote an object (`MyArray`) that contains functions
as parameters (e.g. `MyArray.at(array, 0)`), rather than defining those
functions as methods of an object (e.g. `array.at(0)`). Therefore, the first
argument of all the functions is always the input array. I do not need to
override the original methods. The built-in Array class is still used to
construct the array, but none of the prototype functions are modified or used.

```js
const array = ["a", "b", "c"];

// original function
const expected = array.join();

// my function
const actual = MyArray.join(array);
```

This makes it easier to test too. The `actual` value can be directly compared
with the `expected` value.

- `MyArray` is implemented in [array.ts](./array.ts)
- All tests are written in [array.test.ts](./array.test.ts)
- [index.ts](./index.ts) is for testing manually

Read more in [my blog](https://wiki.ethanppl.com/blog/2025/02/23/js-array)!

## Getting Started

To install dependencies:

```bash
bun install
```

To test:

```bash
bun test
```

I used [bun](https://bun.sh/) to run and test the code. It is fast, simple to
use, support TypeScript, and provide a test runner out of the box.

## Notes

This is just a fun challenge I set for myself. I am not confident that it is
absolutely correct, and I am sure you could find improvements in both time and
memory complexity if you wanted to.
