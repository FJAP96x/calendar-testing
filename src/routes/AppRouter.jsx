import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPages } from "../calendar";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";
// import { getEnvVariables } from "../helpers";

export const AppRouter = () => {
  // const authStatus = "not-auth"; // useAuthStore().status;

  const { checkAuthToken, status } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "checking") {
    return <h3>Loading...</h3>;
  }

  // console.log(getEnvVariables());

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/*" element={<CalendarPages />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
