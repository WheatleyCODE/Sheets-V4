// import { BiDollar } from 'react-icons/bi';
import {
  MdCurrencyExchange,
  // MdCurrencyRuble,
  // MdEuroSymbol,
  MdLocationOn,
  MdOutlineImage,
  MdPersonOutline,
} from 'react-icons/md';
// import { DefaultItems } from '@/shared/ui/input';
// import { Country, Currency } from '../../model/consts/profile.consts';
import type { IGetInfoItemArrProps, InfoItem } from './ProfileCard.interface';

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
      // options: { items: DefaultItems.NUMBERS, changeValue: validHooks.age.changeValue, maxItems: 4, isSearch: true },
    },
    {
      title: 'Валюта',
      text: currency,
      input: validHooks.currency,
      Icon: MdCurrencyExchange,
      // options: {
      //   items: [
      //     { text: Currency.RUB, Icon: MdCurrencyRuble, value: Currency.RUB },
      //     { text: Currency.USD, Icon: BiDollar, value: Currency.USD },
      //     { text: Currency.EUR, Icon: MdEuroSymbol, value: Currency.EUR },
      //   ],
      //   changeValue: validHooks.currency.changeValue,
      //   isForbidInput: true,
      // },
    },
    {
      title: 'Страна',
      text: country,
      input: validHooks.country,
      Icon: MdLocationOn,
      // options: {
      //   items: [
      //     { text: Country.RUSSIA, value: Country.RUSSIA },
      //     { text: Country.BELARUS, value: Country.BELARUS },
      //     { text: Country.UKRAINE, value: Country.UKRAINE },
      //     { text: Country.GERMANY, value: Country.GERMANY },
      //     { text: Country.FRANCE, value: Country.FRANCE },
      //   ],
      //   changeValue: validHooks.country.changeValue,
      //   maxItems: 4,
      // },
    },
    {
      title: 'Город',
      text: city,
      input: validHooks.city,
      Icon: MdLocationOn,
      // options: {
      //   items: [
      //     { text: 'Москва', value: 'Москва' },
      //     { text: 'Нижний Новгород', value: 'Нижний Новгород' },
      //     { text: 'Минск', value: 'Минск' },
      //     { text: 'Киев', value: 'Киев' },
      //     { text: 'Берлин', value: 'Берлин' },
      //     { text: 'Париж', value: 'Париж' },
      //     { text: 'Тель Авив', value: 'Тель Авив' },
      //     { text: 'Анкара', value: 'Анкара' },
      //     { text: 'Лондон', value: 'Лондон' },
      //     { text: 'Вашингтон', value: 'Вашингтон' },
      //   ],
      //   changeValue: validHooks.city.changeValue,
      //   maxItems: 4,
      //   isSearch: true,
      // },
    },
  ];

  return infoArr;
};
