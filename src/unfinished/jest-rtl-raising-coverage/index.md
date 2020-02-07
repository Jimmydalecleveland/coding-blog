---
title: "Raising Test Coverage with Jest and React Testing Library"
date: "2020-02-04"
description: ""
category: "Arcane Mysteries"
---

> Flavor text: Arcane Mysteries is a series where I attempt to dig deeper into the mysteries of the coding cosmere.

* `getByText` won't find item, use `getByTestId`, that will error when it finds multiple, put an index on it if possible.
* don't test that the function fired, test that the content is on the screen. We want to test from the users point of view. They found the text to click, and clicked it.

* else path not taken, don't `istandbul ignore else`, or have a pointless return that the linter doesn't like. Have a test that calls your code in a way that doesn't pass the if statement.
```js
  /* istanbul ignore else */
  // We do not want to do anything if any key other than Enter is pressed
```

*lcov report has keybindings to navigate the file (including vim!) j to go to the next uncovered block

* I had a fireEvent.click that was like "your function is covered" and I was thinking that is dumb because I didn't test that the function was fired, I just tested that clicking on an element happened.
But then I put a throw new Error in my function just to see and it broke the test. so I realized even "just make the tests happy" can be useful because even if you don't test the logic you did test that an error didn't occur

* `expect(queryByTestId('accordion-content0--open')).toBeNull()` to test that an item is no longer there