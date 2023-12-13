import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/class-names';
import styles from './HomePage.module.scss';

import { Select } from '@/shared/ui/select';
import { Md10K, MdHome } from 'react-icons/md';
import { useSelect } from '@/shared/ui/select';

const itemsArr = [
  { Icon: MdHome, text: 'Text', value: 'value', index: 0 },
  { Icon: MdHome, text: 'Pext', value: 'value', index: 1 },
  { Icon: MdHome, text: 'Zext', value: 'value', index: 2 },
  { Icon: MdHome, text: 'Gext', value: 'value', index: 3 },
  { Icon: Md10K, text: 'Hexg', value: 'value', index: 4 },
  { Icon: Md10K, text: 'Goland', value: 'value', index: 5 },
  { Icon: Md10K, text: 'Landf', value: 'value', index: 6 },
];

const HomePage: FC = memo(() => {
  const { input, select, controllableMenu } = useSelect({
    input: { input: { initialValue: 'valid' } },
    controllableMenu: { controllableMenu: { items: itemsArr, onChangeIndex: (item) => console.log(item) } },
  });

  return (
    <section data-testid="homePage" className={classNames(styles.home_page, {}, ['page'])}>
      <Select input={input} select={select} controllableMenu={controllableMenu} items={itemsArr} />
    </section>
  );
});

export default HomePage;
