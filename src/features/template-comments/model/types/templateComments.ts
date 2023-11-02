import { EntityState } from '@reduxjs/toolkit';
import { IComment } from 'entities/comment';

export interface ITemplateCommentsSchema extends EntityState<IComment>, IReduxSchema {}
