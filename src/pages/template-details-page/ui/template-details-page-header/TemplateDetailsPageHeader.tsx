import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplateDetailsPageHeader.module.scss';
import { useNavigate } from 'react-router-dom';
import { RoutesPath } from 'shared/config/route-config/routeConfig';
import { Title } from 'shared/ui/title';
import { Button } from 'shared/ui/button';
import { MdChevronLeft } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { getUser } from 'entities/user';
import { getTemplateDetails } from 'entities/template';
import { getTemplateDetailsIsCanEdit } from '../../model/selectors/get-template-details-is-can-edit/getTemplateDetailsIsCanEdit';

interface ITemplateDetailsPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

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
    // ! Fix path lib
    navigate(RoutesPath.template_details + template.id + '/edit');
  }, [template.id]);

  return (
    <div
      {...anotherProps}
      data-testid="templateDetailsPageHeader"
      className={classNames(styles.template_details_page_header, {}, [className])}
    >
      <div className={styles.width}>
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
      </div>
    </div>
  );
};
