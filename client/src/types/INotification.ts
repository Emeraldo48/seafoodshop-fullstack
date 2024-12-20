export enum NotificationType {
    SUCCESS = "success",
    INFO = "info",
    WARNING = "warning",
    ERROR = "error"
}

//export type NotificationType = "success" | "info" | "warning" | "error"

export interface INotification {
    id: number
    type: NotificationType
    message: string
    duration: number
}