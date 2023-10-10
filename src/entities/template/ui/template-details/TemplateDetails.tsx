import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ITemplate, TemplateBlock, TemplateBlockTypes } from '../../model/types/template';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplateDetails.module.scss';
import { Text, TextSize, TextStyle } from 'shared/ui/text';
import { Skeleton } from 'shared/ui/skeleton';
import { Icon } from 'shared/ui/icon';
import { MdOutlineCalendarMonth, MdOutlineDataArray, MdOutlineOpenInNew, MdOutlineVisibility } from 'react-icons/md';
import { intoIter } from 'shared/lib/iterators';
import { TemplateTextBlock } from '../template-text-block/TemplateTextBlock';
import { TemplateCodeBlock } from '../template-code-block/TemplateCodeBlock';
import { TemplateImageBlock } from '../template-image-block/TemplateImageBlock';
import { Image } from 'shared/ui/image';
import { Button } from 'shared/ui/button';
import { ButtonColor } from 'shared/ui/button/ui/button/interface';
import { Title } from 'shared/ui/title';

interface ITemplateDetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  template: ITemplate;
  isLoading: boolean;
  error: string | null;
}

export const TemplateDetails: FC<ITemplateDetailsProps> = (props) => {
  const { className, template, isLoading, error, ...anotherProps } = props;
  const { blocks, createdAt, id, image, subtitle, tags, title, views } = template;
  const { t } = useTranslation('templateDetails');

  const renderBlock = useCallback((block: TemplateBlock) => {
    switch (block.type) {
      case TemplateBlockTypes.TEXT:
        return <TemplateTextBlock className={styles.block_margin} block={block} />;
      case TemplateBlockTypes.CODE:
        return <TemplateCodeBlock className={styles.block_margin} block={block} />;
      case TemplateBlockTypes.IMAGE:
        return <TemplateImageBlock className={styles.block_margin} block={block} />;
      default:
        return <TemplateTextBlock block={block} />;
    }
  }, []);

  if (isLoading) {
    return (
      <div
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
      </div>
    );
  }

  if (error) {
    return (
      <div
        {...anotherProps}
        data-testid="templateDetails"
        className={classNames(styles.template_details, {}, [className, styles.error])}
      >
        <Text textStyle={TextStyle.ERROR} title={t(error)} />
      </div>
    );
  }

  const tagsArr = intoIter<string>(tags)
    .map((teg) => <Text className={styles.info_text} text={teg} />)
    .toArray();

  const blocksArr = intoIter<TemplateBlock>(blocks).map(renderBlock).toArray();

  return (
    <div
      {...anotherProps}
      data-testid="templateDetails"
      className={classNames(styles.template_details, {}, [className])}
    >
      <div className={classNames(styles.head_image, {}, [styles.head_image_skeleton])}>
        <Image className={styles.image} src={image} />
      </div>

      <div className={classNames(styles.title, {}, [styles.title_skeleton])}>
        <Text textSize={TextSize.BIG} title={title} />
        <Button
          className={styles.open_button}
          Icon={MdOutlineOpenInNew}
          buttonColor={ButtonColor.PRIMARY}
          text={t('Открыть шаблон')}
        />
      </div>

      <div className={classNames(styles.subtitle, {}, [styles.subtitle_skeleton])}>
        <Text text={subtitle} />
      </div>

      <div className={classNames(styles.info, {}, [styles.info_skeleton])}>
        <Title text={t('Просмотры')}>
          <div className={styles.views}>
            <Icon className={styles.info_icon} Icon={MdOutlineVisibility} />
            <Text className={styles.info_text} text={String(views)} />
          </div>
        </Title>

        <Title text={t('Дата создания')}>
          <div className={styles.date}>
            <Icon className={styles.info_icon} Icon={MdOutlineCalendarMonth} />
            <Text className={styles.info_text} text={createdAt} />
          </div>
        </Title>

        <Title text={t('Теги')}>
          <div className={styles.tags}>
            <Icon className={styles.info_icon} Icon={MdOutlineDataArray} />
            {tagsArr}
          </div>
        </Title>
      </div>

      {blocksArr}
    </div>
  );
};
