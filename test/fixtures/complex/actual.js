import React from 'react'
const node = (
  <ul r-if={render}>
    <li r-if="bar === 1" r-for="item, index in arr" r-key={index} r-show={visible}>
      bar1
    </li>
    <li r-else-if="bar === 2" r-for="{id, state}, key, index in obj" r-key="index">
      bar2: {id} {state}
    </li>
    <li r-else r-for="item, index in arr" key={index}>
      bar
      <input type="checkbox" r-model={item}/>
      <div r-pre><p/></div>
      <div r-html={"<p>p</p>"}/>
      <div r-text={children}/>
    </li>
  </ul>
)
