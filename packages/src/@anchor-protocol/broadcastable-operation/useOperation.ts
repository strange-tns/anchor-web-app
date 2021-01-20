import type { OperationOptions, Operator } from './types';

export function useOperation<T1, R>(
  params: OperationOptions<R, [Operator<T1, R>], [T1, R]>,
): [(params: T1) => Promise<R>];

export function useOperation<T1, T2, R>(
  params: OperationOptions<R, [Operator<T1, T2>, Operator<T2, R>], [T1, T2, R]>,
): [(params: T1) => Promise<R>];

export function useOperation<T1, T2, T3, R>(
  params: OperationOptions<
    R,
    [Operator<T1, T2>, Operator<T2, T3>, Operator<T3, R>],
    [T1, T2, T3, R]
  >,
): [(params: T1) => Promise<R>];

export function useOperation<T1, T2, T3, T4, R>(
  params: OperationOptions<
    R,
    [Operator<T1, T2>, Operator<T2, T3>, Operator<T3, T4>, Operator<T4, R>],
    [T1, T2, T3, T4, R]
  >,
): [(params: T1) => Promise<R>];

export function useOperation<T1, T2, T3, T4, T5, R>(
  params: OperationOptions<
    R,
    [
      Operator<T1, T2>,
      Operator<T2, T3>,
      Operator<T3, T4>,
      Operator<T4, T5>,
      Operator<T5, R>,
    ],
    [T1, T2, T3, T4, T5, R]
  >,
): [(params: T1) => Promise<R>];

export function useOperation<T1, T2, T3, T4, T5, T6, R>(
  params: OperationOptions<
    R,
    [
      Operator<T1, T2>,
      Operator<T2, T3>,
      Operator<T3, T4>,
      Operator<T4, T5>,
      Operator<T5, T6>,
      Operator<T6, R>,
    ],
    [T1, T2, T3, T4, T5, T6, R]
  >,
): [(params: T1) => Promise<R>];

export function useOperation<T1, T2, T3, T4, T5, T6, T7, R>(
  params: OperationOptions<
    R,
    [
      Operator<T1, T2>,
      Operator<T2, T3>,
      Operator<T3, T4>,
      Operator<T4, T5>,
      Operator<T5, T6>,
      Operator<T6, T7>,
      Operator<T7, R>,
    ],
    [T1, T2, T3, T4, T5, T6, T7, R]
  >,
): [(params: T1) => Promise<R>];

export function useOperation<T1, T2, T3, T4, T5, T6, T7, T8, R>(
  params: OperationOptions<
    R,
    [
      Operator<T1, T2>,
      Operator<T2, T3>,
      Operator<T3, T4>,
      Operator<T4, T5>,
      Operator<T5, T6>,
      Operator<T6, T7>,
      Operator<T7, T8>,
      Operator<T8, R>,
    ],
    [T1, T2, T3, T4, T5, T6, T7, T8, R]
  >,
): [(params: T1) => Promise<R>];

export function useOperation(
  params: OperationOptions<Operator<any, any>[], any, any>,
): [(params: any) => Promise<any>] {
  return [(x: string) => Promise.resolve(1)];
}
