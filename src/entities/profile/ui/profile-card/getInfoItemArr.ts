import { DefaultItems, IValidInputOpts } from 'shared/ui/input';
import { IProfile } from '../../model/types/profile';
import { InfoItem } from './ProfileCard';
import {
  MdCurrencyExchange,
  MdCurrencyRuble,
  MdEuroSymbol,
  MdLocationOn,
  MdOutlineImage,
  MdPersonOutline,
} from 'react-icons/md';
import { Country, Currency } from '../../model/types/profile';
import { BiDollar } from 'react-icons/bi';

export interface IInputValidHooks extends Record<keyof Omit<IProfile, 'userId' | 'id'>, IValidInputOpts<any>> {}

export interface IGetInfoItemArrProps {
  profile: IProfile;
  validHooks: IInputValidHooks;
}

export const getInfoItemArr = ({ profile, validHooks }: IGetInfoItemArrProps) => {
  const { username, firstname, lastname, age, city, country, currency, avatar } = profile;

  const infoArr: InfoItem[] = [
    { title: 'Аватар', text: avatar, input: validHooks.avatar, Icon: MdOutlineImage },
    { title: 'Никнейм', text: username, input: validHooks.username, Icon: MdPersonOutline },
    { title: 'Имя', text: firstname, input: validHooks.firstname, Icon: MdPersonOutline },
    { title: 'Фамилия', text: lastname, input: validHooks.lastname, Icon: MdPersonOutline },
    {
      title: 'Возраст',
      text: age,
      input: validHooks.age,
      Icon: MdPersonOutline,
      options: { items: DefaultItems.NUMBERS, changeValue: validHooks.age.changeValue, maxItems: 4, isSearch: true },
    },
    {
      title: 'Валюта',
      text: currency,
      input: validHooks.currency,
      Icon: MdCurrencyExchange,
      options: {
        items: [
          { text: Currency.RUB, Icon: MdCurrencyRuble },
          { text: Currency.USD, Icon: BiDollar },
          { text: Currency.EUR, Icon: MdEuroSymbol },
        ],
        changeValue: validHooks.currency.changeValue,
        isForbidInput: true,
      },
    },
    {
      title: 'Страна',
      text: country,
      input: validHooks.country,
      Icon: MdLocationOn,
      options: {
        items: [
          { text: Country.RUSSIA },
          { text: Country.BELARUS },
          { text: Country.UKRAINE },
          { text: Country.GERMANY },
          { text: Country.FRANCE },
        ],
        changeValue: validHooks.country.changeValue,
        maxItems: 4,
      },
    },
    {
      title: 'Город',
      text: city,
      input: validHooks.city,
      Icon: MdLocationOn,
      options: {
        items: [
          { text: 'Москва' },
          { text: 'Нижний Новгород' },
          { text: 'Минск' },
          { text: 'Киев' },
          { text: 'Берлин' },
          { text: 'Париж' },
          { text: 'Тель Авив' },
          { text: 'Анкара' },
          { text: 'Лондон' },
          { text: 'Вашингтон' },
        ],
        changeValue: validHooks.city.changeValue,
        maxItems: 4,
        isSearch: true,
      },
    },
  ];

  return infoArr;
};
