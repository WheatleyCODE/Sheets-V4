import { FC, memo } from 'react';
import { MdRedo, MdUndo } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/button';
import { Title } from '@/shared/ui/title';
import { classNames } from '@/shared/lib/class-names';
import type { IUndoRedoProps } from './UndoRedo.interface';
import styles from './UndoRedo.module.scss';

export const UndoRedo: FC<IUndoRedoProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="undoRedo" className={classNames(styles.undo_redo, {}, [className])}>
      <Title text={t('Назад')}>
        <Button className="r-1px" Icon={MdUndo} />
      </Title>

      <Title text={t('Вперёд')}>
        <Button Icon={MdRedo} />
      </Title>
    </div>
  );
});
