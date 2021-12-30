import { GroupRounded } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import socket from '../../commons/socket';
import Header from '../Header';
import OnlineDialog from '../OnlineDialog';
import './styles.scss';

const Layout = ({ children, location }) => {
    const [openOnline, setOpenOnline] = useState(false);
    const history = useHistory();

    useEffect(() => {
        socket.emit('online');
    }, []);

    useEffect(() => {
        socket.on('inviteReq', (data) => {
            console.log(data);
            Swal.fire({
                icon: 'question',
                title: 'Invitation',
                text: `${data.hostname} invited you to join room ${data.roomId}`,
                showConfirmButton: true,
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    history.push(`/room?roomId=${data.roomId}&password=${data.password}`);
                }
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const handleOpenOnline = () => {
        setOpenOnline(true);
    };

    const handleCloseOnline = () => {
        setOpenOnline(false);
    };

    return (
        <div className="layout">
            <Header />
            {children}
            <div className="online-user">
                <GroupRounded onClick={handleOpenOnline} className="btn-online-user" />
                <OnlineDialog openOnline={openOnline} handleCloseOnline={handleCloseOnline} />
            </div>
        </div>
    );
};

export default Layout;
