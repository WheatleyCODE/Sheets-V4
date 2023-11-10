import { fireEvent, screen } from '@testing-library/react';
import { TemplatesViewSwitcher } from './TemplatesViewSwitcher';
import { renderComponent } from '@/shared/lib/tests/render-component/renderComponent';
import { TemplateView } from '@/entities/template';

describe('TemplatesViewSwitcher', () => {
  test('In the document', () => {
    renderComponent(<TemplatesViewSwitcher changeView={() => {}} view={TemplateView.SQUARES} />);

    expect(screen.getByTestId('templatesViewSwitcher')).toBeInTheDocument();
    expect(screen.getByTestId('buttonSquares')).toBeInTheDocument();
    expect(screen.getByTestId('buttonLines')).toBeInTheDocument();
  });

  test('In the document + change view squares', () => {
    const changeView = jest.fn();

    renderComponent(<TemplatesViewSwitcher changeView={changeView} view={TemplateView.SQUARES} />);

    const buttonSquares = screen.getByTestId('buttonSquares');
    const buttonLines = screen.getByTestId('buttonLines');

    fireEvent.click(buttonSquares);

    expect(changeView.mock.calls.length).toBe(1);
    expect(changeView.mock.calls[0][0]).toBe(TemplateView.SQUARES);
    expect(buttonSquares).toBeInTheDocument();
    expect(buttonLines).toBeInTheDocument();
    expect(screen.getByTestId('templatesViewSwitcher')).toBeInTheDocument();
  });

  test('In the document + change view lines', () => {
    const changeView = jest.fn();

    renderComponent(<TemplatesViewSwitcher changeView={changeView} view={TemplateView.SQUARES} />);

    const buttonSquares = screen.getByTestId('buttonSquares');
    const buttonLines = screen.getByTestId('buttonLines');

    fireEvent.click(buttonLines);

    expect(changeView.mock.calls.length).toBe(1);
    expect(changeView.mock.calls[0][0]).toBe(TemplateView.LINES);
    expect(buttonSquares).toBeInTheDocument();
    expect(buttonLines).toBeInTheDocument();
    expect(screen.getByTestId('templatesViewSwitcher')).toBeInTheDocument();
  });
});
