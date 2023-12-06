import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { GiAubergine, GiAvocado, GiBananaPeeled } from 'react-icons/gi';
import { DEFAULT_DURATION } from '../../../../consts/animations';
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useTransform } from 'framer-motion';
import { TabsWidgetItem } from '../tabs-widget-item/TabsWidgetItem';
import { TabsWidgetName } from '../tabs-widget-name/TabsWidgetName';
import { classNames } from '@/shared/lib/class-names';
import type { ITabsWidgetProps } from './TabsWidget.interface';
import styles from './TabsWidget.module.scss';

type TabsValue = 'one' | 'two' | 'three';

const items: { Icon: IconType; value: TabsValue }[] = [
  { Icon: GiAubergine, value: 'one' },
  { Icon: GiAvocado, value: 'two' },
  { Icon: GiBananaPeeled, value: 'three' },
];

const gradients = [
  'linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)',
  'linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)',
  'linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)',
];

const xInput = [-75, 0, 75];

export const TabsWidget: FC<ITabsWidgetProps> = (props) => {
  const { className, ...anotherProps } = props;
  const [currentTab, setCurrentTab] = useState<TabsValue>('one');

  const x = useMotionValue(0);
  const background = useTransform(x, xInput, gradients);

  const tabNamesItems = items.map(({ value, Icon }) => (
    <TabsWidgetName isActive={currentTab === value} Icon={Icon} onClick={() => setCurrentTab(value)} />
  ));

  const resultItems = items.reduce<{ [key in TabsValue]?: ReactNode }>((acc, { Icon, value }) => {
    return {
      ...acc,
      [value]: <TabsWidgetItem style={{ x }} onClick={() => setCurrentTab(value)} Icon={Icon} />,
    };
  }, {});

  const toFront = useCallback(
    () =>
      setCurrentTab((prev) => {
        if (prev === 'one') return 'three';
        if (prev === 'two') return 'one';
        if (prev === 'three') return 'two';
        return 'one';
      }),
    [],
  );

  const toBack = useCallback(
    () =>
      setCurrentTab((prev) => {
        if (prev === 'one') return 'two';
        if (prev === 'two') return 'three';
        if (prev === 'three') return 'one';
        return 'one';
      }),
    [],
  );

  useEffect(() => {
    const interval = setInterval(toFront, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentTab]);

  useEffect(() => {
    const cb = () => {
      if (x.get() < -40) {
        toFront();
        return;
      }

      if (x.get() > 40) {
        toBack();
        return;
      }
    };

    document.addEventListener('mouseup', cb);

    return () => {
      document.removeEventListener('mouseup', cb);
    };
  }, [toBack, toFront, x]);

  return (
    <motion.div
      {...anotherProps}
      data-testid="tabsWidget"
      className={classNames(styles.tabs_widget, {}, [className, 'animation-widget'])}
    >
      <div className={classNames(styles.tabs_header, {}, [])}>{tabNamesItems}</div>

      <motion.div style={{ background }} className={classNames(styles.tabs_main, {}, [])}>
        <AnimatePresence>
          <LayoutGroup>
            {currentTab === 'one' && resultItems['one']}
            {currentTab === 'two' && resultItems['two']}
            {currentTab === 'three' && resultItems['three']}
          </LayoutGroup>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
