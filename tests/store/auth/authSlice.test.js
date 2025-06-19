import { describe, test, expect } from "vitest";
import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice";
import { initialState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe("test in authSlice", () => {
  test("should be return the initial state", () => {
    expect(authSlice.getInitialState()).toEqual(initialState)

  })
  test("should be realize the login", () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials))
    expect(state).toEqual({
      status: "authenticated",
      user: testUserCredentials,
      errorMessage: undefined,
    })

  })
  test("should be realize the logout", () => {
    const state = authSlice.reducer(initialState, onLogout())
    expect(state).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: undefined,
    })
  })
  test("should be realize the logout", () => {
    const errorMessage = "Invalid credentials"
    const state = authSlice.reducer(initialState, onLogout(errorMessage))
    expect(state).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: errorMessage,
    })
  })
  test("should be clean the error message", () => {
    const errorMessage = "Invalid credentials"
    const state = authSlice.reducer(initialState, onLogout(errorMessage))
    const newState = authSlice.reducer(state, clearErrorMessage())
    expect(newState.errorMessage).toBe(undefined)
  })
})