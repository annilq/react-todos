// 后台组件
import App from "../App";
import MainTasks from "../components/maintasksContainer";
import TaskDetail from "../components/taskdetail";
const routes = {
  path: "/",
  component: App,
  indexRoute: { onEnter: (nextState, replace) => replace('/home') },
  childRoutes: [
    {
      path: "/home",
      component: MainTasks
    },
    {
      path: "/folders/:id",
      component: MainTasks
    },
    {
      path: "/taskdetail/:id",
      component: TaskDetail
    }
  ]
};
export default routes;
