import { fireEvent, screen } from '@testing-library/react';
import { Input } from './Input';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';
import { MdHome } from 'react-icons/md';

describe('Modal', () => {
  // test('In the document', () => {
  //   renderComponent(
  //     <Input
  //       value="input"
  //       Icon={MdHome}
  //       type="text"
  //       isError={false}
  //       isActive={false}
  //       validError={null}
  //       isFocus={false}
  //       isTouched={false}
  //       isReadonly={false}
  //     />,
  //   );
  //   expect(screen.getByTestId('input-icon')).toBeInTheDocument();
  //   expect(screen.getByTestId('input')).toBeInTheDocument();
  //   expect(screen.getByDisplayValue('input')).toBeInTheDocument();
  // });
  // // test('In the document + options', () => {
  // //   renderComponent(
  // //     <Input
  // //       value="input"
  // //       Icon={MdHome}
  // //       type="text"
  // //       isError={false}
  // //       isActive={false}
  // //       validError={null}
  // //       isFocus={false}
  // //       isTouched={false}
  // //       isReadonly={false}
  // //       options={{
  // //         changeValue: () => {},
  // //         items: [
  // //           { text: 'option1', value: 'value1' },
  // //           { text: 'option2', value: 'value1' },
  // //         ],
  // //       }}
  // //     />,
  // //   );
  // //   expect(screen.getByTestId('input-icon')).toBeInTheDocument();
  // //   expect(screen.getByTestId('input')).toBeInTheDocument();
  // //   expect(screen.queryByText('option1')).not.toBeInTheDocument();
  // //   expect(screen.queryByText('option2')).not.toBeInTheDocument();
  // //   expect(screen.getByDisplayValue('input')).toBeInTheDocument();
  // // });
  // // test('In the document + options focus', () => {
  // //   renderComponent(
  // //     <Input
  // //       value="input"
  // //       Icon={MdHome}
  // //       type="text"
  // //       isError={false}
  // //       isActive={false}
  // //       validError={null}
  // //       isFocus={true}
  // //       isTouched={false}
  // //       isReadonly={false}
  // //       options={{
  // //         changeValue: () => {},
  // //         items: [
  // //           { text: 'option1', value: 'value1' },
  // //           { text: 'option2', value: 'value2' },
  // //         ],
  // //       }}
  // //     />,
  // //   );
  // //   expect(screen.getByTestId('input-icon')).toBeInTheDocument();
  // //   expect(screen.getByTestId('input')).toBeInTheDocument();
  // //   expect(screen.getByText('option1')).toBeInTheDocument();
  // //   expect(screen.getByText('option2')).toBeInTheDocument();
  // //   expect(screen.getByDisplayValue('input')).toBeInTheDocument();
  // // });
  // // test('In the document + options + focus + readonly', () => {
  // //   renderComponent(
  // //     <Input
  // //       value="input"
  // //       Icon={MdHome}
  // //       type="text"
  // //       isError={false}
  // //       isActive={false}
  // //       validError={null}
  // //       isFocus={true}
  // //       isTouched={false}
  // //       isReadonly={true}
  // //       options={{
  // //         changeValue: () => {},
  // //         items: [
  // //           { text: 'option1', value: 'value1' },
  // //           { text: 'option2', value: 'value2' },
  // //         ],
  // //       }}
  // //     />,
  // //   );
  // //   expect(screen.getByTestId('input-icon')).toBeInTheDocument();
  // //   expect(screen.getByTestId('input')).toBeInTheDocument();
  // //   expect(screen.queryByText('option1')).not.toBeInTheDocument();
  // //   expect(screen.queryByText('option2')).not.toBeInTheDocument();
  // //   expect(screen.getByDisplayValue('input')).toBeInTheDocument();
  // // });
  // test('In the document + error', () => {
  //   renderComponent(
  //     <Input
  //       value="input"
  //       Icon={MdHome}
  //       type="text"
  //       isError={false}
  //       isActive={false}
  //       validError={'Ошибка валидации'}
  //       isFocus={false}
  //       isTouched={false}
  //       isReadonly={false}
  //     />,
  //   );
  //   expect(screen.getByTestId('input-icon')).toBeInTheDocument();
  //   expect(screen.getByTestId('input')).toBeInTheDocument();
  //   expect(screen.getByDisplayValue('input')).toBeInTheDocument();
  //   expect(screen.queryByText('Ошибка валидации')).not.toBeInTheDocument();
  // });
  // test('In the document + error + isError={true}', () => {
  //   renderComponent(
  //     <Input
  //       value="input"
  //       Icon={MdHome}
  //       type="text"
  //       isError={true}
  //       validError={'Ошибка валидации'}
  //       isFocus={false}
  //       isTouched={false}
  //       isReadonly={false}
  //     />,
  //   );
  //   expect(screen.getByTestId('input-icon')).toBeInTheDocument();
  //   expect(screen.getByTestId('input')).toBeInTheDocument();
  //   expect(screen.getByDisplayValue('input')).toBeInTheDocument();
  //   expect(screen.getByText('Ошибка валидации')).toBeInTheDocument();
  // });
  // test('In the document + input', () => {
  //   const callback = jest.fn();
  //   renderComponent(
  //     <Input
  //       value="input"
  //       Icon={MdHome}
  //       type="text"
  //       isError={false}
  //       isActive={false}
  //       validError={null}
  //       isFocus={false}
  //       isTouched={false}
  //       isReadonly={false}
  //       onChange={callback}
  //     />,
  //   );
  //   const input = screen.getByTestId('input');
  //   expect(input).toBeInTheDocument();
  //   fireEvent(input, new MouseEvent('click', { bubbles: true, cancelable: true }));
  //   fireEvent.change(input, {
  //     target: { value: 'test' },
  //   });
  //   expect(callback.mock.calls).toHaveLength(1);
  //   expect(screen.getByDisplayValue('input')).toBeInTheDocument();
  // });
});
