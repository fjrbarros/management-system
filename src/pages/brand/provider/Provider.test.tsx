import { act, render } from '@testing-library/react';
import { useContext } from 'react';
import { Context } from './Context';
import { BrandProvider } from './Provider';
import { IContext } from './types';

describe('BrandProvider', () => {
  let contextValue: IContext = {} as IContext;

  const TestComponent = () => {
    contextValue = useContext(Context);
    return null;
  };

  beforeEach(() => {
    render(
      <BrandProvider>
        <TestComponent />
      </BrandProvider>,
    );
  });

  it('provides the initial context values', () => {
    expect(contextValue.openModal).toBe(false);
    expect(contextValue.updateBrand).toBeUndefined();
    expect(contextValue.openDeleteModal).toBe(false);
    expect(contextValue.deleteBrand).toBeUndefined();
  });

  it('opens and closes the modal', () => {
    act(() => {
      contextValue.handleOpenModal();
    });
    expect(contextValue.openModal).toBe(true);

    act(() => {
      contextValue.handleCloseModal();
    });
    expect(contextValue.openModal).toBe(false);
    expect(contextValue.updateBrand).toBeUndefined();
  });

  it('opens and closes the delete modal', () => {
    act(() => {
      contextValue.setDeleteBrand({
        brand_id: '1',
        name: 'Brand',
      });
    });
    expect(contextValue.openDeleteModal).toBe(true);

    act(() => {
      contextValue.handleCloseDeleteModal();
    });
    expect(contextValue.openDeleteModal).toBe(false);
    expect(contextValue.deleteBrand).toBeUndefined();
  });

  it('sets update brand and opens modal', () => {
    const updateBrand = { brand_id: '1', name: 'Brand' };
    act(() => {
      contextValue.setUpdateBrand(updateBrand);
    });
    expect(contextValue.updateBrand).toEqual(updateBrand);
    expect(contextValue.openModal).toBe(true);
  });

  it('sets delete brand and opens delete modal', () => {
    const deleteBrand = { brand_id: '1', name: 'Brand' };
    act(() => {
      contextValue.setDeleteBrand(deleteBrand);
    });
    expect(contextValue.deleteBrand).toEqual(deleteBrand);
    expect(contextValue.openDeleteModal).toBe(true);
  });
});
