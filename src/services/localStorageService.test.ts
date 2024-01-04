import { LocalStorageServise } from './localStorageService';

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('LocalStorageServise', () => {
  it('should call localStorage.getItem with the given key', () => {
    LocalStorageServise.get('foo');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('foo');
  });

  it('should call localStorage.setItem with the given key and value', () => {
    LocalStorageServise.set('foo', 'bar');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('foo', 'bar');
  });

  it('should call localStorage.removeItem with the given key', () => {
    LocalStorageServise.remove('foo');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('foo');
  });

  it('should call localStorage.clear', () => {
    LocalStorageServise.clear();
    expect(localStorageMock.clear).toHaveBeenCalled();
  });
});
