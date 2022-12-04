import React from 'react'
import { useCallback } from 'react';
import { useState } from 'react'
import Child from './Child';

export default function Parent() {
  const [myState, setMyState] = useState(null);

  const handleChange = useCallback((newV) => {
    setMyState(newV);
  }, [])

  return (
    <div>
      <h2>Parent: {myState}</h2>
      <Child onUpdate={handleChange} />
    </div>
  )
}
