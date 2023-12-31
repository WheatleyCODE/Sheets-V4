import { FC, useCallback, MouseEvent, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  MdOpenInBrowser,
  MdOutlineCalendarMonth,
  MdOutlineDataArray,
  MdOutlineOpenInNew,
  MdOutlineVisibility,
} from 'react-icons/md';
import { Image } from '@/shared/ui/image';
import { Text } from '@/shared/ui/text';
import { HStack, VStack } from '@/shared/ui/containers';
import { Icon } from '@/shared/ui/icon';
import { Title } from '@/shared/ui/title';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { getRouteTemplateDetails } from '@/shared/config/route-config/routeConfig';
import { classNames } from '@/shared/lib/class-names';
import type { ITemplateListItemProps } from './TemplateListItem.interface';
import styles from './TemplateListItem.module.scss';
import { Skeleton } from '@/shared/ui/skeleton';

export const TemplateListItem: FC<ITemplateListItemProps> = memo((props) => {
  const { className, isOpenInNewWindow = false, template, view, ...anotherProps } = props;
  const { title, createdAt, tags, views, image, subtitle, id } = template;
  const { t } = useTranslation('templates');
  const navigate = useNavigate();

  const navigateToTemplate = useCallback(() => {
    if (isOpenInNewWindow) {
      window.open(getRouteTemplateDetails(id));
      return;
    }

    navigate(getRouteTemplateDetails(id));
  }, [id, navigate, isOpenInNewWindow]);

  const openInSheets = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <VStack
      {...anotherProps}
      data-testid="templateListItem"
      className={classNames(styles.template_list_item, {}, [className, styles[view]])}
    >
      <Card className={styles.card}>
        <HStack justify="start" className={styles.image_container}>
          <Image
            fallback={<Skeleton className={styles.image} />}
            errorFallback={<Skeleton className={styles.image} />}
            className={styles.image}
            src={image}
          />
        </HStack>

        <HStack justify="start" className={styles.info}>
          <Title text={t('Просмотры')}>
            <HStack justify="start">
              <Icon className={styles.icon} Icon={MdOutlineVisibility} />
              <Text className={styles.info_text} text={String(views)} />
            </HStack>
          </Title>

          <Title text={t('Дата создания')}>
            <HStack justify="start">
              <Icon className={styles.icon} Icon={MdOutlineCalendarMonth} />
              <Text className={styles.info_text} text={createdAt} />
            </HStack>
          </Title>

          <Title text={`${t('Теги')}: ${tags.join(', ')}`}>
            <HStack justify="start">
              <Icon className={styles.icon} Icon={MdOutlineDataArray} />
              <Text className={classNames(styles.info_text, {}, [styles.tags])} text={tags.join(', ')} />
            </HStack>
          </Title>
        </HStack>

        <VStack align="start">
          <Title className={styles.hover_title} text={title}>
            <Text className={styles.text_title} title={title} />
          </Title>
          <Title className={styles.hover_title} text={subtitle}>
            <Text className={styles.text_subtitle} text={subtitle} />
          </Title>
        </VStack>

        <HStack className={styles.buttons} justify="space-between">
          <Title text={t('Открыть шаблон в таблицах')}>
            <Button
              onClick={openInSheets}
              Icon={MdOutlineOpenInNew}
              buttonColor="primary"
              text={t('Открыть в таблицах')}
            />
          </Title>
          <Title text={t('Открыть страницу подробного просмотра')}>
            <Button onClick={navigateToTemplate} Icon={MdOpenInBrowser} buttonColor="primary" text={t('Подробнее')} />
          </Title>
        </HStack>
      </Card>
    </VStack>
  );
});
