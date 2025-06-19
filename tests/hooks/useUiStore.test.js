/* eslint-disable no-unused-vars */
import { describe, test, expect, it } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { useUiStore } from "../../src/hooks/useUiStore";
import { store, uiSlice } from "../../src/store";
import { act } from '@testing-library/react';
import { renderHook } from "@testing-library/react-hooks";
import "@testing-library/jest-dom/vitest"


const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer
    },
    preloadedState: {
      ui: { ...initialState }
    }
  })
}

describe("test in <useUiStore>", () => {

  test('debe de regresar los valores por defecto', () => {

    const mockStore = getMockStore({ isDateModalOpen: false });
    //añadió
    const wrapper = ({ children }) => (<Provider store={(mockStore)}>{children}</Provider>)

    // const { result } = renderHook(() => useUiStore(), {
    //   wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
    // });
    const { result } = renderHook(() => useUiStore(), {
      wrapper
    });

    expect(result.current).toEqual({
      isDateModalOpen: false,
      closeDateModal: expect.any(Function),
      openDateModal: expect.any(Function),
      toggleDateModal: expect.any(Function),
    });

  });

  test('openDateModal debe de colocar true en el isDateModalOpen', () => {

    const mockStore = getMockStore({ isDateModalOpen: false });
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
    });

    const { openDateModal } = result.current;

    act(() => {
      openDateModal();
    });

    expect(result.current.isDateModalOpen).toBeTruthy();


  });


  test('closeDateModal debe de colocar false en isDateModalOpen', () => {

    const mockStore = getMockStore({ isDateModalOpen: true });
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
    });

    act(() => {
      result.current.closeDateModal();
    });

    expect(result.current.isDateModalOpen).toBeFalsy();

  });


  test('toggleDateModal debe de cambiar el estado respectivamente', () => {

    const mockStore = getMockStore({ isDateModalOpen: true });
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
    });

    act(() => {
      result.current.toggleDateModal();
    });
    expect(result.current.isDateModalOpen).toBeFalsy();

    act(() => {
      result.current.toggleDateModal();
    });
    expect(result.current.isDateModalOpen).toBeTruthy();

  });
});
