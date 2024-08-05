import { render } from '@testing-library/react';

import PageBuilderUi from './page-builder-ui';

describe('PageBuilderUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageBuilderUi />);
    expect(baseElement).toBeTruthy();
  });
});
