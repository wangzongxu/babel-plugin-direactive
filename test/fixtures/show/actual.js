import React from 'react'

const node = (
  <div r-show="foo" a="a" b={b} {...c} {...d()} {...{e: 'e'}}>
    <p r-show={bar}>
      <i r-show="baz === 1"></i>
      <b f="f" {...g}/>
    </p>
  </div>
)
