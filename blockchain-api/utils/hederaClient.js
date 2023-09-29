const {
    Client,
    AccountId,
    Hbar,
} = require("@hashgraph/sdk");
require("dotenv").config();

function getClient () {
    const accountId = process.env.ACCOUNT_ID;
    const privateKey = process.env.PRIVATE_KEY;

    if (accountId == null || privateKey == null) {
        throw new Error(
            "Environment variables ACCOUNT_ID, PRIVATE_KEY, CONSENSUS_HOST, MIRROR_HOST must be present"
        );
    }
    const node = {"127.0.0.1:50211": new AccountId(3)};
    const client = Client.forNetwork(node).setMirrorNetwork("127.0.0.1:5600");
    client.setOperator(accountId, privateKey);
    client.setDefaultMaxTransactionFee(new Hbar(100));
    client.setMaxQueryPayment(new Hbar(50));
    return client;
}
module.exports = getClient;