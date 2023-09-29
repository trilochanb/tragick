const {
    TokenId,
    TokenNftInfoQuery,
    NftId
} = require("@hashgraph/sdk");
const getClient = require("./hederaClient");

async function getNFTInfo(
    tokenId,
) {
    client = getClient();
    tokenId = TokenId.fromString(tokenId);
    nftId = new NftId(tokenId, 1);
    const nftInfos = await new TokenNftInfoQuery()
        .setNftId(nftId)
        .execute(client);
    metadata = Buffer.from(nftInfos[0].metadata, 'base64')
    console.log(metadata.toLocaleString());
}

module.exports = getNFTInfo;