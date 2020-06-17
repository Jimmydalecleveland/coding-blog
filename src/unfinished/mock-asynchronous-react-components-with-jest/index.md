```jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SwapiGetter = () => {
  const [person, setPerson] = useState()

  useEffect(() => {
    axios.get('https://swapi.dev/api/people/1/').then(res => {
      setPerson(res.data)
    })
  }, [])

  if (!person) return <h1>...Loading</h1>

  console.log(person)
  return (
    <div>
      <h1>{person.name}</h1>
    </div>
  )
}

export default SwapiGetter
```

```js
import mockAxios from 'axios'

jest.mock('axios')
```

```js
describe('Group of tests', () => {
  beforeEach(jest.clearAllMocks)

  test('first test', () => {
    // testy stuff
  })
})
```

We can also add a console to the actual component/function we are testing like so:

```jsx
if (!person) return <h1>...Loading</h1>

// highlight-next-line
console.log(person)
return (
  <div>
    <h1>{person.name}</h1>
  </div>
)
```

and we should get:

```
console.log src/SwapiGetter.jsx:16
  { name: 'Jimmy Jedi' }
```

Awesome, our component is using our mocked axios.

```js
await wait(expect(mockAxios.get).toHaveBeenCalledTimes(1))
```

Will actually use axios and hit SWAPI

```jsx
test('should render with fetched data', async () => {
  const { getByText } = render(<SwapiGetter></SwapiGetter>)

  await wait(() => expect(getByText('Luke Skywalker')))
})
```

If we add this line

```js
mockAxios.get.mockImplementation(() => Promise.resolve({ data: {} }))
```

The `wait` test will wait ~5 seconds and then return

```
Unable to find an element with the text: Luke Skywalker. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.
```

This means ours mock implementation worked. We can confirm this by adding this `console.log` real quick:

```js
mockAxios.get.mockImplementation(
  () => console.log('did you get called?') || Promise.resolve({ data: {} })
)
```

```js
await wait(() => expect(getByText('Jimmy Jedi')))
```
