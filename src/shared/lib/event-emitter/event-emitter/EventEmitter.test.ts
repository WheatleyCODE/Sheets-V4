import { EventEmitter } from './EventEmitter';
import { DataTypes, EventNames } from './EventEmitter.consts';

describe('EventEmitter', () => {
  test('EventEmitter works', () => {
    const emitter = new EventEmitter();

    let count = 0;
    let isSelectCell = false;
    let isSelectFormula = false;

    // * There will be warning -> "Вы не подписаны на данное событие"
    emitter.emit({ type: DataTypes.SELECT_FORMULA, eventName: EventNames.SELECT, id: 'id' });

    // * Work
    emitter.subscribe('id', EventNames.SELECT, (data) => {
      if (data.type === DataTypes.SELECT_CELL) {
        isSelectCell = true;
        count += 1;
      }

      if (data.type === DataTypes.SELECT_FORMULA) {
        isSelectFormula = true;
        count += 1;
      }
    });

    // * Won't work
    emitter.subscribe('ID-ID', EventNames.SELECT, (data) => {
      if (data.type === DataTypes.SELECT_CELL) {
        isSelectCell = false;
        count += 1;
      }

      if (data.type === DataTypes.SELECT_FORMULA) {
        isSelectFormula = false;
        count += 1;
      }
    });

    // * Won't work
    emitter.subscribe('id', EventNames.FOCUS, (data) => {
      if (data.type === DataTypes.SELECT_CELL) {
        isSelectCell = false;
        count += 1;
      }

      if (data.type === DataTypes.SELECT_FORMULA) {
        isSelectFormula = false;
        count += 1;
      }
    });

    emitter.emit({ type: DataTypes.SELECT_CELL, eventName: EventNames.SELECT, id: 'id' });
    emitter.emit({ type: DataTypes.SELECT_FORMULA, eventName: EventNames.SELECT, id: 'id' });

    // * There will be warning -> "Вы не подписаны на данное событие"
    emitter.emit({ type: DataTypes.MOUSE_ENTER_CELL, eventName: EventNames.MOUSE_ENTER, id: 'id' });

    expect(isSelectCell).toBe(true);
    expect(isSelectFormula).toBe(true);
    expect(count).toBe(2);
  });
});
