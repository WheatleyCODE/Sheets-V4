import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { MdChevronLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { RoutesPath } from '@/shared/config/route-config/routeConfig';
import { getTemplateDetails } from '@/entities/template';
import { Title } from '@/shared/ui/title';
import { Button } from '@/shared/ui/button';
import { getTemplateDetailsIsCanEdit } from '../../model/selectors/get-template-details-is-can-edit/getTemplateDetailsIsCanEdit';
import { HStack, Width } from '@/shared/ui/containers';
import { concatURLs } from '@/shared/lib/url';
import { classNames } from '@/shared/lib/class-names';
import type { ITemplateDetailsPageHeaderProps } from './TemplateDetailsPageHeader.interface';
import styles from './TemplateDetailsPageHeader.module.scss';

export const TemplateDetailsPageHeader: FC<ITemplateDetailsPageHeaderProps> = (props) => {
  const { className, ...anotherProps } = props;
  const navigate = useNavigate();
  const template = useSelector(getTemplateDetails);
  const isCanEdit = useSelector(getTemplateDetailsIsCanEdit);

  const { t } = useTranslation();

  const navigateToTemplates = useCallback(() => {
    navigate(RoutesPath.templates);
  }, []);

  const navigateToTemplatesEdit = useCallback(() => {
    navigate(concatURLs(RoutesPath.template_details, template.id, 'edit'));
  }, [template.id]);

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
};
