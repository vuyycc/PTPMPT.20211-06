import { Button } from '@material-ui/core';
import React from 'react';
import './styles.scss';

const HistoryItem = ({ historyItem, index, handleHistoryItemClick, selected }) => {
    return (
        <Button
            variant={selected ? 'contained' : 'outlined'}
            color="secondary"
            className="history-item"
            onClick={() => handleHistoryItemClick(index)}
        >
            <div className="index">{index + 1}) </div>
            <div className="item">
                {historyItem.pos.x} - {historyItem.pos.y}
            </div>
        </Button>
    );
};

export default HistoryItem;
