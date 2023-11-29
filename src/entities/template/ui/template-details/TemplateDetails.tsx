import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TemplateTextBlock } from '../template-text-block/TemplateTextBlock';
import { TemplateCodeBlock } from '../template-code-block/TemplateCodeBlock';
import { TemplateImageBlock } from '../template-image-block/TemplateImageBlock';
import { TemplateBlockTypes } from '../../model/consts/template.consts';
import { Text } from '@/shared/ui/text';
import { Skeleton } from '@/shared/ui/skeleton';
import { Icon } from '@/shared/ui/icon';
import { MdOutlineCalendarMonth, MdOutlineDataArray, MdOutlineOpenInNew, MdOutlineVisibility } from 'react-icons/md';
import { intoIter } from '@/shared/lib/iterators';
import { Image } from '@/shared/ui/image';
import { HStack, VStack } from '@/shared/ui/containers';
import { Button } from '@/shared/ui/button';
import { Title } from '@/shared/ui/title';
import { classNames } from '@/shared/lib/class-names';
import type { TemplateBlock } from '../../model/types/template.interface';
import type { ITemplateDetailsProps } from './TemplateDetails.interface';
import styles from './TemplateDetails.module.scss';

export const TemplateDetails: FC<ITemplateDetailsProps> = (props) => {
  const { className, template, isLoading, error, ...anotherProps } = props;
  const { blocks, createdAt, image, subtitle, tags, title, views } = template;
  const { t } = useTranslation('templateDetails');

  const renderBlock = useCallback((block: TemplateBlock) => {
    switch (block.type) {
      case TemplateBlockTypes.TEXT:
        return <TemplateTextBlock key={block.id} className={styles.block_margin} block={block} />;
      case TemplateBlockTypes.CODE:
        return <TemplateCodeBlock key={block.id} className={styles.block_margin} block={block} />;
      case TemplateBlockTypes.IMAGE:
        return <TemplateImageBlock key={block.id} className={styles.block_margin} block={block} />;
      default:
        return <TemplateTextBlock block={block} />;
    }
  }, []);

  if (isLoading) {
    return (
      <VStack
        {...anotherProps}
        data-testid="templateDetails"
        className={classNames(styles.template_details, {}, [className])}
      >
        <Skeleton className={styles.head_image_skeleton} />
        <Skeleton className={styles.title_skeleton} />
        <Skeleton className={styles.subtitle_skeleton} />
        <Skeleton className={styles.info_skeleton} />
        <Skeleton className={styles.block_skeleton} />
        <Skeleton className={styles.block_skeleton} />
        <Skeleton className={styles.block_skeleton} />
      </VStack>
    );
  }

  if (error) {
    return (
      <HStack
        {...anotherProps}
        data-testid="templateDetails"
        className={classNames(styles.template_details, {}, [className, styles.error])}
      >
        <Text textStyle="error" title={t(error)} />
      </HStack>
    );
  }

  const tagsArr = intoIter<string>(tags)
    .map((tag) => <Text key={tag} className={styles.info_text} text={tag} />)
    .toArray();

  const blocksArr = intoIter<TemplateBlock>(blocks).map(renderBlock).toArray();

  return (
    <VStack
      {...anotherProps}
      data-testid="templateDetails"
      className={classNames(styles.template_details, {}, [className])}
    >
      <HStack justify="start" className={classNames(styles.head_image, {}, [styles.head_image_skeleton])}>
        <Image
          fallback={<Skeleton className={styles.image} />}
          errorFallback={<Skeleton className={styles.image} />}
          className={styles.image}
          src={image}
        />
      </HStack>

      <HStack justify="start" className={classNames(styles.title, {}, [styles.title_skeleton])}>
        <Text textSize="big" title={title} />
        <Button
          className={styles.open_button}
          Icon={MdOutlineOpenInNew}
          buttonColor="primary"
          text={t('Открыть шаблон')}
        />
      </HStack>

      <HStack justify="start" className={classNames(styles.subtitle, {}, [styles.subtitle_skeleton])}>
        <Text text={subtitle} />
      </HStack>

      <HStack justify="start" className={classNames(styles.info, {}, [styles.info_skeleton])}>
        <Title text={t('Просмотры')}>
          <HStack justify="start">
            <Icon className={styles.info_icon} Icon={MdOutlineVisibility} />
            <Text className={styles.info_text} text={String(views)} />
          </HStack>
        </Title>

        <Title text={t('Дата создания')}>
          <HStack justify="start">
            <Icon className={styles.info_icon} Icon={MdOutlineCalendarMonth} />
            <Text className={styles.info_text} text={createdAt} />
          </HStack>
        </Title>

        <Title text={t('Теги')}>
          <HStack justify="start">
            <Icon className={styles.info_icon} Icon={MdOutlineDataArray} />
            {tagsArr}
          </HStack>
        </Title>
      </HStack>

      {blocksArr}
    </VStack>
  );
};
