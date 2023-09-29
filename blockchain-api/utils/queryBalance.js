const {
    Client,
    PrivateKey,
    AccountCreateTransaction,
    AccountBalanceQuery,
    Hbar, AccountId,
} = require("@hashgraph/sdk");
require("dotenv").config();
const getClient = require("./hederaClient");

async function queryBalance(accountId) {
    client = getClient();
    accounId = AccountId.fromString(accountId);
    const accountBalance = await new AccountBalanceQuery()
        .setAccountId(accountId)
        .execute(client);
    return accountBalance;
}
module.exports = queryBalance;
