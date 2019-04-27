import {getAdapterByType} from '@turtlenetwork/signature-adapter'
import {BigNumber} from '@turtlenetwork/data-entities';
import create from 'parse-json-bignumber';
const {stringify, parse} = create({BigNumber});

export class Wallet {

    /**
     * user
     * @type {
     * {
     *  address: string,
     *  seed: string,
     *  networkCode: string,
     *  name: string,
     *  publicKey: string,
     *  type: string,
     *  network: string
     *  }
     *}
     */
    user = null;

    constructor(user) {
        if (!user) throw new Error('user required');
        this.user = user
    }

    get _adapter(){
        const Adapter = getAdapterByType(this.user.type);

        Adapter.initOptions({networkCode: this.user.networkCode.charCodeAt(0)});

        //Todo: temporary for seed
        let params = this.user;
        if (this.user.type === 'seed'){
            params = this.user.seed;
        }
        return new Adapter(params)
    }

    isMyNetwork(network) {
        return network === this.user.network;
    }

    getAccount() {
        let account = Object.assign({}, this.user);
        delete account['id'];
        delete account['seed'];
        return account;
    }

    serialize() {
        return this.user
    }

    getSecret() {
        return this.user.seed
    }

    async signTx(tx){
        const signable = this._adapter.makeSignable(tx);
        return stringify(await signable.getDataForApi());
    }

    async signBytes(bytes){
        return await this._adapter.signData(Uint8Array.from(bytes))
    }

    async signRequest(request){
        const signable = this._adapter.makeSignable(request);
        return await signable.getSignature()
    }
}
