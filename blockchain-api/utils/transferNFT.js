const {
    AccountId,
    PrivateKey,
    AccountBalanceQuery,
    TransferTransaction,
    TokenId,
    TokenUpdateTransaction,
} = require("@hashgraph/sdk");
const getClient = require("./hederaClient");

async function transferNFT(
    senderId, senderKey, tokenId, serialNumber, recieverId
) {
    client = getClient();
    senderId = AccountId.fromString(senderId)
    senderKey = PrivateKey.fromString(senderKey)
    tokenId = TokenId.fromString(tokenId)
    recieverId = AccountId.fromString(recieverId)

    var balanceCheckTx = await new AccountBalanceQuery()
        .setAccountId(senderId)
        .execute(client);

    const tokenTransferTx = await new TransferTransaction()
        .addNftTransfer(tokenId, serialNumber, senderId, recieverId)
        .freezeWith(client)
        .sign(senderKey);

    const tokenTransferSubmit = await tokenTransferTx.execute(client);
    const tokenTransferRx = await tokenTransferSubmit.getReceipt(client);

    const transaction = await new TokenUpdateTransaction()
        .setTokenId(tokenId)
        .setTreasuryAccountId(recieverId)
        .freezeWith(client);

    const signTx = await transaction.sign(senderKey);
    const txResponse = await signTx.execute(client);

    return {
        data : tokenTransferRx.status,
    }
}

module.exports = transferNFT;