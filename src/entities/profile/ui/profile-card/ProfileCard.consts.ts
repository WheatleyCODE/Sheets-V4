import { BiDollar } from 'react-icons/bi';
import { MdCurrencyRuble, MdEuroSymbol } from 'react-icons/md';
import { Country, Currency } from '../../model/consts/profile.consts';

export const currencyItems = [
  { text: Currency.RUB, Icon: MdCurrencyRuble, value: Currency.RUB },
  { text: Currency.USD, Icon: BiDollar, value: Currency.USD },
  { text: Currency.EUR, Icon: MdEuroSymbol, value: Currency.EUR },
];

export const countryItems = [
  { text: Country.RUSSIA, value: Country.RUSSIA },
  { text: Country.BELARUS, value: Country.BELARUS },
  { text: Country.UKRAINE, value: Country.UKRAINE },
  { text: Country.GERMANY, value: Country.GERMANY },
  { text: Country.FRANCE, value: Country.FRANCE },
];

export const cityItems = [
  { text: 'Москва', value: 'Москва' },
  { text: 'Нижний Новгород', value: 'Нижний Новгород' },
  { text: 'Минск', value: 'Минск' },
  { text: 'Киев', value: 'Киев' },
  { text: 'Берлин', value: 'Берлин' },
  { text: 'Париж', value: 'Париж' },
  { text: 'Тель Авив', value: 'Тель Авив' },
  { text: 'Анкара', value: 'Анкара' },
  { text: 'Лондон', value: 'Лондон' },
  { text: 'Вашингтон', value: 'Вашингтон' },
];
