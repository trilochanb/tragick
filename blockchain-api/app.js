const createAccount = require("./utils/createAccount");
const queryBalance = require("./utils/queryBalance")
const createNFT = require("./utils/createNFT")
const mintNFT = require("./utils/mintNFT")
const transferNFT = require("./utils/transferNFT")
const associateToken = require("./utils/associateToken")
const disassociateToken = require("./utils/disassociateToken")
const getNFTInfo = require("./utils/getNFTInfo");
const transferBalance = require("./utils/transferBalance")
const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4300;

app.post("/disassociate-nft", async (request, response) => {
    try {
        const result = await disassociateToken(
            request.body.token_id,
            request.body.account_id,
            request.body.private_key,
        )
        response.json(result);
    } catch (error) {
        console.log(error);
        response.status(500).json({error: "Failed to associate NFT"});
    }
})


app.post("/transfer-balance", async (request, response) => {

        try {
            const result = await transferBalance(
                request.body.source_id,
                request.body.private_key,
                request.body.destination_id,
                request.body.amount,
            )
            response.json(result);
        } catch (error) {
            console.log(error);
            response.status(500).json({error: "Failed to transfer balance."});
        }
})


app.get("/nft-info", async (request, response) => {
    try {
        const result = await getNFTInfo(
            request.query.token_id,
        )
        response.json(result);
    } catch (error) {
        console.log(error);
        response.status(500).json({error: "Failed to get NFT."});
    }
})

app.post("/associate-nft", async (request, response) => {
    try {
        const result = await associateToken(
            request.body.token_id,
            request.body.account_id,
            request.body.private_key,
        )
        response.json(result);
    } catch (error) {
        console.log(error);
        response.status(500).json({error: "Failed to associate NFT"});
    }
})


app.post("/transfer-nft", async(request, response) => {
    try {
        const result = await transferNFT(
            request.body.sender_id,
            request.body.sender_key,
            request.body.token_id,
            request.body.serial_number,
            request.body.reciever_id
        )
        response.json(result);
    } catch (error) {
        console.log(error);
        response.status(500).json({error: "Failed to transfer NFT"});
    }
})


app.post("/mint-nft", async(request, response) => {
    try {
        instance_id = request.body.instance_id;
        const mint = await mintNFT(
            request.body.token_id,
            request.body.supply_key,
            instance_id,
        );
        response.json(mint);
    } catch (error) {
        response.status(500).json({error: "Failed to mint NFT"});
    }
})


app.post("/create-nft", async (request, response) => {
    try {
        const nft = await createNFT(
            request.body.token_name,
            request.body.token_symbol,
            request.body.treasury_id,
            request.body.treasury_key
        );
        response.json(nft);
    } catch (error) {
        response.status(500).json({error: "Failed to create NFT"});
    }
    }
);

app.get("/create-account", async (request, response) => {
    try {
        const account = await createAccount();
        response.json(account);
    } catch (error) {
        response.status(500).json({error: "Failed to create an account"});
    }
});

app.get("/balance", async (request, response) => {
        try {
            const balance = await queryBalance(request.query.account_id);
            response.json(balance);
        } catch (error) {
		console.log(error);
            response.status(500).json({error: "Failed to query balance"})
        }
    }
)

app.listen(PORT, () => {
    console.log("Server listening on PORT: ", PORT);
});
