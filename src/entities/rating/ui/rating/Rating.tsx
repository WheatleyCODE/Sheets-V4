import { FC, memo, useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Modal } from '@/shared/ui/modal';
import { Backdrop } from '@/shared/ui/backdrop';
import { StarRating } from '@/shared/ui/star-rating';
import { classNames } from '@/shared/lib/class-names';
import { Text, TextSize } from '@/shared/ui/text';
import { Input, useValidInput } from '@/shared/ui/input';
import { useTranslation } from 'react-i18next';
import { Button, ButtonColor } from '@/shared/ui/button';
import { MdOutlineMessage } from 'react-icons/md';
import { HStack, VStack } from '@/shared/ui/containers';
import { Card } from '@/shared/ui/card';
import type { IRatingProps } from './Rating.interface';
import styles from './Rating.module.scss';

export const Rating: FC<IRatingProps> = memo((props) => {
  const {
    className,
    title = 'Оценка:',
    rate = 5,
    feedbackTitle = 'Отзыв:',
    isFeedback = false,
    onAccept,
    onCancel,
    isStarred,
    ...anotherProps
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [currentRate, setCurrentRate] = useState(rate);
  const { t } = useTranslation();
  const textInput = useValidInput('', []);

  const onSelectStar = useCallback((rate: number) => {
    setCurrentRate(rate);
    setIsOpen(true);
  }, []);

  const onCancelHandler = useCallback(() => {
    onCancel?.(currentRate);
    setIsOpen(false);
  }, [currentRate, onCancel]);

  const onAcceptHandler = useCallback(() => {
    onAccept?.(currentRate, textInput.value);
    setIsOpen(false);
  }, [currentRate, onAccept, textInput.value]);

  return (
    <Card {...anotherProps} data-testid="rating" className={classNames(styles.rating, {}, [className])}>
      <VStack>
        {!isStarred && <Text textSize={TextSize.SMALL} className={styles.title} title={title} />}
        <StarRating isStarred={isStarred} initStar={rate} onSelectStar={onSelectStar} />
      </VStack>

      <AnimatePresence>
        {isOpen && isFeedback && (
          <Backdrop onClose={onCancelHandler}>
            <Modal onClose={onCancelHandler}>
              <VStack align="start">
                <Text className={styles.feedback_title} title={feedbackTitle} />
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
                <HStack className={styles.buttons_container} justify="space-between">
                  <Button onClick={onCancelHandler} text={t('Закрыть')} />
                  <Button buttonColor={ButtonColor.PRIMARY} onClick={onAcceptHandler} text={t('Отправить')} />
                </HStack>
              </VStack>
            </Modal>
          </Backdrop>
        )}
      </AnimatePresence>
    </Card>
  );
});
