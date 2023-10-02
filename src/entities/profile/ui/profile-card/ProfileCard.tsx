import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getProfile } from 'entities/profile/model/selectors/get-profile/getProfile';
import { classNames } from 'shared/lib/class-names';
import styles from './ProfileCard.module.scss';
import { useTranslation } from 'react-i18next';
interface IProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ProfileCard: FC<IProfileCardProps> = (props) => {
  const { t } = useTranslation('profile');

  const { className, ...anotherProps } = props;
  const profile = useSelector(getProfile);

  return (
    <div {...anotherProps} className={classNames(styles.profile_card, {}, [className])}>
      {JSON.stringify(profile, null, 4)}
    </div>
  );
};
