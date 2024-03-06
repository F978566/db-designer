import React, { useRef } from 'react';
import { useXarrow } from 'react-xarrows';
import Columns from '../../Columns/Columns';
import styles from './MovableTable.module.css';
import ButtonSetForMovableTable from './ButtonSetForMovableTable';
import useDragble from './useDragble';


const MovableTable = ({ refetch, table }) => {
    const { position, handleMouseDown } = useDragble();
    const isMovable = useRef(true);
    const updateXarrow = useXarrow()

    return (
        <div
            onMouseDown={(e) => handleMouseDown(e, isMovable)}
            className={styles.draggable}
            style={{ left: position.x + 'px', top: position.y + 'px' }}
            id={table.id+''}
        >
            <p>{ table.name }</p>
            <hr />
            <Columns table_id={table.id}/>
            <ButtonSetForMovableTable refetch={refetch} table={table} isMovable={isMovable}/>
        </div>
    )
}


export default React.memo(MovableTable);