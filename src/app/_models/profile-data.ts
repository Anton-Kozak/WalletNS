import { UserForProfileEdit } from './user-for-profile-edit';

export interface ProfileData {
    editUser: UserForProfileEdit;
    moneySpent: number;
    dateJoined: Date;
    walletUsers: { userId: string, username: string, photoUrl: string }[];
}