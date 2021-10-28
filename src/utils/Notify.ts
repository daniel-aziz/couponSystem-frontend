
import { Notyf } from "notyf";

class Notify {
    private notification = new Notyf({ duration: 2000, position: { x: "center", y: "bottom", }, dismissible: true, ripple: true });

    public success(message: string) {
        this.notification.success(message);
    }

    public error(message: string) {
        this.notification.error(message);
    }
}

const notify = new Notify();

export default notify;
