import { BOARD_SIZE } from '../../../../config/board.config';
import Square from './Square';
import './styles.scss';

const Board = ({ squares, onHandleClickSquare, selectedPosition }) => {
    const renderSquare = (pos, isHighlight) => {
        return (
            <Square
                isHighlight={isHighlight}
                key={BOARD_SIZE * pos.y + pos.x}
                value={squares[pos.x][pos.y]}
                onHandleClickSquare={() => onHandleClickSquare(pos)}
            />
        );
    };

    let board = Array(BOARD_SIZE).fill(null);
    return (
        <div className="board">
            {board.map((item, i) => {
                let row = Array(BOARD_SIZE).fill(null);
                return (
                    <div key={i} className="board-row">
                        {row.map((item, j) => {
                            let pos = { x: i, y: j };
                            let isHighlight = false;
                            if (pos.x === selectedPosition.x && pos.y === selectedPosition.y) {
                                isHighlight = true;
                            }
                            return renderSquare(pos, isHighlight);
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default Board;
