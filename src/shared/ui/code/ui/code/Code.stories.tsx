import type { Meta, StoryObj } from '@storybook/react';
import { Code } from './Code';
import { Theme } from '@/app/providers/lib';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/Code',
  component: Code,
} satisfies Meta<typeof Code>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
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
  },
};

export const Dark: Story = {
  args: {
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
  },
  decorators: [themeDecorator(Theme.DARK)],
};
