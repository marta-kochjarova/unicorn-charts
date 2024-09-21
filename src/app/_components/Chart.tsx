"use client";

import { useEffect, useRef } from 'react';
import { Chart as G2Chart } from '@antv/g2';
import customTokens from '../AntCustomTokens';

interface DataItem {
  [key: string]: any;
}

interface ChartProps {
  data: DataItem[];
  type: 'line' | 'bar';
}

const Chart = ({ data, type }: ChartProps) => {
  const chartContainer = useRef<HTMLDivElement>(null);

  const chartType = (chart: G2Chart) => {
     switch (type) {
       case 'line':
         return chart.line().style('stroke', customTokens.token.colorPrimary).style('lineWidth', 3);
       case 'bar':
         return chart.interval().style('fill', customTokens.token.colorPrimary).style('fillOpacity', 0.7);
       default:
         return undefined;
     }
   };
  

  useEffect(() => {
    if (chartContainer.current) {
      const chart = new G2Chart({
        container: chartContainer.current,
        autoFit: true,
        height: 450,
      });

      const keys = Object.keys(data[0]);
      const xField = keys[0];
      const yField = keys[1];

      chart.data(data);

      chart.encode('x', xField).encode('y', yField);

      chartType(chart);
        

      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [data]);

  return <div ref={chartContainer} />;
};

export default Chart;
