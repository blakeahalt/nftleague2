import { Network, Alchemy } from 'alchemy-sdk';

const AlchemyApi = () => {
    const settings = {
        apiKey: '4NJspyCzdOivfYow958IGROf6bDGbCU0',
        network: Network.ETH_MAINNET,
    };

    // Using default settings - pass in a settings object to specify your API key and network
    const alchemy = new Alchemy(settings);

    // Access standard Ethers.js JSON-RPC node request
    alchemy.core.getBlockNumber().then(console.log);

    // Access Alchemy Enhanced API requests
    alchemy.core
        .getTokenBalances('0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE')
        .then(console.log);

    // Access the Alchemy NFT API
    alchemy.nft.getNftsForOwner('vitalik.eth').then(console.log);

    // Access WebSockets and Alchemy-specific WS methods
    alchemy.ws.on(
        {
            method: 'alchemy_pendingTransactions',
        },
        (res) => console.log(res)
    );

    // ==================================================================

    // // Get the latest block
    // const latestBlock = alchemy.core.getBlockNumber();

    // // Get all outbound transfers for a provided address
    // alchemy.core
    //     .getTokenBalances('0x994b342dd87fc825f66e51ffa3ef71ad818b6893')
    //     .then(console.log);

    // // Get all the NFTs owned by an address
    // const nfts = alchemy.nft.getNftsForOwner("0xshah.eth");

    // // Listen to all new pending transactions
    // alchemy.ws.on(
    //     { method: "alchemy_pendingTransactions",
    //     fromAddress: "0xshah.eth" },
    //     (res) => console.log(res)
    // );

    // console.log("fetching metadata for a Crypto Coven NFT...");
    // const response = alchemy.nft.getNftMetadata(
    //   "0x5180db8F5c931aaE63c74266b211F580155ecac8",
    //   "1590"
    // );
    // console.log(response);

    return (
        <>
            <script
                type="module"
                src="./file.js"
            >
                <h2>Alchemy Results</h2>

                <div>{alchemy.core}</div>
                <div>{alchemy.ws.on}</div>
                {/* <div>
            {response}
        </div> */}
            </script>
        </>
    );
};

export default AlchemyApi;
