import { test, describe } from 'vitest'
import { onCloseDateModal, onOpenDateModal, uiSlice } from '../../../src/store/ui/uiSlice';
import { expect } from 'vitest';

describe("uiSlice", () => {
  test("should be return the initial state", () => {

    expect(uiSlice.getInitialState()).toEqual({
      isDateModalOpen: false,
    })
  })

  test("should be change the isDateModalOpen correctly", () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, onOpenDateModal())
    expect(state.isDateModalOpen).toBeTruthy()
    state = uiSlice.reducer(state, onCloseDateModal())
    expect(state.isDateModalOpen).toBeFalsy()



  })

})