import { FC, memo } from 'react';
import { MdRedo, MdUndo } from 'react-icons/md';
import { Button } from '@/shared/ui/button';
import { classNames } from '@/shared/lib/class-names';
import type { IUndoRedoProps } from './UndoRedo.interface';
import styles from './UndoRedo.module.scss';

export const UndoRedo: FC<IUndoRedoProps> = memo((props) => {
  const { className, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="undoRedo" className={classNames(styles.undo_redo, {}, [className])}>
      <Button className="r-1px" Icon={MdUndo} />
      <Button Icon={MdRedo} />
    </div>
  );
});
