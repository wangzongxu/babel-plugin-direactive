import React from 'react'
const node = (
  <div r-if={bar}>
    <p r-if={bar === 1}/>
    <br/>
    <span r-if="bar === 2">
      <i r-if="baz"/>
      <i r-if="baz2"/>
    </span>
  </div>
)
