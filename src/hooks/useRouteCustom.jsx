import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import UserTemplate from "../template/UserTemplate";
import { pathDefault } from "../common/path";
import RegisterPage from "../pages/Register/RegisterPage";
import LoginPage from "../pages/Login/LoginPage";
import ListJobPage from "../pages/ListJobPage/ListJobPage";
import AdminTemplate from "../template/AdminTemplate";
import AdminLogin from "../pages/AdminLogin/AdminLogin";
import JobDetail from "../pages/JobDetail/JobDetail";
// import ManagerUser from "../pages/ManagerUser/ManagerUser";
import CreateUser from "../pages/CreateUser/CreateUser";
import { Skeleton } from "antd";
import Banner from "../components/Banner/Banner";
import HomePageContent from "../components/HomePageContent/HomePageContent";
import JobTypePage from "../pages/JobTypePage/JobTypePage";

// phương thức lazy của react sẽ nhận vào đường dẫn component và chỉ tải và hiển thị cpn khi cpn hiển thị lên giao diện cho ng dùng
const ManagerUser = React.lazy(() =>
  import("../pages/ManagerUser/ManagerUser")
);

const useRouteCustom = () => {
  const routes = useRoutes([
    {
      path: pathDefault.homePage,
      element: <UserTemplate />,
      children: [
        {
          index: true,
          element: (
            <>
              <Banner />,
              <HomePageContent />,
            </>
          ),
        },
        {
          path: pathDefault.listJob,
          element: <ListJobPage />,
        },
        {
          path: pathDefault.jobDetail,
          element: <JobDetail />,
        },
        {
          path: pathDefault.jobType,
          element: <JobTypePage />,
        },
      ],
    },
    {
      path: pathDefault.register,
      element: <RegisterPage />,
    },
    {
      path: pathDefault.login,
      element: <LoginPage />,
    },
    {
      path: pathDefault.admin,
      element: <AdminTemplate />,
      children: [
        {
          // index: true,
          path: pathDefault.managerUser,
          // thẻ suspense dùng làm component thay thế trong quá trình đợi component chính được tải về
          element: (
            <Suspense fallback={<Skeleton />}>
              <ManagerUser />
            </Suspense>
          ),
        },
        {
          path: pathDefault.createUser,
          element: <CreateUser />,
        },
      ],
    },
    {
      path: pathDefault.adminLogin,
      element: <AdminLogin />,
    },
  ]);
  return routes;
};

export default useRouteCustom;
