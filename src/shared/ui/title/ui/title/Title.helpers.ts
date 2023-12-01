import type { ForcePosition, ObjStyles } from './Title.interface';
import { TEXT_HORIZONTAL_PADDINGS, TEXT_MARGIN } from './Title.consts';

export const getForcePosition = (forcePosition: ForcePosition, textNode: HTMLElement): ObjStyles => {
  const objStyles: ObjStyles = {};
  const textRect = textNode.getBoundingClientRect();

  if (forcePosition === 'bottom-right') {
    objStyles.right = 0;
    objStyles.left = 'initial';
    objStyles.top = 'initial';
  }

  if (forcePosition === 'bottom-left') {
    objStyles.left = 0;
    objStyles.right = 'initial';
    objStyles.top = 'initial';
  }

  if (forcePosition === 'top-right') {
    objStyles.right = 0;
    objStyles.left = 'initial';
    objStyles.top = -textRect.height - TEXT_MARGIN;
  }

  if (forcePosition === 'top-left') {
    objStyles.left = 0;
    objStyles.right = 'initial';
    objStyles.top = -textRect.height - TEXT_MARGIN;
  }

  return objStyles;
};

export const getPosition = (bodyNode: HTMLElement, titleNode: HTMLElement, textNode: HTMLElement): ObjStyles => {
  const bodyRect = bodyNode.getBoundingClientRect();
  const titleRect = titleNode.getBoundingClientRect();
  const textRect = textNode.getBoundingClientRect();
  const objStyles: ObjStyles = {};

  objStyles.top = objStyles.top = titleRect.height + TEXT_MARGIN;

  const isRight = () => TEXT_HORIZONTAL_PADDINGS + titleRect.left + textRect.width / 2 > bodyRect.width;
  const isLeft = () => textRect.width / 2 > titleRect.left;
  const isTop = () => titleRect.top + titleRect.height + textRect.height > bodyRect.height;

  if (isRight()) {
    objStyles.right = 0;
    objStyles.left = 'initial';
  }

  if (isLeft()) {
    objStyles.left = 0;
    objStyles.right = 'initial';
  }

  if (isTop()) {
    objStyles.top = -textRect.height - TEXT_MARGIN;
  }

  if (!isRight() && !isLeft()) {
    objStyles.left = titleRect.width / 2 - textRect.width / 2;
  }

  return objStyles;
};
