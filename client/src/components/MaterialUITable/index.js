import React from 'react';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'First Name',
        selector: 'first_name',
        sortable: true,
    },
    {
        name: 'Last Name',
        selector: 'last_name',
        sortable: true,
    },
    {
        name: 'Email',
        selector: 'email',
        sortable: true,
    },
];

const MaterialUITable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    return (
        <DataTable
            title="Users"
            columns={columns}
            data={data}
            progressPending={loading}
            selectableRows
        />
    );
};

export default MaterialUITable;
