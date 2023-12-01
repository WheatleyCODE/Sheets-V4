import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { MdChevronLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getRouteTemplates, getRouteTemplateEdit } from '@/shared/config/route-config/routeConfig';
import { useTemplateDetails } from '@/entities/template';
import { Title } from '@/shared/ui/title';
import { Button } from '@/shared/ui/button';
import { useTemplateDetailsIsCanEdit } from '../../model/selectors/get-template-details-is-can-edit/getTemplateDetailsIsCanEdit';
import { HStack, Width } from '@/shared/ui/containers';
import { classNames } from '@/shared/lib/class-names';
import type { ITemplateDetailsPageHeaderProps } from './TemplateDetailsPageHeader.interface';
import styles from './TemplateDetailsPageHeader.module.scss';

export const TemplateDetailsPageHeader: FC<ITemplateDetailsPageHeaderProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const navigate = useNavigate();
  const template = useTemplateDetails();
  const isCanEdit = useTemplateDetailsIsCanEdit();
  const { t } = useTranslation('template-details');

  const navigateToTemplates = useCallback(() => {
    navigate(getRouteTemplates());
  }, [navigate]);

  const navigateToTemplatesEdit = useCallback(() => {
    navigate(getRouteTemplateEdit(template.id));
  }, [navigate, template.id]);

  return (
    <HStack
      {...anotherProps}
      data-testid="templateDetailsPageHeader"
      className={classNames(styles.template_details_page_header, {}, [className])}
    >
      <Width maxWidth="template" className={styles.width}>
        <HStack justify="space-between">
          <div className={styles.back}>
            <Title text={t('Вернуться к шаблонам')}>
              <Button onClick={navigateToTemplates} Icon={MdChevronLeft} text={t('Вернуться к шаблонам')} />
            </Title>
          </div>

          {isCanEdit && (
            <div className={styles.edit}>
              <Title text={t('Редактировать шаблон')}>
                <Button onClick={navigateToTemplatesEdit} Icon={MdChevronLeft} text={t('Редактировать')} />
              </Title>
            </div>
          )}
        </HStack>
      </Width>
    </HStack>
  );
});
