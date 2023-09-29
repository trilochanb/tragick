const {
    AccountId,
    PrivateKey,
    TokenDissociateTransaction,
    TokenId,
} = require("@hashgraph/sdk");
const getClient = require("./hederaClient");

async function disassociateToken(
    tokenId, disassociationId, disassociationKey,
) {
    client = getClient();
    tokenId = TokenId.fromString(tokenId);
    disassociationId = AccountId.fromString(disassociationId);
    disassociationKey = PrivateKey.fromString(disassociationKey);

    const transaction = await new TokenDissociateTransaction()
        .setAccountId(disassociationId)
        .setTokenIds([tokenId])
        .freezeWith(client);

    const signTx = await transaction.sign(disassociationKey);
    const txResponse = await signTx.execute(client);
    const receipt = await txResponse.getReceipt(client);
    const transactionStatus = receipt.status;

    return {
        data : transactionStatus.toString(),
    }
}

module.exports = disassociateToken;