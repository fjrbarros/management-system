import { act, render } from '@testing-library/react';
import React, { useState } from 'react';
import { ColorModeContext } from './Context';
import { ThemeProvider } from './ThemeProvider';

const mockUseMediaQuery = jest.fn().mockImplementation(() => false);

const mockUseLocalStorage = jest
  .fn()
  .mockImplementation((_key, initialValue) => {
    const [storedValue, setStoredValue] = useState(initialValue);
    return [storedValue, setStoredValue];
  });

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: () => mockUseMediaQuery(),
}));

jest.mock('@hooks', () => ({
  useLocalStorage: () => mockUseLocalStorage(),
}));

let colorModeContextValue: { toggleColorMode: () => void } | undefined;

describe('ThemeProvider', () => {
  it('provides the color mode context and toggles color mode', () => {
    const setThemeModeSpy = jest.fn();
    mockUseLocalStorage.mockImplementation((_key, initialValue) => {
      const [storedValue] = useState(initialValue);
      return [storedValue, setThemeModeSpy];
    });

    const TestComponent = () => {
      colorModeContextValue = React.useContext(ColorModeContext);
      return null;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(colorModeContextValue).toEqual({
      toggleColorMode: expect.any(Function),
    });

    act(() => {
      colorModeContextValue?.toggleColorMode();
    });

    expect(setThemeModeSpy).toHaveBeenCalledWith('light');
  });

  it('toggles color mode from dark to light', () => {
    const setThemeModeSpy = jest.fn();
    mockUseLocalStorage.mockImplementation(() => {
      const [storedValue] = useState('light');
      return [storedValue, setThemeModeSpy];
    });

    const TestComponent = () => {
      colorModeContextValue = React.useContext(ColorModeContext);
      return null;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    act(() => {
      colorModeContextValue?.toggleColorMode();
    });

    expect(setThemeModeSpy).toHaveBeenCalledWith('dark');
  });
});
