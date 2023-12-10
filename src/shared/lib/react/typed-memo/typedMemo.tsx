import { ComponentType, memo, ComponentProps } from 'react';

type PropsComparator<T extends ComponentType> = (
  prevProps: Readonly<ComponentProps<T>>,
  nextProps: Readonly<ComponentProps<T>>,
) => boolean;

export function typedMemo<T extends ComponentType<any>>(Component: T, propsComparator?: PropsComparator<T>) {
  return memo(Component, propsComparator) as any as T;
}
