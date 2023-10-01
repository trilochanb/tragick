# Tragick
Tragick is a trust based decentralized supply chain protocol built on top of Hedera.

### Principles and Definitions
- Vendors: Supply chain network participants which can register themselves via the registration portal.
- Products: Blueprints for real world products which are NFTs in the Hedera local node.
- Products Instances: Serial numbers representing tangible real world product objects minted from an NFT.
- Product Batches: Bulk creation of product instances.
- Acknowledgements: Interaction of a product instance and an owner.

### Architecture and system implementation
Tragick operates on Hedera's local node which can be setup using https://github.com/hashgraph/hedera-local-node.
A JS SDK operates with the local node which is abstracted via an express.js API. This express.js is queried by a RESTful API app built in djangorestframework which further interacts with the frontend interface built in React.
