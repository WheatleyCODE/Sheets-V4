import { FC, memo, useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Portal } from '@/shared/ui/portal';
import { Modal } from '@/shared/ui/modal';
import { Backdrop } from '@/shared/ui/backdrop';
import { StarRating } from '@/shared/ui/star-rating';
import { classNames } from '@/shared/lib/class-names';
import { Text, TextSize } from '@/shared/ui/text';
import { MdOutlineMessage } from 'react-icons/md';
import { HStack, VStack } from '@/shared/ui/containers';
import { Card } from '@/shared/ui/card';
import type { IRatingProps } from './Rating.interface';
import styles from './Rating.module.scss';
import { Input, useValidInput } from '@/shared/ui/input';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/button';

export const Rating: FC<IRatingProps> = memo((props) => {
  const { className, title = 'Оценка:', feedbackTitle = 'Отзыв:', isFeedback = false, ...anotherProps } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const textInput = useValidInput('', []);

  const onSelectStar = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Card {...anotherProps} data-testid="rating" className={classNames(styles.rating, {}, [className])}>
      <VStack>
        <Text textSize={TextSize.SMALL} className={styles.title} title={title} />
        <StarRating onSelectStar={onSelectStar} />
      </VStack>

      <AnimatePresence>
        {isOpen && isFeedback && (
          <Portal>
            <Backdrop onClose={closeModal}>
              <Modal onClose={closeModal}>
                <VStack>
                  <Text title={feedbackTitle} />
                  <Input
                    className={styles.input}
                    Icon={MdOutlineMessage}
                    value={textInput.value}
                    type="text"
                    placeholder={t('Отзыв')}
                    onChange={textInput.onChange}
                    onBlur={textInput.onBlur}
                    onFocus={textInput.onFocus}
                    isError={textInput.isError}
                    validError={t(textInput.validError || '')}
                    isActive={textInput.isActive}
                  />
                  <HStack justify="space-between">
                    <Button text={t('Отправить')} />
                    <Button onClick={closeModal} text={t('Закрыть')} />
                  </HStack>
                </VStack>
              </Modal>
            </Backdrop>
          </Portal>
        )}
      </AnimatePresence>
    </Card>
  );
});
