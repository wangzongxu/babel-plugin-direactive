import React from 'react'
const Component = () => {
  const single = React.useState('A');
  const group = React.useState(['A']);
  return (
    <div>
      <input type="checkbox" r-model={single}/>
      <input type="checkbox" value r-model={single}/>
      <input type="checkbox" value="" r-model={single}/>
      <input type="checkbox" value={1} r-model={single}/>
      <input type="checkbox" true-value="A" false-value="B" r-model={single}/>
      <input type="checkbox" true-value="A" false-value="B" value="C" r-model={single}/>

      <input type="checkbox" value="A" r-model={group}/>
      <input type="checkbox" value="B" r-model={group}/>
    </div>
  )
}
