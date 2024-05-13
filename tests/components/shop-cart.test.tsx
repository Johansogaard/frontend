import React from 'react';
import renderer from 'react-test-renderer';
import { Menubar } from '../../src/menubar/menubar';
import { test } from 'vitest';

test('renders correctly', () => {
    const tree = renderer
        .create(<Menubar />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
