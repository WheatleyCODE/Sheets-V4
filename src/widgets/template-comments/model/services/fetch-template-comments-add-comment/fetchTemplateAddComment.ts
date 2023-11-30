import { IStateSchema, IThunkExtra } from '@/app/providers/store-provider';
import { buildAsyncThunk } from '@/shared/lib/store';
import { IComment } from '@/entities/comment';
import { getUser } from '@/entities/user';
import { templateCommentsActions } from '../../slice/templateCommentsSlice';
import i18n from '@/shared/config/i18n/i18n';
import type { IFetchAddCommentData } from './fetchTemplateAddComment.interface';

export const [useFetchTemplateAddComment, fetchTemplateAddComment] = buildAsyncThunk<IComment, IFetchAddCommentData>(
  'template/fetchTemplateAddComment',
  async (commentData, thunkAPI) => {
    try {
      const extra = thunkAPI.extra as IThunkExtra;
      const { data } = await extra.api.post<IComment>('/comments', commentData);

      if (!data) throw new Error();

      const user = getUser(thunkAPI.getState() as IStateSchema);

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
