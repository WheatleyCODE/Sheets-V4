import type { Meta, StoryObj } from '@storybook/react';
import { TemplateCodeBlock } from './TemplateCodeBlock';
import { Theme } from '@/app/providers/lib';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';
import { TemplateBlockTypes } from '../../model/consts/template.consts';

const meta = {
  title: 'entities/template/TemplateCodeBlock',
  component: TemplateCodeBlock,
} satisfies Meta<typeof TemplateCodeBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    block: {
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
    },
  },
};

export const Dark: Story = {
  args: {
    block: {
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
    },
  },
  decorators: [themeDecorator(Theme.DARK)],
};
