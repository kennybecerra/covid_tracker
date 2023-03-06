import { Column, Line, Pie, type LineConfig } from '@ant-design/plots';
import {
  type ColumnConfig,
  type PieConfig,
} from '@ant-design/plots/es/interface';
import { Col, Row } from 'antd';
import dayjs from 'dayjs';
import * as React from 'react';
import { KPI, KPIC, KPID } from 'src/components/KPI/KPIs';
import Tile from 'src/components/Tile';
import { type HistoricalCountryData } from 'src/redux/features/historical';
import { useAppSelector } from '../../../redux/store';
import { type TabKeys } from '../Home';
import './MiddleSection.scss';
interface MiddleSectionIProps {
  activeKey: TabKeys;
}

interface LinePoint {
  date: number;
  value: number;
  category: 'cases' | 'deaths' | 'recovered';
}

const MultiLineTransformData: (data: HistoricalCountryData) => LinePoint[] = (
  data
) => {
  const dataMap: LinePoint[] = [];

  if (data?.timeline) {
    (['cases', 'deaths', 'recovered'] as const).forEach((key) => {
      Object.entries(data.timeline?.[key] ?? []).forEach((item) => {
        const [date, amount] = item as [string, number];

        const current = dayjs(date, 'MM/DD/YY');
        if (current.isValid()) {
          dataMap.push({
            date: current.valueOf(),
            value: amount,
            category: key,
          });
        }
      });
    });

    return dataMap;
  }

  return [];
};

const MiddleSection: React.FC<MiddleSectionIProps> = ({ activeKey }) => {
  const { data } = useAppSelector((state) => state.country);
  const { data: historicalData } = useAppSelector((state) => state.historical);

  const isLoading = !data;

  const donutConfig: PieConfig = {
    autoFit: true,
    loading: isLoading,
    appendPadding: 10,
    data: [
      { type: 'Deaths', value: data?.deathsPerOneMillion ?? 0 },
      { type: 'Critical', value: data?.casesPerOneMillion ?? 0 },
      { type: 'Recovered', value: data?.recoveredPerOneMillion ?? 0 },
    ],
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.7,
    animation: true,
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: '',
      },
    },
  };

  const lineConfig: LineConfig = {
    autoFit: true,
    animation: true,
    loading: !historicalData,
    data: historicalData ? MultiLineTransformData(historicalData) : [],
    xField: 'date',
    yField: 'value',
    seriesField: 'category',
    xAxis: {
      type: 'time',
    },
    yAxis: {
      label: {},
    },
  };

  const ColumnConfig: ColumnConfig = {
    data: [
      { type: 'Deaths', value: data?.deaths ?? 0 },
      { type: 'Critical', value: data?.cases ?? 0 },
      { type: 'Recovered', value: data?.recovered ?? 0 },
    ],
    xField: 'type',
    yField: 'value',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  return (
    <Row className='middleSection' gutter={[0, 8]} wrap={false}>
      <Col>
        <Row className='height-100' gutter={[8, 8]}>
          <Col xs={24} lg={8}>
            <Row gutter={[8, 0]}>
              <Col xs={8}>
                <KPI
                  title='critical'
                  amount={data?.critical ?? 0}
                  isLoading={isLoading}
                />
              </Col>
              <Col xs={8}>
                <KPI
                  title='recovered'
                  amount={data?.recovered ?? 0}
                  isLoading={isLoading}
                />
              </Col>
              <Col xs={8}>
                <KPI
                  title='deaths'
                  amount={data?.deaths ?? 0}
                  isLoading={isLoading}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} lg={8}>
            <KPIC
              items={[
                {
                  isLoading,
                  title: 'Critical/Mill',
                  amount: data?.criticalPerOneMillion ?? 0,
                },
                {
                  isLoading,
                  title: 'Recovered/Mill',
                  amount: data?.recoveredPerOneMillion ?? 0,
                },
                {
                  isLoading,
                  title: 'Deaths/Mill',
                  amount: data?.deathsPerOneMillion ?? 0,
                },
              ]}
            />
          </Col>
          <Col xs={24} lg={8}>
            <KPID
              items={[
                {
                  isLoading,
                  title: 'Country',
                  value: data?.country ?? '',
                },
                {
                  isLoading,
                  title: 'Population',
                  value: data?.population ?? 0,
                },
                {
                  isLoading,
                  title: 'Last Update',
                  value: dayjs(data?.updated ?? 0).format('MM/DD/YYYY'),
                },
              ]}
            />
          </Col>
        </Row>
      </Col>
      <Col>
        <Row gutter={[8, 8]} className='height-100'>
          <Col xs={8} className='height-100'>
            <Tile style={{ padding: 10 }}>
              <Pie {...donutConfig} />
            </Tile>
          </Col>
          <Col xs={16} className='height-100'>
            <Tile style={{ padding: 10 }}>
              <Column {...ColumnConfig} />
            </Tile>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row className='height-100'>
          <Col xs={24} className='height-100'>
            <Tile style={{ padding: 10 }}>
              <Line {...lineConfig} />
            </Tile>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MiddleSection;
