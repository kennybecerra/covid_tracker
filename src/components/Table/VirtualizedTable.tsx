import * as React from 'react';
import { debounce, throttle } from '../../utility/utility';
import styles from './VirtualizedTable.module.scss';

interface columnProps {
  title: string;
  key: string;
  transform?: (val: any) => any;
}

interface TableProps {
  data: any[] | undefined;
  rowKey: string;
  columns: columnProps[];
  minCellWidth: number;
  rowHeight?: number;
  thresholdRows?: number;
  sorter?: (
    key: string,
    forward: boolean,
    first: string,
    second: string
  ) => -1 | 1 | 0;
}

const Table: React.FC<TableProps> = ({
  data,
  rowKey,
  rowHeight = 50,
  minCellWidth = 50,
  columns = [],
  thresholdRows = 5,
  sorter,
}) => {
  const [[lower, upper], setState] = React.useState<[number, number]>([0, 20]);
  const [isScrolling, setIsScrolling] = React.useState<boolean>(false);
  const [sortColumn, setSortColumn] = React.useState<{
    key: string;
    forward: boolean;
  }>({
    key: '',
    forward: false,
  });

  const updateScrollFlag = debounce(
    () => {
      // console.log('This ran');
      setIsScrolling(false);
    },
    100,
    { trailing: true }
  );

  const innerHeight = (data.length + 1) * rowHeight;

  const transformedData = React.useMemo(() => {
    return [...data]
      .sort((a, b) => {
        if (sorter && sortColumn?.key.length > 0) {
          return sorter(
            sortColumn.key,
            sortColumn.forward,
            a[sortColumn.key],
            b[sortColumn.key]
          );
        }
        return 0;
      })
      .map((item, i) => {
        item._index = i;
        return item;
      })
      .map((row) => {
        return (
          <div
            key={row[rowKey]}
            className={styles.row}
            style={{
              position: 'absolute',
              top: `${(row._index + 1) * rowHeight}px`,
              minHeight: rowHeight,
              height: rowHeight,
              width: '100%',
              minWidth: `${columns.length * minCellWidth}px`,
            }}>
            {columns.map(({ title, key, transform }, columnIndex) => {
              return (
                <MemoizedCell
                  key={title}
                  rowHeight={rowHeight}
                  minCellWidth={minCellWidth}
                  title={transform ? transform(row[key]) : row[key]}
                />
              );
            })}
          </div>
        );
      });
  }, [
    data,
    columns,
    minCellWidth,
    rowHeight,
    rowKey,
    sortColumn.key,
    sortColumn.forward,
    sortColumn,
  ]);

  const handleScroll = React.useCallback(
    (event) => {
      // event.stopPropagation();
      const { offsetHeight, offsetTop, scrollTop, scrollHeight } = event.target;
      const rowsInView = Math.round(offsetHeight / rowHeight);
      const percentage = parseFloat(
        (
          Math.round(
            ((scrollTop + offsetHeight - offsetTop) / scrollHeight) * 1000
          ) / 1000
        ).toFixed(4)
      );
      const rowsShown = Math.round((scrollHeight * percentage) / rowHeight); // Approximate index of last row shown in the view
      const min = Math.max(rowsShown - rowsInView - thresholdRows, 0);
      const max = Math.min(rowsShown - 2 + thresholdRows, data.length - 1);

      if (isScrolling) {
        updateScrollFlag();
      } else {
        setIsScrolling(true);
      }

      setState((prevState) => {
        if (min !== prevState[0] || max !== prevState[1]) {
          // console.log([min, max]);
          return [min, max];
        }
        return prevState;
      });
    },
    [rowHeight, data, thresholdRows, isScrolling]
  );

  let rows = [];
  for (let i = lower; i <= upper; i++) {
    rows.push(transformedData[i]);
  }

  return (
    <div className={styles.container}>
      <div className={styles.table} onScroll={handleScroll}>
        <div
          className={styles.inner}
          style={{
            height: `${innerHeight}px`,
            pointerEvents: isScrolling ? 'none' : 'auto',
          }}>
          <div
            className={styles.headerRow}
            style={{
              position: 'sticky',
              top: 0,
              width: '100%',
              minWidth: `${columns.length * minCellWidth}px`,
            }}>
            {columns.map(({ title, key }, index) => {
              return (
                <MemoizedCell
                  key={index}
                  title={title}
                  rowHeight={rowHeight}
                  minCellWidth={minCellWidth}
                  onClick={() => {
                    setSortColumn((prev) => {
                      return {
                        key: key,
                        forward: !prev.forward,
                      };
                    });
                  }}
                />
              );
            })}
          </div>
          {rows}
        </div>
      </div>
    </div>
  );
};

interface CellIProps {
  rowHeight: number;
  title: string;
  key: string | number;
  minCellWidth: number;
  onClick?: () => void;
}

const Cell: React.FC<CellIProps> = (props) => {
  const { rowHeight, title, minCellWidth, onClick } = { ...props };
  return (
    <div
      className={`${onClick ? styles.clickableCell : styles.cell}`}
      onClick={onClick}
      style={{
        minHeight: rowHeight,
        flex: `1 0 ${minCellWidth}px`,
      }}>
      {title}
    </div>
  );
};

const MemoizedCell = React.memo(Cell);

const memoizedTable = React.memo(Table);
export default memoizedTable;
