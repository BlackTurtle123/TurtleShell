import {expect, assert} from 'chai';
import {AssetInfoController} from "../src/controllers";

describe('AssetInfoController', () => {
    require('isomorphic-fetch');

    const controller = new AssetInfoController({
        getNetwork: () => 'mainnet',
        getNode: () => 'https://privatenode2.blackturtle.eu'
    });

    it('Should Get tn asset info', async () => {
        const info = await controller.assetInfo('TN');
        //console.log(info)
        expect(info.description).to.eql('');
    });

    it('Should Get WBTC asset info', async () => {
        const info = await controller.assetInfo('8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS');
        //console.log(info)
        expect(info.description).to.eql('Bitcoin Token');
        expect(info.height).to.eql(257457);

    });

    it('Should return undefined on undefined asset id', async () => {
        const info = await controller.assetInfo('TN1');
        //console.log(info)
        expect(info).to.be.undefined
    });
});


