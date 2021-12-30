import { EditButton, TopToolbar } from 'react-admin';

const PostShowActions = ({ basePath, data, resource }) => {
    return (
        <TopToolbar>
            <EditButton basePath={basePath} record={data} />
            {/* Add your custom actions */}
        </TopToolbar>
    );
};

export default PostShowActions;
