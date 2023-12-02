import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import type { IInDevelopingProps } from './InDeveloping.interface';
import styles from './InDeveloping.module.scss';
import { Platform } from '../platform/Platform';
import { MacHeader } from '../mac-header/MacHeader';
import { BrowserHeader } from '../browser-header/BrowserHeader';
import { Page } from '../page/Page';
import { PageHeader } from '../page-header/PageHeader';
import { PageMain } from '../page-main/PageMain';
import { PageRow } from '../page-row/PageRow';
import { TextWidget } from '../text-widget/TextWidget';
import { ImageWidget } from '../image-widget/ImageWidget';
import { GithubWidget } from '../github-widget/GithubWidget';
import { CardsWidget } from '../cards-widget/CardsWidget';
import { MacProcess } from '../mac-process/MacProcess';
import { CommentsWidget } from '../comments-widget/CommentsWidget';
import { GalleryWidget } from '../gallery-widget/GalleryWidget';
import { TabsWidget } from '../tabs-widget/TabsWidget';

export const InDeveloping: FC<IInDevelopingProps> = (props) => {
  const { className, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="inDeveloping" className={classNames(styles.in_developing, {}, [className])}>
      <Platform>
        <MacHeader>
          <MacProcess />
        </MacHeader>

        <BrowserHeader />

        <Page>
          <PageHeader />

          <PageMain>
            <PageRow>
              <TextWidget />
              <ImageWidget />
            </PageRow>

            <PageRow>
              <GithubWidget />
              <CardsWidget />
            </PageRow>

            <PageRow>
              <TextWidget />
              <CommentsWidget />
            </PageRow>

            <PageRow>
              <GalleryWidget />
              <TabsWidget />
            </PageRow>
          </PageMain>
        </Page>
      </Platform>
    </div>
  );
};
