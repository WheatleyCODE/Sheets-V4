import { FC, useCallback, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MdOpenInBrowser,
  MdOutlineCalendarMonth,
  MdOutlineDataArray,
  MdOutlineOpenInNew,
  MdOutlineVisibility,
} from 'react-icons/md';
import { ITemplate, TemplateView } from '../../model/types/template';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplateListItem.module.scss';
import { Image } from 'shared/ui/image';
import { Text } from 'shared/ui/text';
import { Icon } from 'shared/ui/icon';
import { Title } from 'shared/ui/title';
import { Button } from 'shared/ui/button';
import { ButtonColor } from 'shared/ui/button/ui/button/interface';
import { Card } from 'shared/ui/card';
import { useNavigate } from 'react-router-dom';
import { RoutesPath } from 'shared/config/route-config/routeConfig';

interface ITemplateListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  template: ITemplate;
  view: TemplateView;
}

export const TemplateListItem: FC<ITemplateListItemProps> = (props) => {
  const { className, template, view, ...anotherProps } = props;
  const { title, createdAt, tags, views, image, subtitle, id } = template;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateToTemplate = useCallback(() => {
    navigate(RoutesPath.template_details + id);
  }, [id, navigate]);

  const openInSheets = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <div
      {...anotherProps}
      onClick={navigateToTemplate}
      data-testid="templateListItem"
      className={classNames(styles.template_list_item, {}, [className, styles[view]])}
    >
      <Card className={styles.card}>
        <div className={styles.image_container}>
          <Image className={styles.image} src={image} />
        </div>

        <div className={styles.info}>
          <Title text={t('Просмотры')}>
            <div className={styles.info_row}>
              <Icon className={styles.icon} Icon={MdOutlineVisibility} />
              <Text className={styles.info_text} text={String(views)} />
            </div>
          </Title>

          <Title text={t('Дата создания')}>
            <div className={styles.info_row}>
              <Icon className={styles.icon} Icon={MdOutlineCalendarMonth} />
              <Text className={styles.info_text} text={createdAt} />
            </div>
          </Title>

          <Title text={`${t('Теги')}: ${tags.join(', ')}`}>
            <div className={styles.info_row}>
              <Icon className={styles.icon} Icon={MdOutlineDataArray} />
              <Text className={classNames(styles.info_text, {}, [styles.tags])} text={tags.join(', ')} />
            </div>
          </Title>
        </div>

        <div className={styles.text}>
          <Title className={styles.hover_title} text={title}>
            <Text className={styles.text_title} title={title} />
          </Title>
          <Title className={styles.hover_title} text={subtitle}>
            <Text className={styles.text_subtitle} text={subtitle} />
          </Title>
        </div>

        <div className={styles.buttons}>
          <Title text={t('Открыть шаблон в таблицах')}>
            <Button
              onClick={openInSheets}
              Icon={MdOutlineOpenInNew}
              buttonColor={ButtonColor.PRIMARY}
              text={t('Открыть в таблицах')}
            />
          </Title>
          <Title text={t('Открыть страницу подробного просмотра')}>
            <Button Icon={MdOpenInBrowser} buttonColor={ButtonColor.SECONDARY} text={t('Подробнее')} />
          </Title>
        </div>
      </Card>
    </div>
  );
};
