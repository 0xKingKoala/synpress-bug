import { testWithSynpress } from "@synthetixio/synpress";
import { MetaMask, metaMaskFixtures } from "@synthetixio/synpress/playwright";
import basicSetup from "../wallet-setup/basic.setup";

// Set up the test environment with Synpress and MetaMask fixtures, using the basic setup configuration
const test = testWithSynpress(metaMaskFixtures(basicSetup));

const { expect } = test;

test("should connect wallet to the MetaMask Test Dapp", async ({
  context,
  page,
  metamaskPage,
  extensionId,
}) => {
  // Create a new MetaMask instance with the provided context, page, password, and extension ID
  const metamask = new MetaMask(
    context,
    metamaskPage,
    basicSetup.walletPassword,
    extensionId,
  );

  // Navigate to the root page
  await page.goto("/");

  await page
    .getByRole("main")
    .getByText("CONNECT WALLET", { exact: true })
    .click();
  await page.getByText("MetaMask", { exact: true }).click();

  await metamask.connectToDapp();

  await page.getByRole("button").getByText("YEET", { exact: true }).click();

  // expect text to be "Insufficient balance to yeet"
  await expect(
    page.getByText("Insufficient balance to yeet", { exact: true }),
  ).toHaveText("Insufficient balance to yeet");
});
