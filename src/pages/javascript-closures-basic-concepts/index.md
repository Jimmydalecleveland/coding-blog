---
title: "Coding Cantrips — Javascript Closures"
date: "2018-12-08"
description: "There are, of course, lots of blogs writing about this topic, but if you have found your way here I hope this will give you the missing pieces to understanding closures in Javascript"
---

> Flavor text: Cantrips are the basic spells you use the most throughout your adventures as a spellcaster. Though fundamental coding concepts do not seem basic, they will become so as you use them throughout your journey of programming.

I find myself covering this topic fairly often so I'm writing this for friends and colleagues as a reference. There are, of course, lots of blogs writing about this topic, but if you have found your way here I hope this will give you the missing pieces to understanding closures in Javascript.

### The Scope Chain and Local Scope
Whenever a function is executed it has a 'scope chain', which means that every inner function has access to any variables that were declared outside it. This is the 'local scope' of a function. The other type of scope is 'global scope', which refers to anything declared outside of a function.

```js
function outerFunc() {
  const outerVariable = "innerFunc has access to me";

  function innerFunc() {
    console.log(outerVariable);
  }

  innerFunc();
}

outerFunc();
// log output: innerFunc has access to me
```

The behavior is the same when a variable is passed into the outer function. A variable is still created in the outer function.

```js
function outerFunc(passedVariable) {
  function innerFunc() {
    console.log(passedVariable);
  }

  innerFunc();
}

outerFunc("innerFunc has access to me");
// log output: innerFunc has access to me
```

### Finally, Closures
So what if we were to return the inner function, in order to run it at a later time? Would it still have access to the outer functions variables, even though the outer function has already finished running?

Indeed it would.

```js
function multiplyBy(multiplicand) {
  return function (multiplier) {
    console.log(multiplicand * multiplier);
  }
}

const multiplyByTwo = multiplyBy(2);
multiplyByTwo(5); // log output: 10
multiplyByTwo(10); // log output: 20

// create another function using 'multiplyBy'
const multiplyByThree = multiplyBy(3);
multiplyByThree(4); // log output: 12
multiplyByThree(10); // log output: 30
```

A function continues to hold a 'memory' of any variables declared in it's outer scope. This is a silly example, but I think it illustrates the point simply. Using closures, you can generate and store a function that has some preset variables. Closures are happening all over in Javascript, and if my explanations made sense you should begin to spot them and understand that code more deeply.

### Extra Fun: A slightly more advanced usage of closures
There are times when you want to pass an additional variable to a callback, and if you don't understand the concept of closures you may struggle to figure out how to accomplish it. For example, a `Promise` passes a `resolve` function and a `reject` function to the callback. But how can we pass a third parameter if we want our Promise function to be more flexible? [MDN has a great example](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#Creating_a_Promise) of using closures to pass a url to an XHR request function. Here is slightly modified example that you can run.

```js
function myFetch(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", url)
    xhr.onload = () => resolve(xhr.responseText)
    xhr.onerror = () => reject(xhr.statusText)
    xhr.send()
  })
}

myFetch("https://swapi.co/api/people/1").then(result => console.log(result))
// log output: {"name":"Luke Skywalker", ...}
```

With this simple concept we can create more powerful and flexible functions. I hope this article has been useful, have a majestic day.