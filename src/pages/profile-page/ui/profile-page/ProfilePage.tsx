import { FC, memo } from 'react';
import { EditableProfile } from '@/widgets/editable-profile';
import { classNames } from '@/shared/lib/class-names';
import styles from './ProfilePage.module.scss';

const ProfilePage: FC = memo(() => {
  return (
    <section data-testid="profilePage" className={classNames(styles.profile_page, {}, [])}>
      <EditableProfile />
    </section>
  );
});

export default ProfilePage;
