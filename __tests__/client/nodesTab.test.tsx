import React from 'react';
import { render, screen } from '@testing-library/react';
import NodesTab from '../../client/Components/NodesTab';
import userEvent from '@testing-library/user-event';

describe('Drawer', () => {
  beforeEach(() => {
    render(<NodesTab />);
  });
});
