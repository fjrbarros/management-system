/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, waitFor } from '@testing-library/react';
import { customRender } from '@utils';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routersConfig } from './routers';

describe('routers', () => {
  it('should render dashboard when router is /', async () => {
    const router = createMemoryRouter(routersConfig, {
      initialEntries: ['/'],
    });

    customRender(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.queryAllByText(/dashboard/i)).toHaveLength(2);
    });
  });

  it('should render user when router is /user', async () => {
    const router = createMemoryRouter(routersConfig, {
      initialEntries: ['/user'],
    });

    customRender(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.queryAllByText(/usuário/i)).toHaveLength(2);
    });
  });

  it('should render product when router is /product', async () => {
    const router = createMemoryRouter(routersConfig, {
      initialEntries: ['/product'],
    });

    customRender(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.queryAllByText(/produto/i)).toHaveLength(2);
    });
  });

  it('should render brand when router is /brand', async () => {
    const router = createMemoryRouter(routersConfig, {
      initialEntries: ['/brand'],
    });

    customRender(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.queryAllByText(/marca/i)).toHaveLength(2);
    });
  });

  it('should render not found when router is not defined', async () => {
    const router = createMemoryRouter(routersConfig, {
      initialEntries: ['/not-found'],
    });

    customRender(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText(/404/i)).toBeInTheDocument();
    });
  });
});
