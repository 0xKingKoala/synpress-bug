import { defineWalletSetup } from "@synthetixio/synpress";
import { getExtensionId, MetaMask } from "@synthetixio/synpress/playwright";

const SEED_PHRASE =
  "test test test test test test test test test test test junk";
const PASSWORD = "SynpressIsAwesomeNow!!!";

export default defineWalletSetup(PASSWORD, async (context, walletPage) => {
  const extensionId = await getExtensionId(context, "MetaMask");
  const metamask = new MetaMask(context, walletPage, PASSWORD, extensionId);

  await metamask.importWallet(SEED_PHRASE);

  const network = {
    name: "Berachain bArtio",
    rpcUrl: "https://bartio.rpc.berachain.com",
    chainId: 80084,
    symbol: "BERA",
    blockExplorerUrl: "https://bartio.beratrail.io",
  };
  await metamask.addNetwork(network);
  await metamask.switchNetwork("Berachain bArtio");
});