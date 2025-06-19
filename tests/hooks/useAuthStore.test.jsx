import { configureStore } from '@reduxjs/toolkit';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { authSlice } from '../../src/store';
import { initialState, notAuthenticatedState } from '../fixtures/authStates';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useAuthStore } from '../../src/hooks';
import { Provider } from 'react-redux';
import { testUserCredentials } from '../fixtures/testUser';
import { calendarApi } from '../../src/api';

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe('test in <useAuthStore>', () => {
  beforeEach(() => localStorage.clear());

  test('should return the default values', () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      errorMessage: undefined,
      status: 'checking',
      user: {},
      checkAuthToken: expect.any(Function),
      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      startRegister: expect.any(Function),
    });
  });

  test('should be login correctly', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin(testUserCredentials);
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Test User', uid: '62a10a4954e8230e568a49ab' },
    });

    expect(localStorage.getItem('token')).toEqual(expect.any(String));
    expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));

  });
});

test('should be fail authentication ', async () => {
  const mockStore = getMockStore({ ...notAuthenticatedState });
  const { result } = renderHook(() => useAuthStore(), {
    wrapper: ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    ),
  });
  await act(async () => {
    await result.current.startLogin({
      email: 'test@example.com',
      password: 'wrongpassword',
    });
  });
  const { errorMessage, status, user } = result.current;
  expect(localStorage.getItem('token')).toBeNull();
  expect({ errorMessage, status, user }).toEqual({
    errorMessage: 'Credenciales incorrectas',
    status: 'not-authenticated',
    user: {},
  });
  await waitFor(() => {
    expect(result.current.errorMessage).toBe(undefined);
  });
});

test('startRegister should create a user', async () => {
  const newUser = {
    email: 'test@example.com',
    password: '123456789',
    name: 'Test User',
  };
  const mockStore = getMockStore({ ...notAuthenticatedState });
  const { result } = renderHook(() => useAuthStore(), {
    wrapper: ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    ),
  });

  const spy = vi.spyOn(calendarApi, 'post').mockReturnValue({
    data: {
      ok: true,
      uid: '123456789',
      name: 'test-user',
      token: 'algun token',
    },
  });
  await act(async () => {
    await result.current.startRegister(newUser);
  });
  const { errorMessage, status, user } = result.current;
  expect({ errorMessage, status, user }).toEqual({
    errorMessage: undefined,
    status: 'authenticated',
    user: { name: 'test-user', uid: '123456789' },
  });
  // cancelar el proceso del spy
  spy.mockRestore();
});

test('startRegister should be failed the Register', async () => {
  const { data } = await calendarApi.post('/auth', testUserCredentials);
  localStorage.setItem('token', data.token);

  const mockStore = getMockStore({ ...initialState });
  const { result } = renderHook(() => useAuthStore(), {
    wrapper: ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    ),
  });

  await act(async () => {
    await result.current.checkAuthToken();
  });

  const { errorMessage, status, user } = result.current;
  expect({ errorMessage, status, user }).toEqual({
    errorMessage: undefined,
    status: 'authenticated',
    user: { name: 'frank', uid: '34243244k4234mkfm32' },
  });
});
