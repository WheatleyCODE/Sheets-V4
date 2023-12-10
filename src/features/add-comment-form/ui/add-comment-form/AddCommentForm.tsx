import { ChangeEvent, FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { MdOutlineComment, MdSend } from 'react-icons/md';
import { addCommentFormReducer, useCommentFormActions } from '../../model/slice/addCommentFormSlice';
import { useAddCommentFormText } from '../../model/selectors/get-add-comment-form-error-text/getAddCommentFormText';
import { Input, useValidInput } from '@/shared/ui/input';
import { HStack } from '@/shared/ui/containers';
import { Button } from '@/shared/ui/button';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks';
import { classNames } from '@/shared/lib/class-names';
import type { IAddCommentFormProps } from './AddCommentForm.interface';
import styles from './AddCommentForm.module.scss';

const reducers: ReducersList = { addCommentForm: addCommentFormReducer };

export const AddCommentForm: FC<IAddCommentFormProps> = memo((props) => {
  const {
    className,
    addComment,
    commentPlaceholder = 'Комментарий',
    sendCommentText = 'Отправить',
    ...anotherProps
  } = props;
  useDynamicModule(reducers, true);

  const { setText } = useCommentFormActions();
  const text = useAddCommentFormText();
  const textInput = useValidInput(text);
  const { t } = useTranslation();

  const onChangeText = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
      textInput.handlers.onChange(e);
    },
    [setText, textInput],
  );

  const addCommentHandler = useCallback(() => {
    if (!textInput.data.value || textInput.data.isError) return;
    addComment(textInput.data.value);

    textInput.data.changeValue('');
    setText('');
  }, [textInput, addComment, setText]);

  return (
    <HStack
      {...anotherProps}
      data-testid="addCommentForm"
      className={classNames(styles.add_comment_form, {}, [className])}
    >
      <Input
        Icon={MdOutlineComment}
        type="text"
        data-testid="commentInput"
        placeholder={commentPlaceholder}
        {...textInput.data}
        {...textInput.handlers}
        validError={t(textInput.data.validError || '')}
        onChange={onChangeText}
        className={styles.input}
      />

      <Button onClick={addCommentHandler} className={styles.button} text={sendCommentText} Icon={MdSend} />
    </HStack>
  );
});
