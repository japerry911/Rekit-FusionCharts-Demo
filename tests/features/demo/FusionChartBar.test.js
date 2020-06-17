import React from 'react';
import { shallow } from 'enzyme';
import { FusionChartBar } from '../../../src/features/demo/FusionChartBar';

describe('demo/FusionChartBar', () => {
  it('renders node with correct class name', () => {
    const props = {
      demo: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <FusionChartBar {...props} />
    );

    expect(
      renderedComponent.find('.demo-fusion-chart-bar').length
    ).toBe(1);
  });
});
