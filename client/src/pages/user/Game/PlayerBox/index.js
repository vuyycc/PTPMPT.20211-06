import React from 'react';
import GameInfo from './GameInfo';
import PlayerInfo from './PlayerInfo';
import './styles.scss';

const PlayerBox = ({
    boardId,
    isHost,
    isViewer,
    hostname,
    hostReady,
    guestname,
    guestReady,
    hostAvatar,
    guestAvatar,
    hostCups,
    guestCups,
    time,
    countDownRef,
    countDownKey,
    handleTimeout,
    handleToggleReady,
    handleLeaveRoom,
    handleResign,
    handleDraw,
}) => {
    return (
        <div className="player-box">
            <PlayerInfo
                isHost={true}
                username={hostname}
                avatar={hostAvatar}
                cups={hostCups}
                ready={hostReady}
            />

            <GameInfo
                boardId={boardId}
                time={time}
                isViewer={isViewer}
                isHost={isHost}
                hostReady={hostReady}
                guestReady={guestReady}
                countDownRef={countDownRef}
                countDownKey={countDownKey}
                handleTimeout={handleTimeout}
                handleToggleReady={handleToggleReady}
                handleLeaveRoom={handleLeaveRoom}
                handleResign={handleResign}
                handleDraw={handleDraw}
            />

            <PlayerInfo
                username={guestname}
                avatar={guestAvatar}
                cups={guestCups}
                ready={guestReady}
            />
        </div>
    );
};

export default React.memo(PlayerBox);
