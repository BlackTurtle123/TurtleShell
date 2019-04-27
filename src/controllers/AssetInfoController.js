import ObservableStore from 'obs-store';

const TN = {
    quantity: "10000000000000000",
    ticker: 'TN',
    id: 'TN',
    name: 'TN',
    precision: 8,
    description: '',
    height: 0,
    timestamp: '2018-04-11T21:00:00.000Z',
    sender: '',
    reissuable: false,
    displayName: 'TN'
};

export class AssetInfoController {
    constructor(options = {}) {
        const defaults = {
            assets: {
                mainnet: {
                    TN
                },
                testnet: {
                    TN
                },
                custom: {
                    TN
                }
            }
        };
        this.getNode = options.getNode;
        this.getNetwork = options.getNetwork;
        this.store = new ObservableStore(Object.assign({}, defaults, options.initState));
    }

    async assetInfo(assetId) {
        const { assets } = this.store.getState();
        if (assetId === '' || assetId == null || assetId.toUpperCase() === 'TN') return TN;

        const network = this.getNetwork();
        const API_BASE = this.getNode();
        const url = new URL(`assets/details/${assetId}`, API_BASE).toString();

        if (!assets[network][assetId]) {
            let resp = await fetch(url);
            switch (resp.status) {
                case 200:
                    let assetInfo = await resp.text()
                        .then(text => JSON.parse(text.replace(/(".+?"[ \t\n]*:[ \t\n]*)(\d{15,})/gm,'$1"$2"')));
                    const mapped = {
                        quantity: assetInfo.quantity,
                        ticker: assetInfo.ticker,
                        id: assetInfo.assetId,
                        name: assetInfo.name,
                        precision: assetInfo.decimals,
                        description: assetInfo.description,
                        height: assetInfo.issueHeight,
                        timestamp: (new Date(parseInt(assetInfo.issueTimestamp))).toJSON(),
                        sender: assetInfo.issuer,
                        reissuable: assetInfo.reissuable,
                        displayName: assetInfo.ticker || assetInfo.name
                    };
                    assets[network][assetId] = mapped;
                    this.store.updateState({assets});
                    break;
                case 400:
                    const error = await resp.json();
                    throw new Error(`Could not find info for asset with id: ${assetId}. ${error.message}`);
                default:
                    throw new Error(await resp.text())
            }
        }

        return assets[network][assetId]
    }
}
