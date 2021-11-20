const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');

export function UploadingFile(data) {
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
    .then( (response) =>{
        ipfs_url = response.ipfs_url;
        console.log(ipfs_url);
        return ipfs_url;
    })
    .catch(err => {
        console.error(err);
    });

}