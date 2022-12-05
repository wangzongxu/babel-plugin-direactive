import React from 'react'
const Component = () => {
  const model = React.useState('foo');
  return (
    <div>
      <input type="radio" r-model={model}/>
      <input type="radio" value="" r-model={model}/>
      <input type="radio" value="A" r-model={model}/>
      <input type="radio" value={1} r-model={model}/>
    </div>
  )
}
