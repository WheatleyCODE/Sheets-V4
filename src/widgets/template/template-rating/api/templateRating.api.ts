import { rtkApi } from '@/shared/api';
import { ITemplateRating } from '../model/types/templateRating.interface';

export interface IGetTemplateRatings {
  userId: string;
  templateId: string;
}

export interface IRateTemplateArgs extends IGetTemplateRatings {
  rate: number;
  feedback?: string;
}

const templateRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getTemplateRatings: build.query<ITemplateRating[], IGetTemplateRatings>({
      query: ({ userId, templateId }) => ({
        url: '/template-ratings',
        params: {
          userId,
          templateId,
        },
      }),
    }),

    rateTemplate: build.mutation<void, IRateTemplateArgs>({
      query: (body) => ({
        url: '/template-ratings',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const useTemplateRatings = templateRatingApi.useGetTemplateRatingsQuery;
export const useRateTemplate = templateRatingApi.useRateTemplateMutation;
