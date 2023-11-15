import { FC, memo, useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdOutlineMessage } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { Backdrop, Modal } from '@/shared/ui/modals';
import { StarRating } from '@/shared/ui/star-rating';
import { classNames } from '@/shared/lib/class-names';
import { Text, TextSize } from '@/shared/ui/text';
import { Input, useValidInput } from '@/shared/ui/input';
import { Button, ButtonColor } from '@/shared/ui/button';
import { HStack, VStack } from '@/shared/ui/containers';
import { useModals } from '@/shared/ui/modals';
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

  const { isShow, openModal, closeModal } = useModals();
  const [currentRate, setCurrentRate] = useState(rate);
  const { t } = useTranslation();
  const textInput = useValidInput('', []);

  const onSelectStar = useCallback(
    (rate: number) => {
      setCurrentRate(rate);
      openModal();
    },
    [openModal],
  );

  const onCancelHandler = useCallback(() => {
    onCancel?.(currentRate);
    closeModal();
  }, [closeModal, currentRate, onCancel]);

  const onAcceptHandler = useCallback(() => {
    onAccept?.(currentRate, textInput.value);
    closeModal();
  }, [closeModal, currentRate, onAccept, textInput.value]);

  return (
    <Card {...anotherProps} data-testid="rating" className={classNames(styles.rating, {}, [className])}>
      <VStack>
        {!isStarred && <Text textSize={TextSize.SMALL} className={styles.title} title={title} />}
        <StarRating isStarred={isStarred} initStar={rate} onSelectStar={onSelectStar} />
      </VStack>

      <AnimatePresence>
        {isShow && isFeedback && (
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
