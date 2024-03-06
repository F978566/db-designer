import React, { Suspense} from 'react';
import ColumnList from './ColumnList/ColumnList';

const Column = ({ table_id }) => {
    return (
        <div>
            <Suspense fallback={<p>Loading...</p>}>
                <ColumnList table_id={table_id} />
            </Suspense>
        </div>
    )
}

export default React.memo(Column);