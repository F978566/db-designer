import DeleteButton from '../../../../ui/DeleteButton/DeleteButton';
import AddColumn from '../../Columns/AddColumn/AddColumn';
import EditTable from '../EditTable/EditTable';
import EstablishRelationship from '../../Establishrelationship/EstablisRelationship';
import { TableService } from '../../../../../services/Tabels.service';
import styles from './MovableTable.module.css';


const ButtonSetForMovableTable = ({ refetch, table, isMovable }) => {

    const DeleteTable = async () => {
        await TableService.deleteTable({table_id: table.id});
        refetch();
    };

    const toggleIsMovable = (dialogWindowIsOpen) =>{
        isMovable.current = !dialogWindowIsOpen;
    };

    return (
        <div className={styles.buttonsSet}>
            <li>
                <DeleteButton onClick={DeleteTable} />
            </li>
            <li>
                <AddColumn toggleIsMovable={toggleIsMovable} table_id={table.id} />
            </li>
            <div className={styles.editTableDiv}>
                <li>
                    <EditTable toggleIsMovable={toggleIsMovable} table_id={table.id}/>
                </li>
            </div>
            <div className={styles.editTableDiv}>
                <li>
                    <EstablishRelationship toggleIsMovable={toggleIsMovable} table_id={table.id}/>
                </li>
            </div>
        </div>
    )
};


export default ButtonSetForMovableTable;