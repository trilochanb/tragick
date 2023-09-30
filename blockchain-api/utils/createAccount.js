const {
    PrivateKey,
    AccountCreateTransaction,
    Hbar,
} = require("@hashgraph/sdk");
const getClient = require("./hederaClient");

async function createAccount() {
    client = getClient();
    const privateKey = PrivateKey.generate();
	console.log(privateKey);
    const publicKey = privateKey.publicKey;

    const account = await new AccountCreateTransaction()
        .setKey(publicKey)
        .setInitialBalance(new Hbar(10000000))
        .execute(client);

    const getReceipt = await account.getReceipt(client);
    const accountId = getReceipt.accountId;
    result = {
        account_id: accountId.toString(),
        private_key: privateKey.toString(),
        public_key: publicKey.toString(),
    };
    return result;
}

module.exports = createAccount;
