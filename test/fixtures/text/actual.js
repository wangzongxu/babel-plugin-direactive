import React from 'react'
const node = (
  <>
    <div r-text={<p></p>}/>
    <div r-text="<p></p>"></div>
    <div r-text="{...children}"></div>
    <div r-text={content}>{content}</div>
    <div r-text="content">content</div>
    <div r-text="'content'">content</div>
  </>
)
