import { test, describe, expect, vi } from 'vitest';

import { FabDelete } from '../../../src/calendar/components/FabDelete';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../src/store';
import { useCalendarStore } from '../../../src/hooks/useCalendarStore';
import { beforeEach } from 'vitest';

vi.mock('../../../src/hooks/useCalendarStore');

describe('test in <FabDelete>', () => {
  const mockStartDeletingEvent = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
  });
  // test 1
  test('should be show the initialComponent ', () => {
    render(
      <Provider store={store}>
        <FabDelete />
      </Provider>
    );

    screen.debug();
  });

  // test 2
  test('should be render the component ', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: false,
    });

    render(<FabDelete />);

    const btn = screen.getByLabelText('delete');
    // console.log(btn.classList.toString());
    expect(btn.classList).toContain('btn');
    expect(btn.classList).toContain('btn-danger');
    expect(btn.classList).toContain('fab-danger');
    expect(btn.style.display).toBe('none');
  });

  // test 3
  test('should be show the button if has an active event ', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
    });
    render(<FabDelete />);

    const btn = screen.getAllByLabelText('delete');
    console.log(btn.classList.toString());
    expect(btn.style.display).toBe('');
  });

  //test 4
  test('should be call StartDeletingEvent if has an activeEvent ', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      startDeletingEvent: mockStartDeletingEvent,
    });
    render(<FabDelete />);

    const btn = screen.getByLabelText('delete');
    fireEvent.click(btn);
    expect(mockStartDeletingEvent).toHaveBeenCalled();
  });
});
