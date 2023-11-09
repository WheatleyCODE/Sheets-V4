import { Emitter } from '../emitter/Emitter';
import { EventNames } from './EventEmitter.consts';
import type { EventEmitterData } from './EventEmitter.interface';

export class EventEmitter extends Emitter<EventEmitterData, EventNames> {}
