import { Route, Routes } from "react-router";
import DashboardLayout from "./layout/dashboard-layout";
import Providers from "./Providers";
import { ROUTES } from "./utils/routes";

function App() {
  return (
    <Providers>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<p>home</p>} />
          <Route
            path={ROUTES.USERS}
            element={<p className="text-2xl font-bold">Users</p>}
          />
        </Route>
      </Routes>
    </Providers>
  );
}

export default App;
