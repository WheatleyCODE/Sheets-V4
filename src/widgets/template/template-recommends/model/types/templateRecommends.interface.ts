import { EntityState } from '@reduxjs/toolkit';
import { ITemplate } from '@/entities/template';

export interface ITemplateRecommendsSchema extends EntityState<ITemplate>, IReduxSchema {}
