import { EntityState } from '@reduxjs/toolkit';
import { IComment } from 'entities/comment';

export interface ITemplateDetailsCommentsSchema extends EntityState<IComment>, IReduxSchema {}
