// 后台组件
import App from "../App";
import TaskList from "../components/tasklists";
import TaskDetail from "../components/taskdetail";
const routes = {
  path: "/",
  component: App,
  childRoutes: [
    {
      path: "/folders/:id",
      component: TaskList
    },
    {
      path: "taskdetail:id",
      component: TaskDetail
    }
  ]
};
export default routes;
