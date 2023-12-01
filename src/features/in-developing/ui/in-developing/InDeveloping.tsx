/* eslint-disable i18next/no-literal-string */
import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import { useTranslation } from 'react-i18next';
import type { IInDevelopingProps } from './InDeveloping.interface';
import './InDeveloping.scss';

export const InDeveloping: FC<IInDevelopingProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="inDeveloping" className={classNames('in_developing', {}, [className])}>
      <div className="fs">
        <div className="hold-illustration w-preserve-3d">
          <div className="background w-clearfix">
            <div className="left-strip"></div>
            <div className="top-bar">
              <div className="dot"></div>
              <div className="_2 dot"></div>
              <div className="_3 dot"></div>
            </div>
            <div className="text-like-box w-clearfix">
              <div className="text" data-ix="arrow-load">
                A
              </div>
              <div className="straight-line" data-ix="arrow-load"></div>
              <div className="straight-line-full" data-ix="loading-line-animation"></div>
              <div className="straight-line-full" data-ix="loading-line-animation-2"></div>
              <div className="straight-line-full" data-ix="loading-line-animation-3"></div>
              <div className="straight-line-full" data-ix="loading-line-animation-6-long"></div>
              <div className="straight-line-full" data-ix="loading-line-animation-5"></div>
              <div className="shortened straight-line-full" data-ix="loading-line-animation-6shorted"></div>
            </div>
            <div className="mountain-photo-parent">
              <div className="mountain-photo__real-deal" data-ix="arrow-load">
                <div className="mountain" data-ix="mountain-slide-in-from-left"></div>
                <div className="_2 mountain" data-ix="mountain-slide-in"></div>
              </div>
              <div className="arrow-line" data-ix="arrow-load">
                <div className="arrow-line-small"></div>
                <div className="arrow-line-small v2"></div>
              </div>
            </div>
            <div className="square-tower" data-ix="arrow-load">
              <div className="play-box w-preserve-3d" data-ix="tower-hover-animation">
                <div className="play-box__top-bar"></div>
                <a className="overflow-hidden w-inline-block w-lightbox" href="#">
                  <div className="play-box__play-icon" data-ix="play-icon-on-load"></div>
                </a>
              </div>
              <div className="play-box__square-1 w-preserve-3d"></div>
              <div className="play-box__square-2 w-preserve-3d"></div>
              <div className="play-box__square-bottom"></div>
            </div>
            <div className="tri-parent w-clearfix">
              <div className="column" data-ix="column-hover">
                <div className="circle" data-ix="pop-in"></div>
                <div className="straight-line-full" data-ix="loading-line-animation"></div>
                <div className="straight-line-full" data-ix="loading-line-animation-2"></div>
                <div className="straight-line-full" data-ix="loading-line-animation-3"></div>
              </div>
              <div className="column" data-ix="column-hover-2">
                <div className="circle" data-ix="pop-in-2"></div>
                <div className="straight-line-full" data-ix="loading-line-animation">
                  <div className="straight-line-full"></div>
                </div>
                <div className="straight-line-full" data-ix="loading-line-animation-2">
                  <div className="straight-line-full"></div>
                </div>
                <div className="straight-line-full" data-ix="loading-line-animation-3">
                  <div className="straight-line-full"></div>
                </div>
              </div>
              <div className="column" data-ix="column-hover-3">
                <div className="circle" data-ix="pop-in-3"></div>
                <div className="straight-line-full" data-ix="loading-line-animation">
                  <div className="straight-line-full"></div>
                </div>
                <div className="straight-line-full" data-ix="loading-line-animation-2">
                  <div className="straight-line-full"></div>
                </div>
                <div className="straight-line-full" data-ix="loading-line-animation-3">
                  <div className="straight-line-full"></div>
                </div>
              </div>
              <div className="string-block" data-ix="hovering-on-load-string-block">
                <div className="square">
                  <div className="connector-bar"></div>
                </div>
                <div className="_2 square"></div>
                <div className="_3 square">
                  <div className="connector-bar"></div>
                </div>
              </div>
              <div className="bottom text-like-box v2 w-clearfix" data-ix="column-hover">
                <div className="straight-line-full" data-ix="loading-line-animation"></div>
                <div className="straight-line-full" data-ix="loading-line-animation-2"></div>
                <div className="straight-line-full" data-ix="loading-line-animation-3"></div>
                <div className="straight-line-full" data-ix="loading-line-animation-6-long"></div>
                <div className="shortened straight-line-full" data-ix="loading-line-animation-4-shortened"></div>
                <div className="mountain-photo__real-deal small" data-ix="column-hover">
                  <div className="mountain shrunked" data-ix="mountain-slide-in-from-left"></div>
                  <div className="_2 mountain shrunked" data-ix="mountain-slide-in"></div>
                </div>
                <div className="mountain-photo__real-deal no-mountains small" data-ix="column-hover"></div>
              </div>
            </div>
            <div className="bottom text-like-box" data-ix="column-hover">
              <div className="straight-line-full" data-ix="loading-line-animation"></div>
              <div className="straight-line-full" data-ix="loading-line-animation-2"></div>
              <div className="straight-line-full" data-ix="loading-line-animation-3"></div>
              <div className="shortened straight-line-full" data-ix="loading-line-animation-4-shortened"></div>
            </div>
            <div className="bottom-line-bar" data-ix="column-hover-3"></div>
            <div className="circle-tower" data-ix="column-hover">
              <div className="circle-top w-preserve-3d"></div>
              <div className="_2 circle-top w-preserve-3d"></div>
              <div className="_3 circle-top"></div>
            </div>
          </div>
        </div>

        <h1 className="in_developing__title">{t('Страница в разработке')}</h1>
      </div>
    </div>
  );
};
