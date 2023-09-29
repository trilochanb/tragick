const {
    AccountId,
    Hbar,
    TransferTransaction,
    TransactionId,
    PrivateKey,
} = require("@hashgraph/sdk");

const getClient = require("./hederaClient");

async function transferBalance(sourceId, privateKey, destinationId, amount) {
    const client = getClient(); // Make sure getClient() returns a valid client
    sourceId = AccountId.fromString(sourceId);
    destinationId = AccountId.fromString(destinationId);
    privateKey = PrivateKey.fromString(privateKey);

    const transaction = await new TransferTransaction()
        .addHbarTransfer(sourceId, new Hbar(-amount))
        .addHbarTransfer(destinationId, new Hbar(amount))
        .freezeWith(client)
        .sign(privateKey);

    const transactionTransferSubmit = await transaction.execute(client);
    const transactionTransferRx = await transactionTransferSubmit.getReceipt(client);

    return {
        data: transactionTransferRx.status.toString()
    };
}

module.exports = transferBalance;
