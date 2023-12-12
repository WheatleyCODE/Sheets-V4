import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/class-names';
import styles from './HomePage.module.scss';

import { Select } from '@/shared/ui/select';
import { MdHome } from 'react-icons/md';

const itemsArr = [
  { Icon: MdHome, text: 'Text', value: 'value', index: 0 },
  { Icon: MdHome, text: 'Pext', value: 'value', index: 1 },
  { Icon: MdHome, text: 'Zext', value: 'value', index: 2 },
  { Icon: MdHome, text: 'Gext', value: 'value', index: 3 },
];

const HomePage: FC = memo(() => {
  return (
    <section data-testid="homePage" className={classNames(styles.home_page, {}, ['page'])}>
      <Select isSearch items={itemsArr} />
    </section>
  );
});

export default HomePage;
