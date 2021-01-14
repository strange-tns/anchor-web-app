import { pressed } from '@anchor-protocol/styled-neumorphism';
import {
  Children,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useMemo,
} from 'react';
import styled from 'styled-components';
import useResizeObserver from 'use-resize-observer/polyfilled';

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const padding: number = 2;
const defaultBarHeight: number = 14;
const defaultBoxRadius: number = 7;

export interface HorizontalGraphBarProps<T>
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  /** Graph minimum value (bar start point) */
  min: number;

  /** Graph maximum value (bar end point) */
  max: number;

  /** Data */
  values: T[];

  /**
   * Render labels (create label react elements) it will call after bar rendering
   *
   * @param value An item of the values
   * @param rect Rectangle of the bar
   */
  labelRenderer?: (value: T, rect: Rect) => ReactNode | null;

  /** Get the numeric value from the value */
  valueFunction: (value: T) => number;

  /** Get the color code from the value */
  colorFunction: (value: T) => string;

  barHeight?: number;
  boxRadis?: number;
}

function HorizontalGraphBarBase<T>({
  className,
  min,
  max,
  children,
  values,
  valueFunction,
  colorFunction,
  labelRenderer,
  barHeight = defaultBarHeight,
  boxRadis = defaultBoxRadius,
  ...divProps
}: HorizontalGraphBarProps<T>) {
  const { ref, width = 500 } = useResizeObserver<HTMLDivElement>({});

  const total = max - min;

  const rects = useMemo<Rect[]>(() => {
    return values.map((value) => {
      const r: number = (max + valueFunction(value)) / total;

      return {
        x: padding,
        y: padding,
        width: r * (width - padding * 2),
        height: barHeight - padding * 2,
      };
    });
  }, [barHeight, max, total, valueFunction, values, width]);

  return (
    <div {...divProps} ref={ref} className={className}>
      <svg width={width} height={barHeight}>
        {Children.toArray(
          rects.map((rect, i) => (
            <rect
              {...rect}
              rx={boxRadis - padding}
              ry={boxRadis - padding}
              fill={colorFunction(values[i])}
            />
          )),
        )}
      </svg>
      {typeof labelRenderer === 'function' &&
        Children.toArray(
          rects.map((rect, i) => labelRenderer(values[i], rect)),
        )}
      {children}
    </div>
  );
}

export const HorizontalGraphBar: <T>(
  props: HorizontalGraphBarProps<T>,
) => ReactElement<HorizontalGraphBarProps<T>> = styled(HorizontalGraphBarBase)`
  width: 100%;
  height: ${({ barHeight = defaultBarHeight }) => barHeight}px;

  padding: 0;
  margin: 0;

  border-radius: ${({ boxRadis = defaultBoxRadius }) => boxRadis}px;

  position: relative;
  font-size: 0;
  color: ${({ theme }) => theme.textColor};

  > span {
    position: absolute;
  }

  ${({ theme }) =>
    pressed({
      color: theme.textInput.backgroundColor,
      backgroundColor: theme.backgroundColor,
      intensity: theme.intensity,
      distance: 1,
    })};
` as any;
