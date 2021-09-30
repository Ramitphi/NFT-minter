import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [address, setaddress] = useState(null);
  const [metaipfs, setmetaipfs] = useState(null);
  const [name, setname] = useState(null);
  const [desc, setdesc] = useState(null);

  function sdata(event) {
    setData(event.target.value);

    console.log(event.target.value);
  }
  function sname(event) {
    setname(event.target.value);

    console.log(event.target.value);
  }

  function sdesc(event) {
    setdesc(event.target.value);

    console.log(event.target.value);
  }

  function submit() {
    console.log(data);
    console.log(name);
    console.log(desc);
  }

  function getaddress(event) {
    setaddress(event.target.value);
    console.log(event.target.value);
  }

  function submitaddress() {
    console.log(address);
  }

  const uplodmetadata = async () => {
    fetch("https://api.nftport.xyz/ipfs_upload_metadata", {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        name: name,
        description: desc,
        file_uri: data,
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "82d8af12-45c8-40d0-aced-2eac36fe0a3c",
      },
    })
      .then((response) => response.json())

      // Displaying results to console
      .then((response) => {
        setmetaipfs(response.metadata_ipfs_uri);
        console.log(response);
      })

      .catch((err) => console.error(err));
  };

  const mintnft = async () => {
    fetch("https://api.nftport.xyz/mint_nft", {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        chain: "polygon",
        contract_address: "0xd1c3ae3aed7786394bdb5a42a81f0b0fb28f7983",
        metadata_uri: metaipfs,
        mint_to_address: address,
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "82d8af12-45c8-40d0-aced-2eac36fe0a3c",
      },
    })
      .then((response) => response.json())

      // Displaying results to console
      .then((response) => {
        console.log(response);
      })

      .catch((err) => console.error(err));
  };

  return (
    <div className="App-header">
      <div>
        Livestream minter
        <br></br>
        <br></br>
        IPFS Link &nbsp;&nbsp;
        <input type="text" onChange={sdata} />
        <br></br>
        Name of NFT &nbsp;&nbsp;
        <input type="text" onChange={sname} />
        <br></br>
        Description of NFT &nbsp;&nbsp;
        <input type="text" onChange={sdesc} />
        <br></br>
        <br></br>
        <button onClick={submit}>Submit </button>
        <br></br>
        <button onClick={uplodmetadata}>Upload Metadata </button>
        <br></br>
        <br></br>
        <input type="text" onChange={getaddress} />
        <br></br>
        <button onClick={submitaddress}>Submit Address</button>
        <br></br>
        <br></br>
        <button onClick={mintnft}>Mint NFT </button>
      </div>
    </div>
  );
}

export default App;
