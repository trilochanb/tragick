const {
    AccountId,
    PrivateKey,
    TokenAssociateTransaction,
    TransferTransaction,
    TokenId,
} = require("@hashgraph/sdk");
const getClient = require("./hederaClient");

async function associateNFT(
    tokenId, associationId, associationKey,
) {
    client = getClient();
    tokenId = TokenId.fromString(tokenId);
    associationId = AccountId.fromString(associationId);
    associationKey = PrivateKey.fromString(associationKey);

    const associateAccountTx = await new TokenAssociateTransaction()
        .setAccountId(associationId)
        .setTokenIds([tokenId])
        .freezeWith(client)
        .sign(associationKey);

    const associateAccountTxSubmit = await associateAccountTx.execute(client);
    const associateAccountRx = await associateAccountTxSubmit.getReceipt(client);

    return {
        data : associateAccountRx.status,
    }
}

module.exports = associateNFT;
