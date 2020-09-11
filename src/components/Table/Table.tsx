import * as React from 'react';
import { AutoSizer, Table as VTable, Column } from 'react-virtualized';
import styles from './Table.module.scss';

export interface TableProps {
  data: any[];
}

const Table: React.SFC<TableProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      <AutoSizer>
        {({ height, width }) => (
          <VTable
            height={height}
            width={width}
            gridClassName={styles.table}
            headerHeight={50}
            rowHeight={50}
            headerClassName={styles.headerCell}
            rowClassName={({ index }) =>
              index === -1 ? styles.headerRow : styles.row
            }
            rowCount={data.length}
            rowGetter={({ index }) => data[index]}>
            <Column
              label='Name'
              dataKey='name'
              width={100}
              className={styles.cell}
            />
            <Column
              label='Population'
              dataKey='population'
              width={100}
              className={styles.cell}
            />
            <Column
              label='Last Update'
              dataKey='updated_at'
              width={100}
              className={styles.cell}
            />
            <Column
              label='Deaths'
              dataKey='deaths'
              width={100}
              className={styles.cell}
            />
            <Column
              label='Confirmed'
              dataKey='confirmed'
              width={100}
              className={styles.cell}
            />
            <Column
              label='Active'
              dataKey='critical'
              width={100}
              className={styles.cell}
            />
            <Column
              label='Recovered'
              dataKey='recovered'
              width={100}
              flexGrow={1}
              className={styles.cell}
            />
          </VTable>
        )}
      </AutoSizer>
    </div>
  );
};

const MemoizedTable = React.memo(Table);

export default MemoizedTable;
