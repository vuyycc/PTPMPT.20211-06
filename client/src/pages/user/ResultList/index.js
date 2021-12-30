import React, { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { axiosUser } from '../../../api/axiosUser';
import { useAuthContext } from '../../../context/AuthContext';

const ResultList = () => {
    const { authData } = useAuthContext();
    const [boardList, setBoardList] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = useMemo(
        () => [
            {
                name: 'BoardID',
                selector: 'boardId',
                sortable: true,
            },
            {
                name: 'Hostname',
                selector: 'hostname',
                sortable: true,
            },
            {
                name: 'Guestname',
                selector: 'guestname',
                sortable: true,
            },
            {
                name: 'Resutls',
                selector: 'winner',
                sortable: true,
                cell: (row) => (
                    <div>{row.winner === authData.userInfo.userId ? 'WIN' : 'LOSE'}</div>
                ),
            },
            {
                name: 'Time',
                selector: 'createdAt',
                sortable: true,
            },
        ],
        [authData],
    );

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                setLoading(true);
                const res = await axiosUser.get('/boards');

                console.log(res);
                setBoardList(res.data.boardList);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBoards();
    }, []);

    return (
        <div>
            <h1>Results</h1>
            <DataTable
                title="Results"
                columns={columns}
                data={boardList}
                progressPending={loading}
                selectableRows
            />
        </div>
    );
};

export default ResultList;
