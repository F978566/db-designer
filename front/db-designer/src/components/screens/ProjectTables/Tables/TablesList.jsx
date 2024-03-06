import React, { useRef } from 'react';
import { useQuery } from 'react-query';
import { TableService } from '../../../../services/Tabels.service';
import MovableTable from './MovableTable/MovableTable';
import DrawRelationships from '../DrawRelationships/DrawRelationships';
import { Xwrapper } from 'react-xarrows';
import { useSelector } from 'react-redux';
import { projectSelector } from '../../../../reducers/project';


const TablesList = () => {
    const project_id = useSelector(projectSelector);
    const { data, isLoading, refetch } = useQuery(
        {
            queryKey: ['tables', project_id],
            queryFn: async () => await TableService.getTables({ project_id }),
            refetchOnWindowFocus: true,
            staleTime: 0,
            cacheTime: 0,
            refetchInterval: 0,
        }
    );

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <Xwrapper>
            {
                data?.length ? data.map(table => (
                    <MovableTable
                        refetch={refetch}
                        table={table}
                        key={table.id}
                    />
                )) : <p>There is no tables</p>
            }
            <DrawRelationships />
        </Xwrapper>
    )
}


export default TablesList;