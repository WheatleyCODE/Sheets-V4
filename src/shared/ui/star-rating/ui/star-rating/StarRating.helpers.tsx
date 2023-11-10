import { MdOutlineStar, MdOutlineStarBorder, MdOutlineStarHalf } from 'react-icons/md';
import { STAR_COUNT } from './StarRating.consts';
import { Star } from '../star/Star';
import type { GetStarts } from './StarRating.interface';

export const getStars: GetStarts = (current, getChangeCurrent, isSelect, selectStar) => {
  const isFloat = Number.isFloat(current / 2);
  const fullStarsCount = Math.floor(current / 2);
  const resStars: JSX.Element[] = [];

  for (let i = 0; i < fullStarsCount; i++) {
    resStars[i] = (
      <Star
        count={i + 1}
        StarIcon={MdOutlineStar}
        getChangeCurrent={getChangeCurrent}
        selectStar={selectStar}
        isSelect={isSelect}
      />
    );
  }

  if (isFloat) {
    resStars.push(
      <Star
        count={resStars.length + 1}
        StarIcon={MdOutlineStarHalf}
        getChangeCurrent={getChangeCurrent}
        selectStar={selectStar}
        isSelect={isSelect}
      />,
    );
  }

  for (let i = resStars.length; i < STAR_COUNT; i++) {
    resStars.push(
      <Star
        count={i + 1}
        StarIcon={MdOutlineStarBorder}
        getChangeCurrent={getChangeCurrent}
        selectStar={selectStar}
        isSelect={isSelect}
      />,
    );
  }

  return resStars;
};
