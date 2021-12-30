import React from 'react';
import './styles.scss';

const Square = ({ isHighlight, onHandleClickSquare, value }) => {
    return (
        <button
            className={`square ${isHighlight && 'highlight'}`}
            onClick={() => onHandleClickSquare()}
        >
            {value}
        </button>
    );
};

export default Square;
