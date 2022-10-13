import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../../client/Components/Dashboard';
import userEvent from '@testing-library/user-event';

describe('Drawer', () => {
  beforeEach(() => {
    render(<Dashboard />);
  });
});
