export interface NotificationObj {
    id: number
    timeout: number
    title: string
    text: string
    type: NotificationTypeEnum
}

export enum NotificationTypeEnum {
    ERROR = 'error',
    SUCCESS = 'success'
}