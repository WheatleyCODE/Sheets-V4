import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig, IThunkExtra } from 'app/providers/store-provider';
import { IComment } from 'entities/comment';
import { getUser } from 'features/user';
import { templateCommentsActions } from '../../slice/templateCommentsSlice';
import i18n from 'shared/config/i18n/i18n';

export interface IFetchAddCommentData {
  userId: string;
  templateId: string;
  text: string;
}

export const fetchTemplateAddComment = createAsyncThunk<IComment, IFetchAddCommentData, IThunkConfig>(
  'template/fetchTemplateAddComment',
  async (commentData, thunkAPI) => {
    try {
      const extra = thunkAPI.extra as IThunkExtra;
      const { data } = await extra.api.post<IComment>('/comments', commentData);

      if (!data) throw new Error();

      const user = getUser(thunkAPI.getState());

      if (user) {
        data.user = user;
        thunkAPI.dispatch(templateCommentsActions.addComment(data));
      }

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(i18n.t('Ошибка при отправке комментария'));
    }
  },
);
