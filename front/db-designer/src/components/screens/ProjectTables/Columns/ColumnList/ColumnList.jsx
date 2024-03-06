import React from 'react';
import { useQuery } from 'react-query';
import { ColumnService } from '../../../../../services/Column.service';
import ColumnItem from './Column/Column';

const ColumnList = ({ table_id }) => {
    const { data } = useQuery(
        {
            queryKey: ['columns', table_id],
            queryFn: async () => await ColumnService.getColumnsByTable(table_id),
        }
    )

    return (
        <div>
            {
                data?.length ? data.map(column => (
                    <ColumnItem key={column.id} columnData={column}/>
                )) : <p>There are no columns</p>
            }
        </div>
    )
}


export default React.memo(ColumnList);