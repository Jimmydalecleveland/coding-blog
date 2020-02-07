---
title: "A simple example of the React useContext hook"
date: "2019-10-06"
description: "A complete code example of how to use the useContext React hook with no fluff or extra overhead."
category: "Coding Cantrips"
---

> Flavor text: Cantrips are the basic spells you use the most throughout your adventures as a spellcaster. Though fundamental coding concepts do not seem basic, they will become so as you use them throughout your journey of programming.

This is intended to be a quick reference post, so I'll start with the code block and follow up with the explanation after. The following is a minimal example of React Context using the `useContext` hook.

```jsx
import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom';

const ExampleContext = createContext('Initial Value');

function App() {
  return (
    <ExampleContext.Provider value="Updated Value">
      <ChildComponent />
    </ExampleContext.Provider>
  );
}

function ChildComponent() {
  const valueFromContext = useContext(ExampleContext);
  return <h1>{valueFromContext}</h1>;
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```

While React has really great documentation, there have been a few places where the documentation divide between hooks and their previous implementations can cause confusion for newer React developers. I had a co-worker complain about not being able to find a simple and straightforward example of `useContext`. I assumed the <a href="https://reactjs.org/docs/hooks-reference.html#usecontext" target="_blank" rel="noopener noreferrer">react docs for the hook version of context</a> would cover this entirely, but he had already looked there and come up short. 

When I took a look, I realized the docs did explain how to use it, but it only would only make sense if you had used `Context` before. This is a situation I could see even an experienced React developer tripping up on if they'd been using Redux in all their projects and skipped Context, which I anecdotally feel happens often enough. So I wrote the previous quick and complete code example for anyone else trying to put the pieces together for basic usage. 

A common confusion seems to be whether you still need to wrap your component tree with a `Context.Provider` component to use `useContext`. If you are interested in more details about the usage, here is the same block of code with more explanation.

```jsx
/**
 * Normally you would import `createContext` and `useContext`
 * in different files, because you would reuse `useContext`
 * in each component you wish to have access to the value provided
 * by Context.Provider
 */
import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom';

/**
 * This variable would typically be exported and imported anywhere
 * you need to pass it to `useContext`
 */
const ExampleContext = createContext('Initial Value');

function App() {
  return (
    /**
     * Using the Context variable you have created, you'll need to call
     * the `Provider` method and pass a value. This could be an object of
     * values or other types as well. Any child components wrapped by this
     * component have access to the value prop through `useContext` in those
     * components. 
     */
    <ExampleContext.Provider value="Updated Value">
      <ChildComponent />
    </ExampleContext.Provider>
  );
}

/**
 * Usually this component, and others consuming the context, will be in
 * separate files. Thus you'll need to import the context variable from
 * where you created it (ExampleContext in this example).
 */
function ChildComponent() {
  const valueFromContext = useContext(ExampleContext);
  return <h1>{valueFromContext}</h1>;
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```