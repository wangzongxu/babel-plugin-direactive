import React from 'react'
const node = (
  <>
    <div r-pre><p></p></div>
    <div r-pre>{children}</div>
    <div r-pre>{...children}</div>
    <div r-pre>{<></>}</div>
    <div r-pre>text</div>
    <div r-pre>
      <p>

      </p>
      {children}
      <>
        {...children}
      </>

      text
    </div>
  </>
)
