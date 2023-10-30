import { ChangeEvent, FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { MdOutlineComment, MdSend } from 'react-icons/md';
import { addCommentFormActions, addCommentFormReducer } from '../../model/slice/addCommentFormSlice';
import { getAddCommentFormText } from '../../model/selectors/get-add-comment-form-error-text/getAddCommentFormText';
import { Input, useValidInput } from 'shared/ui/input';
import { HStack } from 'shared/ui/containers';
import { Button } from 'shared/ui/button';
import { ReducersList, useDynamicModule, useTypedDispatch } from 'shared/lib/hooks';
import { classNames } from 'shared/lib/class-names';
import styles from './AddCommentForm.module.scss';

interface IAddCommentFormProps extends React.HTMLAttributes<HTMLDivElement> {
  addComment: (text: string) => void;
}

const reducers: ReducersList = { addCommentForm: addCommentFormReducer };

export const AddCommentForm: FC<IAddCommentFormProps> = (props) => {
  const { className, addComment, ...anotherProps } = props;
  useDynamicModule(reducers, true);
  const dispatch = useTypedDispatch();
  const text = useSelector(getAddCommentFormText);
  const textInput = useValidInput(text);
  const { t } = useTranslation();

  const onChangeText = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(addCommentFormActions.setText(e.target.value));
      textInput.onChange(e);
    },
    [dispatch],
  );

  const addCommentHandler = useCallback(() => {
    if (!textInput.value || textInput.isError) return;
    addComment(textInput.value);

    textInput.changeValue('');
    dispatch(addCommentFormActions.setText(''));
  }, [textInput, addComment, dispatch]);

  return (
    <HStack
      {...anotherProps}
      data-testid="addCommentForm"
      className={classNames(styles.add_comment_form, {}, [className])}
    >
      <Input
        Icon={MdOutlineComment}
        value={textInput.value}
        type="text"
        placeholder={t('Комментарий')}
        onChange={onChangeText}
        onBlur={textInput.onBlur}
        onFocus={textInput.onFocus}
        isError={textInput.isError}
        validError={t(textInput.validError || '')}
        isActive={textInput.isActive}
        className={styles.input}
      />

      <Button onClick={addCommentHandler} className={styles.button} text={t('Отправить')} Icon={MdSend} />
    </HStack>
  );
};
