import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

export default function Child({ onUpdate }) {
    const ref = useRef()
    const [myState, setMyState] = useState(null);

    // useEffect(() => { }, [
    //     onUpdate(myState)
    // ], [onUpdate, myState])

    const handleClick = () => {
        setMyState(ref.current.value);
        onUpdate(ref.current.value);
    }

    // const onSubmit = () => {
    //     onUpdate(myState);
    // }

    return (
        <div>
            <h3>Child:</h3>
            <input ref={ref} type="text" />
            <button onClick={handleClick}>Submit</button>
        </div>
    )
}
