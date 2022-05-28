import React from 'react'

const node = (
  <li r-for="item , index of arr" r-key="index">{item}</li>
)

const nodeNested = (
  <ul>
    <li r-for="item , index of arr" r-key={index}>
      <ol>
        <li r-for="innerItem, innerIndex of item" key={innerIndex}>{item}: {innerItem}</li>
      </ol>
      <ol>
        <li r-for="innerItem2, innerIndex2 of item" key="innerIndex">{item}: {innerItem2}</li>
      </ol>
    </li>
  </ul>
)
