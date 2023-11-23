import { notification } from "antd";
const success = (type) => {
    notification.success({
        message: type,
        style: {
            top: 100,
        },
    });
}
const failed = (type) => {
    notification.error({
        message: type,
        style: {
            top: 100,
        },
    });
}
export { success, failed }