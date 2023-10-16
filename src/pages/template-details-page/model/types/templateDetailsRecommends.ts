import { EntityState } from '@reduxjs/toolkit';
import { ITemplate } from 'entities/template';

export interface ITemplateDetailsRecommendsSchema extends EntityState<ITemplate>, IReduxSchema {}
