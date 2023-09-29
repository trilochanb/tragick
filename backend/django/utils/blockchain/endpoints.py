import requests
import json
import re

BASE_URL = 'http://localhost:4300/'
CREATE_ACCOUNT_URL = 'create-account/'
CREATE_NFT_URL = 'create-nft/'
MINT_NFT_URL = 'mint-nft/'
TRANSFER_NFT_URL = 'transfer-nft/'
ASSOCIATE_NFT = 'associate-nft/'
TRANSFER_BALANCE_URL = 'transfer-balance/'
DISASSOCIATE_NFT = 'disassociate-nft/'
BALANCE_URL = 'balance/'


def postBlockchain(url, data):
    response = requests.post(BASE_URL + url, json=data)
    return json.loads(response.text)


def getBlockchain(url, payload=None):
    if payload:
        response = requests.get(BASE_URL + url, params=payload)
    else:
        response = requests.get(BASE_URL + url)
    return json.loads(response.text)


def createAccount():
    response = getBlockchain(CREATE_ACCOUNT_URL)
    return response


def createNFT(token_name, token_symbol, treasury_id, treasury_key):
    payload = {
        "token_name": token_name,
        "token_symbol": token_symbol,
        "treasury_id": treasury_id,
        "treasury_key": treasury_key
    }
    response = postBlockchain(CREATE_NFT_URL, payload)
    return response


def mintNFT(token_id, supply_key, instance_id):
    payload = {
        "token_id": token_id,
        "supply_key": supply_key,
        "instance_id": instance_id,
    }
    response = postBlockchain(MINT_NFT_URL, payload)
    return response


def transferNFT(sender_id, sender_key, token_id, serial_number, reciever_id):
    payload = {
        "sender_id": sender_id,
        "sender_key": sender_key,
        "token_id": token_id,
        "serial_number": serial_number,
        "reciever_id": reciever_id
    }
    response = postBlockchain(TRANSFER_NFT_URL, payload)
    return response


def associateNFT(token_id, account_id, private_key):
    payload = {
        "token_id": token_id,
        "account_id": account_id,
        "private_key": private_key
    }
    response = postBlockchain(ASSOCIATE_NFT, payload)
    return response


def disassociateNFT(token_id, account_id, private_key):
    payload = {
        "token_id": token_id,
        "account_id": account_id,
        "private_key": private_key
    }
    response = postBlockchain(DISASSOCIATE_NFT, payload)
    return response


def transferBalance(source_id, private_key, destination_id, amount):
    payload = {
        "source_id": source_id,
        "private_key": private_key,
        "destination_id": destination_id,
        "amount": amount
    }
    response = postBlockchain(TRANSFER_BALANCE_URL, payload)
    return response

def getBalance(account_id):
    payload = {
        "account_id" : account_id,
    }
    result = getBlockchain(BALANCE_URL, payload)
    print(result)
    balance_str = result['hbars'].strip(' ℏ')
    try:
        balance = float(balance_str)
    except ValueError:
        balance = 0
    return balance

# alice = createAccount()
# print(alice)
# nft = createNFT("Condom", "CONDOM",  alice["account_id"], alice["private_key"])
# print(nft)
# print(mintNFT(nft["token_id"], nft["supply_key"], "43289473923"))
# print(mintNFT(nft["token_id"], nft["supply_key"], "43289473923"))
# print(nft["token_id"])
# bob = createAccount()
# associateNFT(nft["token_id"], bob["account_id"], bob["private_key"])
# print(transferNFT(alice["account_id"], alice["private_key"], nft["token_id"], 1, bob["account_id"]))