import { screen } from '@testing-library/react';
import { TemplateCodeBlock } from './TemplateCodeBlock';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';
import { TemplateBlockTypes } from '../../model/types/template';

describe('TemplateCodeBlock', () => {
  test('In the document', () => {
    renderComponent(
      <TemplateCodeBlock
        block={{
          code: `
            interface ITemplateImageBlockProps extends React.HTMLAttributes<HTMLDivElement> {}

            export const TemplateImageBlock: FC<ITemplateImageBlockProps> = memo((props) => {
              const { className, ...anotherProps } = props;
              const { t } = useTranslation();

              return (
                <div
                  {...anotherProps}
                  data-testid="templateImageBlock"
                  className={classNames(styles.template_image_block, {}, [className])}
                >
                  TemplateImageBlock
                </div>
              );
            });
          `,
          id: '1',
          type: TemplateBlockTypes.CODE,
        }}
      />,
    );

    expect(screen.getByTestId('templateCodeBlock')).toBeInTheDocument();
  });
});
