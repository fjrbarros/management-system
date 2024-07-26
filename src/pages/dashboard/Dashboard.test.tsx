import { useModules } from '@hooks';
import { screen } from '@testing-library/react';
import { customRender } from '@utils';
import Dashboard from './Dashboard';

jest.mock('react-router-dom');

jest.mock('@hooks', () => ({
  ...jest.requireActual('@hooks'),
  useModules: jest.fn(() => ({ modules: [] })),
}));

describe('Dashboard', () => {
  const useModulesMock = useModules as jest.Mock;

  beforeEach(() => {
    useModulesMock.mockImplementation(() => ({ modules: [] }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders PageWrapper with correct title', () => {
    customRender(<Dashboard />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders Card components for non-selected modules', () => {
    const modules = [
      {
        id: 'dashboard',
        icon: 'Home',
        title: 'Dashboard',
        uri: '/home',
        isSelected: false,
      },
      {
        id: 'user',
        icon: 'People',
        title: 'User',
        uri: '/user',
        isSelected: true,
      },
    ];
    useModulesMock.mockImplementation(() => ({ modules }));

    customRender(<Dashboard />);

    expect(screen.queryAllByText(/dashboard/i)).toHaveLength(2);
    expect(screen.queryAllByText(/user/i)).toHaveLength(1);
  });
});
