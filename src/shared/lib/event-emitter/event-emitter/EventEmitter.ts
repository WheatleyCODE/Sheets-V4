import { Emitter } from '../emitter/Emitter';
import { EventEmitterData, EventNames } from '../interface';

export class EventEmitter extends Emitter<EventEmitterData, EventNames> {}
