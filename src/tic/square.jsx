import { useState } from 'react';
import './square.css'

export default function Square() {
    const [value, setValue] = useState(null);

    function handleClick() {
        setValue('X');
    }

    return (
        <button 
            className="square"
            onClick={handleClick}    
        >
            {value}
        </button>
    );
}