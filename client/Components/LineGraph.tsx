import React, { useEffect } from "react";
import { FC, useState } from 'react';
import { Line } from 'react-chartjs-2';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData, 
  CartesianScaleOptions,
  CartesianScaleTypeRegistry,
  CoreScaleOptions,
  Filler,
} from 'chart.js';
import { time } from "console";
import { setConstantValue } from "typescript";
import { linearBuckets } from "prom-client";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);



type MetricProps = {
  query: string,
  label: string,
  backgroundColor: string,
  borderColor: string,
  yAxisType: string,
}

const initialData: ChartData<'line'> = {
  datasets: [],
}


const LineGraph: FC<MetricProps> = (props) => {
  const [chartLoaded, setChartLoaded] = useState(false);
  const [data, setData] = useState(initialData);
  // const scales: CartesianScaleOptions = {
  //   bounds: 'ticks',
  //   position: 'left',
  //   axis: 'y',
  //   min: 0,
  //   max: 3,
  //   offset: true,
  //   grid: GridLineOptions,
  //   title: {
  //     /** If true, displays the axis title. */
  //     display: true,
  //     /** Alignment of the axis title. */
  //     align: start,
  //     /** The text for the title, e.g. "# of People" or "Response Choices". */
  //     text: 'POOOOP!';
  //     /** Color of the axis label. */
  //     color: Color;
  //     /** Information about the axis title font. */
  //     font: ScriptableAndScriptableOptions<Partial<FontSpec>, ScriptableCartesianScaleContext>;
  //     /** Padding to apply around scale labels. */
  //     padding: number | {
  //       /** Padding on the (relative) top side of this axis label. */
  //       top: number;
  //       /** Padding on the (relative) bottom side of this axis label. */
  //       bottom: number;
  //       /** This is a shorthand for defining top/bottom to the same values. */
  //       y: number;
  //     };
  //   };

    // y: [{
    //   display: true,
    //   scaleLabel: {
    //     display: true,
    //     labelString: 'Percent' // will update with logic based on yAxisType later
    //   }
    // }]
  // }
  // <'line'> <--- add this?

 

  const options: ChartOptions<'line'> = {
    animation: {
      easing: "easeInCubic",
      duration: 1200,
      // delay: 2000,
    },
    responsive: true,
    interaction: {
      intersect: false
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '',
      },
      filler: {
        drawTime: 'beforeDatasetsDraw',
        propagate: true,
      }
    },
    scales: { // <-- ScaleChartOptions
      y: {  // <-- ScaleOptionsByType
        display: true, // <-- any options within CartesianScaleTypeRegistry
        // labels: ['hello', 'world'],
        axis: 'y',
        title: {
          display: true,
          text: props.yAxisType,
        },
        grid: {
          // display: true,
          // color: 'rbga(252,252,252, 0.5)', 
        }
      },
      x: {  // <-- ScaleOptionsByType
        display: true, // <-- any options within CartesianScaleTypeRegistry
    
        axis: 'y',
        title: {
          display: true,
          text: 'Time',
        },
        grid: {
          // display: true,
          // color: 'default', 
        }
      },
    }
  }

  // export interface CoreScaleOptions {
  //   /**
  //    * Controls the axis global visibility (visible when true, hidden when false). When display: 'auto', the axis is visible only if at least one associated dataset is visible.
  //    * @default true
  //    */
  //   display: boolean | 'auto';
  //   /**
  //    * Align pixel values to device pixels
  //    */
  //   alignToPixels: boolean;
  //   /**
  //    * Reverse the scale.
  //    * @default false
  //    */
  //   reverse: boolean;
  //   /**
  //    * The weight used to sort the axis. Higher weights are further away from the chart area.
  //    * @default true
  //    */
  //   weight: number;
  //   /**
  //    * Callback called before the update process starts.
  //    */
  //   beforeUpdate(axis: Scale): void;
  //   /**
  //    * Callback that runs before dimensions are set.
  //    */
  //   beforeSetDimensions(axis: Scale): void;
  //   /**
  //    * Callback that runs after dimensions are set.
  //    */
  //   afterSetDimensions(axis: Scale): void;
  //   /**
  //    * Callback that runs before data limits are determined.
  //    */
  //   beforeDataLimits(axis: Scale): void;
  //   /**
  //    * Callback that runs after data limits are determined.
  //    */
  //   afterDataLimits(axis: Scale): void;
  //   /**
  //    * Callback that runs before ticks are created.
  //    */
  //   beforeBuildTicks(axis: Scale): void;
  //   /**
  //    * Callback that runs after ticks are created. Useful for filtering ticks.
  //    */
  //   afterBuildTicks(axis: Scale): void;
  //   /**
  //    * Callback that runs before ticks are converted into strings.
  //    */
  //   beforeTickToLabelConversion(axis: Scale): void;
  //   /**
  //    * Callback that runs after ticks are converted into strings.
  //    */
  //   afterTickToLabelConversion(axis: Scale): void;
  //   /**
  //    * Callback that runs before tick rotation is determined.
  //    */
  //   beforeCalculateLabelRotation(axis: Scale): void;
  //   /**
  //    * Callback that runs after tick rotation is determined.
  //    */
  //   afterCalculateLabelRotation(axis: Scale): void;
  //   /**
  //    * Callback that runs before the scale fits to the canvas.
  //    */
  //   beforeFit(axis: Scale): void;
  //   /**
  //    * Callback that runs after the scale fits to the canvas.
  //    */
  //   afterFit(axis: Scale): void;
  //   /**
  //    * Callback that runs at the end of the update process.
  //    */
  //   afterUpdate(axis: Scale): void;
  // }

  // export interface CartesianScaleOptions extends CoreScaleOptions {
  //   /**
  //    * Scale boundary strategy (bypassed by min/max time options)
  //    * - `data`: make sure data are fully visible, ticks outside are removed
  //    * - `ticks`: make sure ticks are fully visible, data outside are truncated
  //    * @since 2.7.0
  //    * @default 'ticks'
  //    */
  //   bounds: 'ticks' | 'data';
  
  //   /**
  //    * Position of the axis.
  //    */
  //   position: 'left' | 'top' | 'right' | 'bottom' | 'center' | { [scale: string]: number };
  
  //   /**
  //    * Stack group. Axes at the same `position` with same `stack` are stacked.
  //    */
  //   stack?: string;
  
  //   /**
  //    * Weight of the scale in stack group. Used to determine the amount of allocated space for the scale within the group.
  //    * @default 1
  //    */
  //   stackWeight?: number;
  
  //   /**
  //    *   Which type of axis this is. Possible values are: 'x', 'y'. If not set, this is inferred from the first character of the ID which should be 'x' or 'y'.
  //    */
  //   axis: 'x' | 'y';
  
  //   /**
  //    * User defined minimum value for the scale, overrides minimum value from data.
  //    */
  //   min: number;
  
  //   /**
  //    * User defined maximum value for the scale, overrides maximum value from data.
  //    */
  //   max: number;
  
  //   /**
  //    *   If true, extra space is added to the both edges and the axis is scaled to fit into the chart area. This is set to true for a bar chart by default.
  //    * @default false
  //    */
  //   offset: boolean;
  
  //   grid: GridLineOptions;
  
  //   /** Options for the scale title. */
  //   title: {
  //     /** If true, displays the axis title. */
  //     display: boolean;
  //     /** Alignment of the axis title. */
  //     align: Align;
  //     /** The text for the title, e.g. "# of People" or "Response Choices". */
  //     text: string | string[];
  //     /** Color of the axis label. */
  //     color: Color;
  //     /** Information about the axis title font. */
  //     font: ScriptableAndScriptableOptions<Partial<FontSpec>, ScriptableCartesianScaleContext>;
  //     /** Padding to apply around scale labels. */
  //     padding: number | {
  //       /** Padding on the (relative) top side of this axis label. */
  //       top: number;
  //       /** Padding on the (relative) bottom side of this axis label. */
  //       bottom: number;
  //       /** This is a shorthand for defining top/bottom to the same values. */
  //       y: number;
  //     };
  //   };
  
  //   /**
  //    *   If true, data will be comprised between datasets of data
  //    * @default false
  //    */
  //   stacked?: boolean | 'single';
  
  //   ticks: CartesianTickOptions;
  // }
  
  useEffect(() => {
    fetch(props.query)
    .then(res => res.json())
    .then(data => {
      // removes unnecessary data
      const usefulData = data.data.result[0].values;
      console.log('usefulData', usefulData);
      // creates a date display when the day changes
      let displayDate = true;
      let prevDate = '';
      // maps the xAxis label
      const xAxisLabels = usefulData.map((value: [number, string]) => {
        // logic for converting timestamp to human-readable time
        const currentDate = new Date(value[0] * 1000);
        let timeString = currentDate.toLocaleString('en-GB');
        // if (timeString.slice(0, 10) !== prevDate.slice(0,10)) displayDate = true;
        // prevDate = timeString;
        // if (!displayDate) {
          const iOfComma = timeString.indexOf(',') + 1;
          timeString = timeString.slice(iOfComma).trim();
        // }
        // displayDate = false;
        return timeString;
      });
      console.log('xAxisLabels:', xAxisLabels)
      console.log('Useful data:', usefulData);
      console.log(props.yAxisType)
      let yAxisValues: number[] = []       
      switch(props.yAxisType) {
        case 'gigabytes': 
          yAxisValues = usefulData.map((value: [number, string]) => Number(value[1]) / 1000000000)
          break;
        // case 'percent':
        //   yAxisValues = usefulData.map((value: [number, string]) => Number(value[1]))
        default:
          yAxisValues = usefulData.map((value: [number, string]) => Number(value[1]))
      }

      console.log('yAxisValues', yAxisValues);
      const newData: ChartData<'line'> = {
        labels: xAxisLabels,
        datasets: [{
          label: props.label,
          data: yAxisValues,
          backgroundColor: props.backgroundColor,
          borderColor: props.borderColor,
          borderWidth: 1.5,
          pointRadius: 1,
          tension: 0.3,
          pointBorderWidth: 1,
          pointHoverRadius: 4,
          fill: true,
          capBezierPoints: true,
        }]
      }
      setData(newData);
      // setOptions(newOptions);
      setChartLoaded(true);
    })
    .catch(err => console.log(err));
  }, [])

  // demos 1 sec load, comment out lines 102, 103, and or statement in 105 to remove
  const [oneSecPassed, setOneSecPassed] = useState(false);
  setTimeout(() => setOneSecPassed(true), 1000);
  
  if (!chartLoaded || !oneSecPassed) {
    return (
      <div className="loading">
        < CircularProgress />
      </div>
    )
  } else {  
    return (
      <div className="graph">
        < Line options={options} data={data} />
      </div>
    )
  }
}

export default LineGraph;



