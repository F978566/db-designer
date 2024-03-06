import styles from './Column.module.css';

const ColumnItem = ({ columnData }) => {
    return (
        <div className={styles.column}>
            <p className={styles.columnName}>{columnData.name}</p>
        </div>
    )
}

export default ColumnItem;