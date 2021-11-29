import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import {UploadingFile} from "./file_upload";
import "./App.css";
import Header from "./Components/Header";



import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


import Particles from "react-tsparticles";

import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber} from 'antd';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';

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
  const {register, handleSubmit} = useForm();

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

  function onSubmit(data){
    UploadingFile(data);
  }

  return (

    <>
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
      <Header/>
      <div className="App-header">
      <Grid container spacing={2}>
      <Grid item xs={1} md={3}>
      </Grid>
      <Grid item xs={1} md={6}>
      <Card>
      <CardActionArea>
      <Grid container spacing={2}>
      <Grid item xs={1} md={3}>
      </Grid>
      <Grid item xs={1} md={8}>

      <CardContent>
        <div style={{fontSize: "18px",
        color: "white"
        }}>
      
        <h3>
        Choose a File to submit
        </h3> 
        <br/>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input required ref={register} type="file" name = "uploadedfile"/>
          <Button variant="contained" component="span">
          Submit
        </Button>
        </form>

        <br></br>
        <h3>IPFS Link</h3> &nbsp;&nbsp;
        <Input placeholder="IPFS Link" onChange={sdata}/>
        <br></br>        <br/>

        <h3>Name of NFT </h3>&nbsp;&nbsp;
        <Input placeholder="Name of NFT" onChange={sname}/>
        <br></br>        <br/>

        <h3>Description of NFT </h3>&nbsp;&nbsp;
        <Input placeholder="Description" onChange={sdesc}/>

        <br></br>        <br/>

        <br></br>
        <Grid container spacing={3}>
        <Grid item xs={1} md={4}>
        {/* <Button type="primary" shape="round" icon={<UploadOutlined />} size={"large"}>
          Submit Metadata
        </Button> */}
        <Button variant="contained" size="medium" onClick={submit}>
          Submit Metadata
        </Button>
        </Grid>
        <Grid item xs={1} md={1}></Grid>
        <Grid item xs={1} md={4}>
        {/* <Button type="primary" shape="round" icon={<UploadOutlined />} size={"large"}>
          Upload Metadata
        </Button> */}
        <Button variant="contained" size="medium" onClick={uplodmetadata}>
          Upload Metadata
        </Button>
        </Grid>
        </Grid>
     <br/>

        <br></br>

        <Grid container spacing={3}>
        <Grid item xs={1} md={2}></Grid>
        <Grid item xs={1} md={4}>
        <Input placeholder="Upload Data" onChange={getaddress}/>

        </Grid>
        </Grid>

        <br></br>        <br/>
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
        <br/>
        
        </div>
        </CardContent>
        </Grid>
        </Grid>
        </CardActionArea>
        </Card>
        </Grid>
        </Grid>
        {/* <Box sx={{ flexGrow: 1 }} style={{paddingTop:100 }}>
        
          <Grid container spacing={2}>
          <Grid item xs={1} md={2}>
          </Grid>
          <Grid item xs={6} md={8}>
            <Item>
            <Card>
              <CardActionArea>
                
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Choose a file to submit
                  </Typography>
                  
                  <form onSubmit={handleSubmit(onSubmit)}>
                  <input required ref={register} type="file" name = "uploadedfile"/>
                  <button> Submit </button>
                  </form>




                  <Form {...layout} name="nest-messages" >
                    
                    <Form.Item
                      name={['user', 'email']}
                      label="Email"
                      rules={[
                        {
                          type: 'email',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    
                    <Form.Item name={['user', 'website']} label="Website">
                      <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'introduction']} label="Introduction">
                      <Input.TextArea />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>


                  <MDBContainer>
                  <MDBRow>
                    <MDBCol md="6">
                      <form>
                        <p className="h4 text-center mb-4">Write to us</p>
                        <label htmlFor="defaultFormContactNameEx" className="grey-text">
                          Your name
                        </label>
                        <input type="text" id="defaultFormContactNameEx" className="form-control" />
                        <br />
                        <label htmlFor="defaultFormContactEmailEx" className="grey-text">
                          Your email
                        </label>
                        <input type="email" id="defaultFormContactEmailEx" className="form-control" />
                        <br />
                        <label htmlFor="defaultFormContactSubjectEx" className="grey-text">
                          Subject
                        </label>
                        <input type="text" id="defaultFormContactSubjectEx" className="form-control" />
                        <br />
                        <label htmlFor="defaultFormContactMessageEx" className="grey-text">
                          Your message
                        </label>
                        <textarea type="text" id="defaultFormContactMessageEx" className="form-control" rows="3" />
                        <div className="text-center mt-4">
                                  <MDBBtn color="warning" outline type="submit">
                                    Send
                                    <MDBIcon far icon="paper-plane" className="ml-2" />
                                  </MDBBtn>
                                </div>
                              </form>
                            </MDBCol>
                          </MDBRow>
                        </MDBContainer>















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
                  <button onClick={submit}>Submit Metadata</button>
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
            



                </CardContent>

              </CardActionArea>
            </Card>
            </Item>

          </Grid>
          <Grid item xs={6} md={4}>
            <Item>xs=6 md=4</Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item>xs=6 md=4</Item>
          </Grid>
          <Grid item xs={6} md={8}>
            <Item>xs=6 md=8</Item>
          </Grid>
          </Grid> 
        </Box> */}



      </div>
    </>

  );
}

export default App;
