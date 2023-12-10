import { FC, memo, useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdOutlineMessage } from 'react-icons/md';
import { Backdrop, Modal, Portal, useModals, Confirm } from '@/shared/ui/modals';
import { StarRating } from '@/shared/ui/star-rating';
import { classNames } from '@/shared/lib/class-names';
import { Text } from '@/shared/ui/text';
import { Input, useValidInput } from '@/shared/ui/input';
import { VStack } from '@/shared/ui/containers';
import { Card } from '@/shared/ui/card';
import type { IRatingProps } from './Rating.interface';
import styles from './Rating.module.scss';
import { useTranslation } from 'react-i18next';

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
    staredText,
    cancelText,
    acceptText,
    feedbackPlaceholder = 'Отзыв',
    ...anotherProps
  } = props;

  const { isShow, openModal, closeModal } = useModals();
  const { t } = useTranslation();
  const [currentRate, setCurrentRate] = useState(rate);
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
    onAccept?.(currentRate, textInput.data.value);
    closeModal();
  }, [closeModal, currentRate, onAccept, textInput.data.value]);

  return (
    <Card
      {...anotherProps}
      data-testid="rating"
      data-testrate={currentRate}
      className={classNames(styles.rating, {}, [className])}
    >
      <VStack>
        {!isStarred && <Text textSize="small" className={styles.title} title={title} />}
        <StarRating staredText={staredText} isStarred={isStarred} initStar={rate} onSelectStar={onSelectStar} />
      </VStack>

      <AnimatePresence>
        {isShow && isFeedback && (
          <Portal>
            <Backdrop onClose={onCancelHandler}>
              <Modal onClose={onCancelHandler}>
                <Confirm
                  title={feedbackTitle}
                  acceptText={acceptText}
                  cancelText={cancelText}
                  onAccept={onAcceptHandler}
                  onCancel={onCancelHandler}
                >
                  <Input
                    className={styles.input}
                    Icon={MdOutlineMessage}
                    type="text"
                    data-testid="rating.feedback"
                    placeholder={feedbackPlaceholder}
                    {...textInput.data}
                    {...textInput.handlers}
                    validError={t(textInput.data.validError || '')}
                  />
                </Confirm>
              </Modal>
            </Backdrop>
          </Portal>
        )}
      </AnimatePresence>
    </Card>
  );
});
