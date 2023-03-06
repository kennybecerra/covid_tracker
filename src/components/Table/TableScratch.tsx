import * as React from 'react';
import { debounce, throttle } from '../../utility/utility';
import styles from './Table.module.scss';

interface columnProps {
  title: string;
  key: string;
  transform?: () => any;
}

interface TableProps {
  data: any[] | undefined;
  rowKey: string;
  rowHeight?: number;
  columns?: columnProps[];
}

export interface VTableProps {
  data: any[] | undefined;
  rowKey: string;
  rowHeight?: number;
  columns?: columnProps[];
}

export interface VTableState {}

class VTable extends React.PureComponent<VTableProps, VTableState> {
  state = {
    range: [0, 20],
  };

  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(event) {
    const { offsetHeight, offsetTop, scrollTop, scrollHeight } = event.target;
    const rowsInView = Math.round(offsetHeight / this.props.rowHeight);
    const percentage = parseFloat(
      (
        Math.round(
          ((scrollTop + offsetHeight - offsetTop) / scrollHeight) * 1000
        ) / 1000
      ).toFixed(4)
    );
    const rowsShown = Math.round(
      (scrollHeight * percentage) / this.props.rowHeight
    ); // Approximate index of last row shown in the view
    const thresholdRows = rowsInView;
    const min = Math.max(rowsShown - rowsInView - thresholdRows, 0);
    const max = Math.min(
      rowsShown - 2 + thresholdRows,
      this.props.data.length - 1
    );

    if (min !== this.state.range[0] || max !== this.state.range[1]) {
      console.log([min, max]);
      requestAnimationFrame(() => {
        this.setState({
          range: [min, max],
        });
      });
    }
  }

  render() {
    const transformedData = this.props.data.map((item, i) => {
      item._index = i;
      return item;
    });

    const innerHeight = (this.props.data.length + 1) * this.props.rowHeight;

    return (
      <div className={styles.table} onScroll={this.handleScroll}>
        <div
          className={styles.inner}
          style={{
            height: `${innerHeight}px`,
          }}>
          <div
            className={styles.headerRow}
            style={{ position: 'sticky', top: 0 }}>
            {this.props.columns.map(({ title }, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.cell}`}
                  style={{
                    minHeight: this.props.rowHeight,
                  }}>
                  <span className={styles.text}>{title}</span>
                </div>
              );
            })}
          </div>
          {this.props.data.length > 0 &&
            transformedData
              .slice(this.state.range[0], this.state.range[1] + 1)
              .map((row) => {
                return (
                  <div
                    key={row[this.props.rowKey]}
                    className={styles.row}
                    style={{
                      position: 'absolute',
                      top: `${(row._index + 1) * this.props.rowHeight}px`,
                      minHeight: this.props.rowHeight,
                      height: this.props.rowHeight,
                    }}>
                    {this.props.columns.map(({ key }, columnIndex) => {
                      return (
                        <div className={styles.cell} key={columnIndex}>
                          <span className={styles.text}>
                            {typeof row[key] !== 'object'
                              ? row[key]
                              : row._index}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
        </div>
      </div>
    );
  }
}

const Table: React.FC<TableProps> = ({
  data,
  rowKey,
  rowHeight = 50,
  columns = [],
}) => {
  let numRows = 0;

  if (typeof data === 'object' && Array.isArray(data) && data.length > 0) {
    columns =
      data && Array.isArray(data[0])
        ? data[0]
        : Object.keys(data[0]).map((item) => {
            return {
              key: item,
              title: item,
            };
          });
    numRows = data.length;
  }
  const ref = React.useRef<HTMLDivElement>(null);

  const innerHeight = (numRows + 1) * rowHeight;
  const transformedData = React.useMemo(() => {
    return data.map((item, i) => {
      item._index = i;
      return item;
    });
  }, [data]);

  const [[lower, upper], setState] = React.useState([0, 20]);

  const handleScroll = React.useCallback(
    (event) => {
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
      const thresholdRows = rowsInView;
      const min = Math.max(rowsShown - rowsInView - thresholdRows, 0);
      const max = Math.min(rowsShown - 2 + thresholdRows, data.length - 1);
      if (min !== lower || max !== upper) {
        console.log([min, max]);
        requestAnimationFrame(() => {
          setState([min, max]);
        });
      }
    },
    [rowHeight, data]
  );

  React.useEffect(() => {
    ref.current && ref.current.addEventListener('scroll', handleScroll);
    return () => {
      ref.current && ref.current.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div ref={ref} className={styles.table}>
      <div
        className={styles.inner}
        style={{
          height: `${innerHeight}px`,
        }}>
        <div
          className={styles.headerRow}
          style={{ position: 'sticky', top: 0 }}>
          {columns.map(({ title }, index) => {
            return (
              <div
                key={index}
                className={`${styles.cell}`}
                style={{
                  minHeight: rowHeight,
                }}>
                <span className={styles.text}>{title}</span>
              </div>
            );
          })}
        </div>
        {data.length > 0 &&
          transformedData.slice(lower, upper + 1).map((row) => {
            return (
              <div
                key={row[rowKey]}
                className={styles.row}
                style={{
                  position: 'absolute',
                  top: `${(row._index + 1) * rowHeight}px`,
                  minHeight: rowHeight,
                  height: rowHeight,
                }}>
                {columns.map(({ key }, columnIndex) => {
                  return (
                    <div className={styles.cell} key={columnIndex}>
                      <span className={styles.text}>
                        {typeof row[key] !== 'object' ? row[key] : row._index}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default VTable;
