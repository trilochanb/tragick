const {
    PrivateKey,
    TokenId,
    TokenMintTransaction,
    Hbar,
} = require("@hashgraph/sdk");
const getClient = require("./hederaClient");

async function mintNFT(
    tokenId, supplyKey, instanceId
) {
    client = getClient();
    tokenId = TokenId.fromString(tokenId);
    supplyKey = PrivateKey.fromString(supplyKey);
    metadata = [Buffer.from(instanceId)];
    const maxTransactionFee = new Hbar(20);
    const mintTx = new TokenMintTransaction()
        .setTokenId(tokenId)
        .setMetadata(metadata)
        .setMaxTransactionFee(maxTransactionFee)
        .freezeWith(client);

    const mintTxSign = await mintTx.sign(supplyKey);
    const mintTxSubmit = await mintTxSign.execute(client);
    const mintRx = await mintTxSubmit.getReceipt(client);
    return {
        serial_no : mintRx.serials[0].low.toString()
    }
}

module.exports = mintNFT;
