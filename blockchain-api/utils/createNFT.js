const {
    AccountId,
    PrivateKey,
    TokenCreateTransaction,
    TokenType,
    TokenSupplyType,
} = require("@hashgraph/sdk");
const getClient = require("./hederaClient");

async function createNFT(
    tokenName, tokenSymbol, treasuryId, treasuryKey
) {
    client = getClient();
    treasuryId = AccountId.fromString(treasuryId);
    treasuryKey = PrivateKey.fromString(treasuryKey);
    const supplyKey = PrivateKey.generate();

    const nftCreate = await new TokenCreateTransaction()
        .setTokenName(tokenName)
        .setTokenSymbol(tokenSymbol)
        .setTokenType(TokenType.NonFungibleUnique)
        .setDecimals(0)
        .setInitialSupply(0)
        .setTreasuryAccountId(treasuryId)
        .setSupplyType(TokenSupplyType.Finite)
        .setMaxSupply(250)
        .setSupplyKey(supplyKey)
        .freezeWith(client);

    const nftCreateTxSign = await nftCreate.sign(treasuryKey);
    const nftCreateSubmit = await nftCreateTxSign.execute(client);
    const nftCreateRx = await nftCreateSubmit.getReceipt(client);
    const tokenId = nftCreateRx.tokenId;

    return {
        supply_key : supplyKey.toString(),
        token_id : tokenId.toString(),
    }
}

module.exports = createNFT;