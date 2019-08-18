---
title: 'Arcane Mysteries — Tagged templates and understanding Styled Component syntax'
date: '2019-08-18'
description: "Throughout this article I'm going to cover what Tagged Templates are and how you can write a simplified foundation of a Styled Component function to better understand the syntax you might encounter every day you work with them."
---

> Flavor text: Arcane Mysteries is a series where I attempt to dig deeper into the mysteries of the coding cosmere.

I have been writing Styled Components for a little over a year now, and this whole time I have not understood what is going on with the Tagged Template Literals syntax. This syntax is also popular for GraphQL if you happen to use that. I imagine many are like me, in that their first exposure to the following syntax is: "Well that is funky looking, but if I get to write SCSS instead of that cumbersome javascript object css let's give it a whirl."
```js
// Intro example from Styled Components docs
const Button = styled.button`
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
```

If your response was more to the tune of: "How does that work? Let's look it up!" Then I think you are on the track to greatness, keep it up. For the rest of us, sometimes you just need to move on and use a thing for a while before you have the time and patience to dig through the innards of how it works.

Well yesterday was the day I had had enough of being ignorant on this topic and it was much less complicated than I thought.

Throughout this article I'm going to cover what "Tagged Templates" are and how you can write a simplified foundation of a Styled Component function to better understand the syntax you might encounter every day you work with them.

### Let's start with the basics of Tagged Templates
Hopefully you are already familiar with Template Literals in Javascript, but if not MDN has great documentation for them <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals" target="_blank" rel="noopener noreferrer">here</a>. They are extremely handy in everyday development and well worth learning.

A "Tagged Template" is a function that allows you to parse template literals. Here is a quick example of writing one:
```js
function taggedTemplate(stringArray, variable) {
  console.log(stringArray)
  // [ 'The string will be split here: ', ' Then it resumes here.' ]

  console.log(variable)
  // I am the great divider!

  return `${stringArray[0]}${variable}${stringArray[1]}`
}

const stringVar = "I am the great divider!"
const customSentence = taggedTemplate`The string will be split here: ${stringVar} Then it resumes here.`
console.log(customSentence)
// The string will be split here: I am the great divider! Then it resumes here.
```

Our function is fairly standard, accepting an array of strings for the first parameter, and a single variable for the second parameter. The magic happens when it is invoked. Calling the function in this format:
```js
taggedTemplate``
```
rather than the usual:
```js
taggedTemplate()
```
will cause our string to be parsed and split on any variables encountered within the string. This gives us a lot of power in creating custom strings based on conditions. Let's look at a little more dynamic example:

```js
/**
 * To use this function, pass in your damage as the first variable
 * and your bonus (modifier) as the second variable.
 * 
 * optional: Start the string with what happens to you for flavor.
 * @example:
 *    doDamage`${18}${3}`
 *    doDamage`trip on a stone${7}${3}`
 * */

function doDamage(stringArray, damage, modifier) {
  stringArray
  const intro = stringArray[0]
    ? `You ${stringArray[0]}, and deal a`
    : 'You deal a'
  const adjective = damage > 15 ? 'crippling' : 'paltry'
  return `${intro} ${adjective} ${damage} + ${modifier} damage.`
}

const myTest = doDamage`${18}${3}`
// You deal a crippling 18 + 3 damage.
const myTest2 = doDamage`trip on a stone${7}${3}`
//You trip on a stone, and deal a paltry 7 + 3 damage.
```

In this more complicated usage, we have the optional ability to write a string at the beginning, and then list two variables. The function uses some silly conditionals to return a string explaining the damage you have dealt. This could all be done differently using a standard function, but hopefully it shows how tagged templates handle strings and multiple variables.

### Styled Components syntax
Now that we have covered the basics of tagged templates, let's start creating our own `styled` function. We'll start with a basic version that has access to `theme` variables.

```js
const theme = {
  spacing: {
    min: '2px',
    max: '24px',
  },
  colors: {
    primary: 'coral',
    secondary: 'peachpuff',
  },
}

function styled(css, ...variables) {
  const computedCss = css
    .map((chunk, index) => `${chunk}${variables[index] || ''}`)
    .join('')
  return computedCss
}

const Button = styled`
  background: ${theme.colors.secondary};
  margin-bottom: ${theme.spacing.min};

  span {
    padding: 0.25em 1em;
    color: ${theme.colors.primary};
  }
`
/* Output:
  background: peachpuff; 
  margin-bottom: 2px; 
   
  span { 
    padding: 0.25em 1em; 
    color: coral; 
  } 
*/
```

This example starts with a `theme` declared outside the function scope for easy access, which the call to `styled` makes use of in the same way our previous examples would. What is different and worth noting is how we are spreading `variables` in our function parameter definition.
```js
// highlight-next-line
function styled(css, ...variables) {
  const computedCss = css
    .map((chunk, index) => `${chunk}${variables[index] || ''}`)
    .join('')
  return computedCss
}
```

Since we do not know how many variables will be passed to us, we'll spread them into an array called `variables`. I pondered for a while on how to place the variables in their appropriate spots in the final string ouput until I realized that it was quite simple. Tagged template strings are split on each encountered variable, meaning if you loop over the string array, your current index will match the index of the variable that caused the split.

In other words, we can just do this:
```js
function styled(css, ...variables) {
  // highlight-start
  const computedCss = css
    .map((chunk, index) => `${chunk}${variables[index] || ''}`)
  // highlight-end
    .join('')
  return computedCss
}
```

I am calling each position in the `css` array (string array) a `chunk`. We write the chunk out and then combine it with the variable of the same `index`. We might have more chunks than variables so we'll need to check if a variable exists at that index and return nothing (i.e. an empty string) otherwise.

### Adding callbacks to access theme and props
We are near the home stretch now, hang on just a little bit longer. In the first example I showed that for Styled Components they use function callbacks to access `props` and perform logic based on the prop. We are going to combine that with our theme in this last example.

```js
function styled(css, ...variables) {
  const theme = {
    spacing: {
      min: '2px',
      max: '24px',
    },
    colors: {
      primary: 'coral',
      secondary: 'peachpuff',
    },
  }

  const props = {
    theme,
    primary: true,
    bigSpacing: true,
  }

  const computedCss = css
    .map(
      (chunk, index) =>
        `${chunk}${variables[index] ? variables[index](props) : ''}`
    )
    .join('')
  return computedCss
}

const Button = styled`
  background: ${({ primary, theme }) =>
    primary ? theme.colors.primary : theme.colors.secondary};
  margin-bottom: ${({ bigSpacing, theme }) =>
    bigSpacing ? theme.spacing.max : theme.spacing.min};

  span {
    padding: 0.25em 1em;
    color: ${({ primary, theme }) =>
      primary ? theme.colors.secondary : '#fff'};
  }
`
/* Output:
  background: coral; 
  margin-bottom: 24px; 
 
  span { 
    padding: 0.25em 1em; 
    color: peachpuff; 
  } 
*/
```

We have placed the `theme` object inside the `styled` function, and added a `props` object with `theme` as a property on it. The major difference in the function is that we are calling a function at `variables[index]` when a value exists in that position. This is because our template string is passing callback functions now rather than plain variables.

```js
function styled(css, ...variables) {
  // . . .
  const computedCss = css
    .map(
      (chunk, index) =>
        // now fires a callback at 'variables[index]'
  // highlight-start
        `${chunk}${variables[index] ? variables[index](props) : ''}`
  // highlight-end
    )
    .join('')
  return computedCss
}

const Button = styled`
  /* now passes a callback that accepts a 'props' object */
  /* highlight-start */
  background: ${({ primary, theme }) =>
    primary ? theme.colors.primary : theme.colors.secondary};
  /* highlight-end */
    /* ... */
```

There is obviously a great deal more going on in Styled Components, such as the context it provides, but I believe this takes us far enough in understanding the underlying syntax of how it might use tagged templates to give us the powerful features it does. Going through this process relieved some anxiety I had about the magic going on behind the scenes, and I hope it has done the same for you. We'll see you next time as we continue to explore more Arcane Mysteries!