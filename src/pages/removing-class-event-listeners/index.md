---
title: 'Random Encounter — Removing eventListeners in Javascript Classes'
date: '2018-12-02'
description: 'A common occurance when using a prototypal or class based approach to setting up eventListeners is that you want to access your event handling method...'
---

> Flavor text: This series covers bugs and struggles I've encountered in the wild, and how I dealt with them. 

A common occurance when using a prototypal or class based approach to setting up eventListeners is that you want to access your event handling method from the prototype but the `addEventListener` method is called from a target element, making the `this` value the element which is calling the `addEventListener` method.

In this case, we actually want `this` to be our object so it can access the event handling method. The fix for this is simply to use `.bind(this)` on the handling method like so:

```js
document
  .querySelector(`#skillProficiencies${classID}`)
  .addEventListener('change', this.handleSkillChange.bind(this))
```

This is a fine solution until you want to remove eventListeners as you no longer need them. The problem arises when you call `removeEventListener` and pass in the method you wish to remove. This event requires the actual reference to the original function used to setup the listener, but the `bind` method creates a new instance of a function. This means we don't have a proper reference to the original that was used in the `addEventListener` setup.

Using `bind` again isn't going to solve the problem, because that's yet another instance of the method.

```js
document
  .querySelectorAll('[id^="skillProficiencies"]')
  .forEach(el =>
    el.removeEventListener('change', this.handleSkillChange.bind(this))
  )
```

---

A common solution to a situation like this is to create a variable that stores the bound function and use that when setting up and removing listener events.

```js
const boundMethod = this.handleSkillChange.bind(this)
```

While this does work, it doesn't suit my purposes well because I'm setting and removing listeners in a function, and that is going to create this variable everytime the function is called. What we actually want is to do this in a class fashion, by adding it to the instance.

This might look familiar to you if you have any experience with React.js.

```js
constructor() {
    this.handleSkillChange = this.handleSkillChange.bind(this);
  }
```

I have actually never used this pattern outside of React, so it was an enlightening moment to see it used in vanilla js, as well as gaining a better concept of why it's required in React so often.

Now we can simply pass in our default method from the object and it will clear the listener properly.

```js
document
  .querySelectorAll('[id^="skillProficiencies"]')
  .forEach(el => el.removeEventListener('change', this.handleSkillChange))
```
