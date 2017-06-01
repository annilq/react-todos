import { notification } from "antd";
notification.config({
  placement: "bottomRight",
  bottom: 50,
  duration: 3
});
const Notify = (type, message = "提示", description) => {
  notification[type]({
    message,
    description
  });
};
export default Notify
