import { MutableRefObject, useCallback, useMemo, useState, MouseEvent } from 'react';
import type { I{{pascalCase}}Params, I{{pascalCase}}Result } from './{{camelCase}}.interface';

export const {{camelCase}} = <T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  params: I{{pascalCase}}Params<T> = {},
): I{{pascalCase}}Result<T> => {
  const { onMouseEnter: onMouseEnterHandler, onChangeIsHover } = params;

  const [isHover, setIsHover] = useState(false);

  const changeIsHover = useCallback(
    (boolean: boolean) => {
      const el = ref.current;
      if (!el) return;

      boolean ? el.focus() : el.blur();

      setIsHover(boolean);
      onChangeIsHover?.(boolean);
    },
    [onChangeIsHover, ref],
  );

  const onMouseEnter = useCallback(
    (e: MouseEvent<T>) => {
      setIsHover(true);
      onMouseEnterHandler?.(e);
    },
    [onMouseEnterHandler],
  );

  const data = useMemo(
    () => ({
      isHover,
    }),
    [isHover],
  );

  const dataChangers = useMemo(
    () => ({
      changeIsHover,
    }),
    [changeIsHover],
  );

  const eventHandlers = useMemo(
    () => ({
      onMouseEnter,
    }),
    [onMouseEnter],
  );

  return {
    data,
    dataChangers,
    eventHandlers,
  };
};
