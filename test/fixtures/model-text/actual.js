import React from 'react'
const Component = () => {
  const model = React.useState('foo');
  return (
    <div>
      <input type="text" r-model={model}/>
      <input type="color" r-model={model}/>
      <textarea r-model={model}/>
    </div>
  )
}
