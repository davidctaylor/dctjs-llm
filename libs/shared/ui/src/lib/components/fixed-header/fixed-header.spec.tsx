import { render } from '@testing-library/react';

import { FixedHeader } from './fixed-header';

describe('FixedHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FixedHeader title='test header'/>);
    expect(baseElement).toBeTruthy();
  });
});
