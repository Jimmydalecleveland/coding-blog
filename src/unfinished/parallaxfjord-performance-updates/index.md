# Improving Performance on for scroll animations in Svelte
[svelte.parallaxfjord.com](https://svelte.parallaxfjord.com/)

Super neat looking trick to calculate background with css variable
```css
.parallax-container {
  background: rgb(
    calc(var(--scrollY) / 2.75),
    calc(135 - var(--scrollY) / 17),
    calc(213 - var(--scrollY) / 5.4)
  );
}
```
```html
<main class="parallax-container" style="--scrollY: {scrollY}">
```
Even just creating the css variable caused a very similar performance hit without rendering the background styles at all. It seems that just recalculating it is costly.

article on the topic: https://lisilinhart.info/posts/css-variables-performance
> So the more children a parent element has using this variable, the more expensive setting a CSS variable on this element gets.

Better performing JS way
```js
let scrollY
const body = document.querySelector('body')
$: red = scrollY / 2.75
$: green = 135 - scrollY / 17
$: blue = 213 - scrollY / 5.4
$: body.style.background = `rgb(${red}, ${green}, ${blue})`
```
