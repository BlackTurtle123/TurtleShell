const expect = require("expect");
import { AssetInfoController } from "../src/controllers";

require("isomorphic-fetch");

const controller = new AssetInfoController({
  getNetwork: () => "mainnet",
  getNode: () => "https://privatenode2.blackturtle.eu"
});

it("Should Get tn asset info", async () => {
  const info = await controller.assetInfo("TN");
  //console.log(info)
  expect(info.description).toBe("");
});

// describe("AssetInfoController", () => {
// it('Should Get WBTC asset info', async () => {
//     const info = await controller.assetInfo('8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS');
//     //console.log(info)
//     expect(info.description).toBe('Bitcoin Token');
//     expect(info.height).toBe(257457);
// });
// it('Should throw on wrong asset id', async () => {
//     try {
//         const info = await controller.assetInfo('WAVES1');
//         assert(false, 'Case didn\'t fail')
//     }catch (e) {
//         expect(e.message).toBe(
//             'Could not find info for asset with id: WAVES1. Failed to find issue transaction by ID'
//         )
//     }
// });
// });
