import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
// import { UploadingFile } from "./file_upload";
import "./App.css";
import Header from "./Components/Header";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Particles from "react-tsparticles";

import { Form, Input, InputNumber } from 'antd';

const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};



const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function App() {
  const [data, setData] = useState(null);
  const [address, setaddress] = useState(null);
  const [metaipfs, setmetaipfs] = useState(null);
  const [name, setname] = useState(null);
  const [desc, setdesc] = useState(null);
  const { register, handleSubmit } = useForm();
  const [ipfslink, setipfs] = useState(null);

  const notify = () => toast("Please select a file to upload.");

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


  function UploadingFile(data) {
    const form = new FormData();
    form.append("file", data.uploadedfile[0]);

    let ipfs_url;
    const options = {
      method: 'POST',
      body: form,
      "headers": {
        "Authorization": "d53eb35f-0b79-4a84-832c-8eb4d0086600",
      }
    };

    fetch("https://api.nftport.xyz/v0/files", options)
      .then(response => response.json())
      .then((response) => {

        
        if (response.ipfs_url) {

          ipfs_url = response.ipfs_url;
          setipfs(ipfs_url);

          return ipfs_url;

        } else {
          notify();
          console.log("hii");

        }
      })
      .catch(err => {
        console.log("hiii");
        console.error(err);
      });

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

  function onSubmit(data) {
    UploadingFile(data);
  }

  return (

    <>

      // Background Particles Rendering

      <Particles
        id="tsparticles"
        options={{
          background: {
            color: {
              value: "#0d47a1",
            },
          },
          fpsLimit: 70,
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },

              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            collisions: {
              enable: false,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 70,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 6,
            },
          },
          detectRetina: true,
        }}
      />

      <Header />  // Rendering the Header component for the application
      <ToastContainer />
      // Rendering the complete form

      <div className="App-header">
        <Grid container spacing={2}>
          <Grid item xs={1} md={2}>
          </Grid>
          <Grid item xs={1} md={8}>
            <Card>
              <CardActionArea>
                <Grid container spacing={2}>
                  <Grid item xs={1} md={3}>
                  </Grid>
                  <Grid item xs={1} md={8}>

                    <CardContent>
                      <div style={{
                        fontSize: "18px",
                        color: "white"
                      }}>

                        <h3>
                          Choose a File to submit
                        </h3>
                        <br />

                        <form>
                          <input required ref={register} type="file" name="uploadedfile" />
                          <Button variant="contained" component="span" onClick={handleSubmit(onSubmit)}>
                            Submit
                          </Button>
                        </form>

                        <br></br>
                        <h3>IPFS Link</h3> &nbsp;&nbsp;
                        <Input placeholder="IPFS Link" onChange={(e) => setipfs(e.target.value)} value={ipfslink} />
                        <br></br>        <br />

                        <h3>Name of NFT </h3>&nbsp;&nbsp;
                        <Input placeholder="Name of NFT" onChange={sname} />
                        <br></br>        <br />

                        <h3>Description of NFT </h3>&nbsp;&nbsp;
                        <Input placeholder="Description" onChange={sdesc} />

                        <br></br>        <br />

                        <br></br>
                        <Grid container spacing={3}>
                          <Grid item xs={1} md={4}>

                            <Button variant="contained" size="medium" onClick={submit}>
                              Submit Metadata
                            </Button>
                          </Grid>
                          <Grid item xs={1} md={1}></Grid>
                          <Grid item xs={1} md={4}>

                            <Button variant="contained" size="medium" onClick={uplodmetadata}>
                              Upload Metadata
                            </Button>
                          </Grid>
                        </Grid>
                        <br />

                        <br></br>

                        <Grid container spacing={3}>
                          <Grid item xs={1} md={4}>
                            <Input placeholder="Enter Wallet Address" onChange={getaddress} />

                          </Grid>
                          <Grid item xs={1} md={1}></Grid>
                          <Grid item xs={1} md={4}>
                            <a href="https://metamask.io/">
                              <Button variant="contained" size="medium">
                                Create Metamask Wallet
                              </Button>
                            </a>
                          </Grid>
                        </Grid>

                        <br></br>        <br />
                        <Grid container spacing={3}>
                          <Grid item xs={1} md={4}>
                            <Button variant="contained" size="medium" onClick={submitaddress}>
                              Submit Address
                            </Button>
                          </Grid>
                          <Grid item xs={1} md={1}></Grid>
                          <Grid item xs={1} md={4}>
                            <Button variant="contained" size="medium" onClick={mintnft}>
                              Mint NFT
                            </Button>
                          </Grid>
                        </Grid>
                        <br />

                      </div>
                    </CardContent>
                  </Grid>
                </Grid>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>

      </div>
    </>

  );
}

export default App;
