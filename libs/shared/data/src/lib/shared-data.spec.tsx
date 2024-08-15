import { render } from '@testing-library/react';

import SharedData from './shared-data';

describe('SharedData', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedData />);
    expect(baseElement).toBeTruthy();
  });
});
