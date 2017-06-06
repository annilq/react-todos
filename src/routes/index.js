// 后台组件
import App from "../App";
import CSTasks from "../components/tasksContainer";
import Login from "../components/login";
function requireAuth(nextState, replace) {
  const token = localStorage.getItem('TOKEN')
  if (!token) {
    replace({
      pathname: "/login"
    });
  }
}
const routes = {
  path: "/",
  component: App,
  indexRoute: { onEnter: (nextState, replace) => replace("home") },
  childRoutes: [
    {
      path: "/home",
      onEnter: requireAuth,
      params: { type: "home" },
      component: CSTasks
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/star",
      onEnter: requireAuth,
      params: { type: "star", query: { star: true } },
      component: CSTasks
    },
    {
      path: "/done",
      onEnter: requireAuth,
      params: { type: "done", query: { status: 1 } },
      component: CSTasks
    },
    {
      path: "/folders/:id",
      onEnter: requireAuth,
      component: CSTasks
    }
  ]
};
export default routes;
