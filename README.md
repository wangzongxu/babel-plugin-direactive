<h1>☝️babel-plugin-di<span style="color:rgb(8, 126, 164)">react</span>ive</h1>

Use directives in React like Vue.

[![NPM version](https://img.shields.io/npm/v/babel-plugin-direactive.svg?style=flat)](https://npmjs.org/package/babel-plugin-direactive) 

---

## 🤔Motivation

After moving from the Vue stack to React, I still like the expression of the Vue template. Using this plugin can improve the expression of the React template just like the directive in Vue.

- Before

```jsx
function Component() {
  return (
    <section>
      {
        isLoadong ? <div>Loading...</div>
          : error ? <div>{error}</div>
          : shopList.length > 0 ? (
              <ul>
                {
                  shopList.map(shop => (
                    <li key={shop.id}>
                      <h5>{shop.name}</h5>
                      <ul style={{ display: isShowProducts ? 'block' : 'none' }}>
                        {
                          shop.productList.map(product => (
                            <li key={product.id}>
                              <h6>{product.name}</h6>
                            </li>
                          ))
                        }
                      </ul>
                    </li>
                  ))
                }
              </ul>
          ) : <div>Empty</div>
      }
    </section>
  )
}
```

- After

```jsx
function Component() {
  return (
    <section>
      <div r-if={isLoadong}>Loading...</div>
      <div r-else-if={error}>{error}</div>
      <ul r-else-if={shopList.length > 0}>
        <li r-for="shop in shopList" r-key="shop.id">
          <h6>{shop.name}</h6>
          <ul r-show={isShowProducts}>
            <li r-for="product in shop.productList" r-key="product.id">
              <h6>{product.name}</h6>
            </li>
          </ul>
        </li>
      </ul>
      <div r-else>Empty</div>
    </section>
  )
}
```

## Where to add babel-plugin-direactive

- [babelrc](https://babeljs.io/docs/usage/babelrc/)
- [babel-loader](https://github.com/babel/babel-loader)

## Which directives are supported

- `r-if`
- `r-else-if`
- `r-else`
- `r-for/r-key`
- `r-show`
- `r-html`
- `r-text`
- `r-pre`
- `r-model`

## Install

```bash
npm install babel-plugin-direactive -D
```

Via `.babelrc` or babel-loader.

```js
{
  "plugins": ["babel-plugin-direactive"]
}
```

## Usage

All directive attribute values are parsed as expression, except for ```r-for``` directive (which use special expressions)

#### ```r-if```

```jsx
<div r-if="foo"/>
// equivalent:
<div r-if={foo}/>

<div r-if="foo === 1"/>
// equivalent:
<div r-if={foo === 1}/>
```

> Refer to https://vuejs.org/api/built-in-directives.html#v-if

#### ```r-else-if/r-else```

```jsx
<div r-if="foo">foo</div>
<div r-else-if="bar">bar</div>
<div r-else>baz</div>
```

#### ```r-for/r-key```

```jsx
<ul>
  <li r-for"item, index of arr" r-key="index">
    {item}
  </li>
</ul>

// object
<ul>
  <li r-for"val, key, index of obj" r-key="key">
    {key}: {val}
  </li>
</ul>
```
Note: Use ```r-key``` instead of ```key```

> Refer to https://vuejs.org/api/built-in-directives.html#v-for


#### ```r-show```

```jsx
<div r-show="foo"/>
```

> Refer to https://vuejs.org/api/built-in-directives.html#v-show

#### ```r-html```

```jsx
const html = "<div onclick='javascript:alert(1)'>alert</div>";
<div r-html="html"/>
```

> Refer to https://vuejs.org/api/built-in-directives.html#v-html

#### ```r-text```

```jsx
<div r-text="variable"/>
<div r-text={variable}/>
<div r-text="'raw string'"/>
<div r-text={'raw string'}/>
```

> Refer to https://vuejs.org/api/built-in-directives.html#v-text

#### ```r-pre```

There is a requirement that ```r-pre``` content conform to JSX syntax.

```jsx
// not work
<div r-pre>{this will not be compiled}</div>

// work
<div r-pre>{content}</div>
<div r-pre>{this}</div>

// preserve line wrap
<pre r-pre>
  {
    content
  }
</pre>
```

> Refer to https://vuejs.org/api/built-in-directives.html#v-pre

#### ```r-model```

- text

```jsx
function Component() {
  const value = useState(0);
  return <input r-model={value}/>
}

// Read value
function Component() {
  const [value, setValue] = useState(0);
  return (
    <>
      <p>value: {value}</p>
      <input r-model={[value, setValue]}/>
    </>
  )
}
```
Note: The ```r-model``` directive does not support modifiers.

- textarea

```jsx
function Component() {
  const value = useState(0);
  return <textarea r-model={value}/>
}
```

- checkbox

```jsx
// The value is true if checkbox is checked, false otherwise
function Component() {
  const checkbox = useState(true);
  return (
    <>
      <input type="checkbox" r-model={checkbox} />
      <label>{checkbox[0]}</label>
    </>
  )
}

// You can also specify the checked value and the unchecked value
function Component() {
  const checkbox = useState(0);
  return (
    <>
      <input type="checkbox" true-value={1} false-value={0} r-model={checkbox} />
      <label>{checkbox[0]}</label>
    </>
  )
}

// Group
function Component() {
  const checkedNames = useState([]);
  return (
    <>
      <div>Checked names: {checkedNames[0]}</div>
      <input type="checkbox" value="Jack" r-model="checkedNames">
      <input type="checkbox" value="John" r-model="checkedNames">
      <input type="checkbox" value="Mike" r-model="checkedNames">
    </>
  )
}
```

- radio

```jsx
function Component() {
  const picked = useState('One');
  return (
    <>
      <div>Picked: {picked[0]}</div>
      <input type="radio" value="One" r-model="picked" />
      <input type="radio" value="Two" r-model="picked" />
    </>
  )
}
```

- select

```jsx
function Component() {
  const selected = useState('A');
  return (
    <>
      <div>Selected: {selected[0]}</div>
      <select r-model="selected">
        <option disabled value="">Please select one</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>
    </>
  )
}

// Multiple select (bound to array):
function Component() {
  const selected = useState('A');
  return (
    <>
      <div>Selected: {selected[0]}</div>
      <select r-model="selected" multiple>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>
    </>
  )
}
```

Note: The option value can only be a string literal.

> Refer to https://vuejs.org/api/built-in-directives.html#v-model

- component

```jsx
function Parent() {
  const state = useState();
  return <Child r-model={state}/>
}

// The component will receive two props: value and onChange
function Child(props) {
  return <div
    r-text={props.value}
    onClick={props.onChange('new value')}
  />
}
```

## How it works

The plugin performs the following transformations at compile time.
> For a clearer description, it can be understood as follows, and the implementation is in the source code.

#### ```r-if/r-else-if/r-else```

```jsx
<div r-if="foo">foo</div>
<div r-else-if="bar">bar</div>
<div r-else>baz</div>

      ↓ ↓ ↓ ↓ ↓ ↓

foo 
  ? <div>foo</div>
  : bar
    ? <div>bar</div>
    : <div>baz</div>
```

#### ```r-for/r-key```

```jsx
<ul>
  <li r-for"item, index of arr" r-key="index">
    {item}
  </li>
</ul>

      ↓ ↓ ↓ ↓ ↓ ↓

<ul>
  {
    arr.map((item, index) => <li key={index}>{item}</li>)
  }
</ul>
```


#### ```r-show```

```jsx
<div r-show="foo"/>

      ↓ ↓ ↓ ↓ ↓ ↓

<div style={ foo ? {} : { display: 'none' } }/>
```

#### ```r-html```

```jsx
const html = "<div onclick='javascript:alert(1)'>alert</div>";
<div r-html="html"/>

      ↓ ↓ ↓ ↓ ↓ ↓

<div dangerouslySetInnerHTML={{ __html: html }}/>
```

#### ```r-text```

```jsx
<div r-text="variable"/>
<div r-text={variable}/>
<div r-text="'raw string'"/>
<div r-text={'raw string'}/>

      ↓ ↓ ↓ ↓ ↓ ↓

<div>{variable}</div>
<div>{variable}</div>
<div>{'raw string'}</div>
<div>{'raw string'}</div>
```

#### ```r-pre```

```jsx
<div r-pre>{content}</div>
<div r-pre>{this}</div>
<pre r-pre>
  {
    content
  }
</pre>

      ↓ ↓ ↓ ↓ ↓ ↓

<div>{`{content}`}</div>
<div>{`{this}`}</div>
<pre>{`
  {
    content
  }
`}</pre>
```

#### ```r-model```

- text

```jsx
<input r-model={value}/>

      ↓ ↓ ↓ ↓ ↓ ↓

<input value={value[0]} onChange={e => value[1](e.target.value)}/>
```

- textarea

```jsx
<textarea r-model={value}/>

      ↓ ↓ ↓ ↓ ↓ ↓

<textarea value={value[0]} onChange={e => value[1](e.target.value)}/>
```

- checkbox

```jsx
<input type="checkbox" r-model={checkbox} />
<input type="checkbox" true-value={1} false-value={0} r-model={checkbox} />

      ↓ ↓ ↓ ↓ ↓ ↓

<input type="checkbox" checked={checkbox[0] === true} onChange={e => checkbox[1](e.target.checked ? true : false)} />
<input type="checkbox" checked={checkbox[0] === 1} onChange={e => checkbox[1](e.target.checked ? 1 : 0)} />
```

- radio

```jsx
<input type="radio" value="One" r-model="picked" />

      ↓ ↓ ↓ ↓ ↓ ↓

<input type="radio" value="One" checked={picked[0] === 'One'} onChange={e => picked[1]('One')}/>
```

- select

```jsx
<select r-model="selected">
  <option value="A">A</option>
  <option value="B">B</option>
  <option value="C">C</option>
</select>

      ↓ ↓ ↓ ↓ ↓ ↓

<select value={selected[0]} onChange={e => selected[1](e.target.value)}>
  <option value="A">A</option>
  <option value="B">B</option>
  <option value="C">C</option>
</select>
```

- component

```jsx
<Child r-model={state}/>

      ↓ ↓ ↓ ↓ ↓ ↓

<Child value={state[0]} onChange={state[1]}/>
```
