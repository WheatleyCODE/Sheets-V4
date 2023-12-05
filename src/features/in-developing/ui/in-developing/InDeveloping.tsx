import { FC } from 'react';
import { Platform } from '../../animations/platform/Platform';
import { MacHeader } from '../../animations/mac/ui/mac-header/MacHeader';
import { BrowserHeader } from '../../animations/browser-header/BrowserHeader';
import { Page } from '../../animations/page/ui/page/Page';
import { PageHeader } from '../../animations/page/ui/page-header/PageHeader';
import { PageMain } from '../../animations/page/ui/page-main/PageMain';
import { PageRow } from '../../animations/page/ui/page-row/PageRow';
import { TextWidget } from '../../animations/text-widget/TextWidget';
import { ImageWidget } from '../../animations/image-widget/ImageWidget';
import { GithubWidget } from '../../animations/github-widget/GithubWidget';
import { CardsWidget } from '../../animations/cards-widget/CardsWidget';
import { MacProcess } from '../../animations/mac/ui/mac-process/MacProcess';
import { CommentsWidget } from '../../animations/comments-widget/CommentsWidget';
import { GalleryWidget } from '../../animations/gallery-widget/GalleryWidget';
import { Animation } from '../../animations/animation/Animation';
import { useTheme } from '@/shared/lib/hooks';
import { TabsWidget } from '../../animations/tabs-widget/ui/tabs-widget/TabsWidget';
import { classNames } from '@/shared/lib/class-names';
import type { IInDevelopingProps } from './InDeveloping.interface';
import styles from './InDeveloping.module.scss';
import '../../styles/globals.scss';
import '../../styles/variables.scss';
import { getInitialAnimation } from '../../consts/animations';

export const InDeveloping: FC<IInDevelopingProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { theme } = useTheme();

  return (
    <div
      {...anotherProps}
      data-testid="inDeveloping"
      className={classNames(styles.in_developing, {}, [className, 'in_developing', 'animation', theme])}
    >
      <Animation>
        <Platform>
          <MacHeader {...getInitialAnimation(4)}>
            <MacProcess {...getInitialAnimation(5)} />
          </MacHeader>

          <BrowserHeader {...getInitialAnimation(6)} />

          <Page>
            <PageHeader {...getInitialAnimation(7)} />

            <PageMain>
              <PageRow>
                <TextWidget {...getInitialAnimation(8)} delayLinesAnimation={8} />
                <ImageWidget {...getInitialAnimation(9)} />
              </PageRow>

              <PageRow>
                <GithubWidget {...getInitialAnimation(10)} />
                <CardsWidget {...getInitialAnimation(11)} />
              </PageRow>

              <PageRow>
                <CommentsWidget {...getInitialAnimation(12)} />
                <TextWidget {...getInitialAnimation(13)} delayLinesAnimation={13} />
              </PageRow>

              <PageRow>
                <GalleryWidget {...getInitialAnimation(14)} />
                <TabsWidget {...getInitialAnimation(15)} />
              </PageRow>
            </PageMain>
          </Page>
        </Platform>
      </Animation>
    </div>
  );
};
