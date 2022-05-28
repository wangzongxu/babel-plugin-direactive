import React from 'react'
const Component = () => {
  const single = React.useState('A');
  const group = React.useState(['A']);
  return (
    <div>
      <select r-model={single}>
        <option value="A">A</option>
        <option value="B">B</option>
      </select>

      <select multiple={true} r-model={group}>
        <option value="A">A</option>
        <option value="B">B</option>
      </select>
    </div>
  )
}
