import React from 'react'
const node = (
  <div r-if={foo}>
    <p r-if="bar === 1">
      <i r-if="'baz0'">baz0</i>
      <i r-if="'baz1'">baz1</i>
      <i r-else-if="baz2">baz2</i>
      <i r-else-if="baz3">baz3</i>
      <i r-if="'baz4'">baz4</i>
    </p>
    <p r-else-if={foo2}>foo2</p>
  </div>
)
