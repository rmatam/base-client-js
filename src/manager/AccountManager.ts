import {Auth} from '../repository/auth/Auth';
import Account from '../repository/models/Account';
import {ClientData} from '../repository/client/ClientData';
import Profile from '../repository/models/Profile';

export default class AccountManager {

    private auth: Auth;
    private clientData: ClientData;
    private profile: Profile;

    constructor(auth: Auth, clientData: ClientData) {
        this.auth = auth;
        this.clientData = clientData;
    }

    signUp(address: string): Promise<Account> {
        return this.auth
            .signUp(address)
            .then(this.onGetAccount.bind(this));
    }

    signIn(id: string): Promise<Account> {
        return this.auth.signIn(id).then(this.onGetAccount.bind(this));
    }

    getProfile(): Profile {
        return this.profile;
    }

    hasActiveAccount(): boolean {
        return this.profile != null && this.profile.account != null;
    }

    private onGetAccount(account: Account): Promise<Account> {
        return this.clientData.getData(account.id).then(data => {
            this.profile = new Profile(data, 'email', account);

            return account;
        });
    }

}
