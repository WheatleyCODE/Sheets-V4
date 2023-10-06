import { fireEvent, screen } from '@testing-library/react';
import { ProfileCardEdit } from './ProfileCardEdit';
import { renderComponent } from 'shared/lib/tests/render-component/renderComponent';

describe('ProfileCardEdit', () => {
  test('In the document + readonly', () => {
    const disableProfileChange = jest.fn();
    const enableProfileChange = jest.fn();
    const saveProfileChange = jest.fn();

    const validHooks: any = {};

    renderComponent(
      <ProfileCardEdit
        disableProfileChange={disableProfileChange}
        enableProfileChange={enableProfileChange}
        saveProfileChange={saveProfileChange}
        validHooks={validHooks}
        isReadonly={true}
      />,
    );

    expect(screen.getByTestId('profileCardEdit')).toBeInTheDocument();
    expect(screen.getByText('Редактировать')).toBeInTheDocument();
  });

  test('In the document', () => {
    const disableProfileChange = jest.fn();
    const enableProfileChange = jest.fn();
    const saveProfileChange = jest.fn();

    const validHooks: any = {};

    renderComponent(
      <ProfileCardEdit
        disableProfileChange={disableProfileChange}
        enableProfileChange={enableProfileChange}
        saveProfileChange={saveProfileChange}
        validHooks={validHooks}
        isReadonly={false}
      />,
    );

    expect(screen.getByTestId('profileCardEdit')).toBeInTheDocument();
    expect(screen.getByText('Отменить')).toBeInTheDocument();
    expect(screen.getByText('Сохранить')).toBeInTheDocument();
  });

  test('In the document + readonly + callback', () => {
    const disableProfileChange = jest.fn();
    const enableProfileChange = jest.fn();
    const saveProfileChange = jest.fn();

    const validHooks: any = {};

    renderComponent(
      <ProfileCardEdit
        disableProfileChange={disableProfileChange}
        enableProfileChange={enableProfileChange}
        saveProfileChange={saveProfileChange}
        validHooks={validHooks}
        isReadonly={true}
      />,
    );

    const button = screen.getByText('Редактировать');

    fireEvent.click(button);

    expect(screen.getByTestId('profileCardEdit')).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(enableProfileChange.mock.calls).toHaveLength(1);
  });

  test('In the document', () => {
    const disableProfileChange = jest.fn();
    const enableProfileChange = jest.fn();
    const saveProfileChange = jest.fn();

    const validHooks: any = {};

    renderComponent(
      <ProfileCardEdit
        disableProfileChange={disableProfileChange}
        enableProfileChange={enableProfileChange}
        saveProfileChange={saveProfileChange}
        validHooks={validHooks}
        isReadonly={false}
      />,
    );

    const cancelButton = screen.getByText('Отменить');
    const saveButton = screen.getByText('Сохранить');

    fireEvent.click(cancelButton);
    fireEvent.click(saveButton);

    expect(screen.getByTestId('profileCardEdit')).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(disableProfileChange.mock.calls).toHaveLength(1);
    expect(saveProfileChange.mock.calls).toHaveLength(1);
  });
});
