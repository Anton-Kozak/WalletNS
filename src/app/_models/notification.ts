export interface Notification {
    id: number,
    reasonId: number,
    walletId: number,
    message: string,
    initiatorUser: string,
    isForAll: boolean,
    creationDate: Date
}
