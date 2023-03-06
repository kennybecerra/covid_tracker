import { Statistic } from 'antd';
import React from 'react';
import CountUp from 'react-countup';
import './KPI.scss';

interface IKPI {
  title: string;
  amount: number;
  isLoading: boolean;
}

const formatter = (value: number) => (
  <CountUp end={value} separator=',' duration={1} />
);

export const KPI = ({ title, amount, isLoading }: IKPI) => {
  return (
    <div className={'KPI'}>
      <Statistic
        loading={isLoading}
        title={title}
        value={amount}
        formatter={formatter}
      />
    </div>
  );
};

interface IKPIC {
  items: IKPI[];
}

export const KPIC = ({ items }: IKPIC) => {
  return (
    <div className={'KPIC'}>
      {items?.map(({ isLoading, title, amount }) => {
        return (
          <Statistic
            key={title}
            loading={isLoading}
            title={title}
            value={amount}
            formatter={formatter}
          />
        );
      })}
    </div>
  );
};

interface IKPID {
  items: Array<{ title: string; value: number | string; isLoading: boolean }>;
}

export const KPID = ({ items }: IKPID) => {
  return (
    <div className={'KPID'}>
      {items?.map(({ isLoading, title, value }) => {
        return (
          <Statistic
            key={title}
            loading={isLoading}
            title={title}
            value={value}
            formatter={typeof value === 'number' ? formatter : undefined}
          />
        );
      })}
    </div>
  );
};
