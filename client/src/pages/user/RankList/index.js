import { CircularProgress, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { axiosUser } from '../../../api/axiosUser';
import { useAuthContext } from '../../../context/AuthContext';
import RankItem from './RankItem';
import './styles.scss';

const RankList = () => {
    const { authData } = useAuthContext();
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const resUserList = await axiosUser.get('/users');
                const formatedUserList = resUserList
                    .slice(0, 20)
                    .map((user) => ({
                        avatar: user.avatar,
                        username: user.username,
                        cups: user.cups,
                        total: user.total,
                    }))
                    .filter((user) => user.username !== 'admin')
                    .sort((a, b) => b.cups - a.cups);

                setUserList(formatedUserList);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="rank-list">
            <Typography color="primary" className="header">
                Rank
            </Typography>
            {loading ? (
                <CircularProgress size={25} thickness={4} color="white" />
            ) : (
                <div className="container">
                    <RankItem
                        isUser={true}
                        user={authData.userInfo}
                        index={userList.findIndex(
                            (user) => authData.userInfo.username === user.username,
                        )}
                    />
                    {userList.map((user, index) => (
                        <RankItem key={user.username} user={user} index={index} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RankList;
