```js
Warning: React does not recognize the `isBig` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `isbig` instead. If you accidentally passed it from a parent component, remove it from the DOM element.
    in button (created by ForwardRef(Tab))
    in ForwardRef(Tab) (created by Context.Consumer)
    in StyledComponent (created by Styled(Component))
    in Styled(Component) (at App.js:14)
```
[](https://github.com/reach/reach-ui/issues/259)

```js
import React from 'react';
import styled from 'styled-components';
import { Tab } from '@reach/tabs';

const MyTab = styled(Tab)`
  ${({ isBig }) => (isBig ? 'padding: 20px' : 'padding: 5px')};
`;

function App() {
  return (
    <div className="App">
      <MyTab type="submit" className="button" isBig>
        Button text
      </MyTab>
    </div>
  );
}

export default App;
```

[](https://ui.reach.tech/styling/)
```js
// Emotion and styled components
let YourMenuList = styled(MenuList)`
  border: solid 2px black;
  background: black;
  color: red;
  > [data-reach-menu-item][data-selected] {
    background: red;
    color: white;
  }
`

// normal className
<MenuList className="yep"/>

// normal style
<MenuList style={sure}/>

// glamor CSS prop
<MenuList css={absolutely}/>
```


If we take a dive into our `node_modules` and find `@reach/tabs` (or just look up their github repository), we can see that this problem arises from the second highlighted line below where `htmlProps` is being spread onto whatever element `Comp` ends up being (default is a button, shown in first highlight). 
```js
// node_modules/@reach/tabs/src/index.js
export const Tab = forwardRef(function Tab(
  // highlight-next-line
  { children, as: Comp = "button", ...rest },
  forwardedRef
) {
  const { isSelected, _userInteractedRef, _onSelect, _id, ...htmlProps } = rest;

  const ownRef = useRef(null);
  const ref = forwardedRef || ownRef;

  useUpdateEffect(() => {
    if (isSelected && ref.current && _userInteractedRef.current) {
      _userInteractedRef.current = false;
      ref.current.focus();
    }
  }, [isSelected]);

  return (
    <Comp
      data-reach-tab=""
      ref={ref}
      role="tab"
      id={`tab:${_id}`}
      tabIndex={isSelected ? 0 : -1}
      aria-selected={isSelected}
      aria-controls={`panel:${_id}`}
      data-selected={isSelected ? "" : undefined}
      onClick={_onSelect}
      children={children}
      // highlight-next-line
      {...htmlProps}
    />
  );
});

Tab.propTypes = {
  children: node
};
```

@reach developers likely elected to do this so that a user may pass along html classes, data attributes, etc., and they can't easily determine which attributes to let through without an updating whitelist. This is going to be true for most libraries that expose flexible components.
