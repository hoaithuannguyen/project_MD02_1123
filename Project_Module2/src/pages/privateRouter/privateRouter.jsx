import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const flaguserJSON = localStorage.getItem("userLogin");
  const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;

  return flaguser?.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;
