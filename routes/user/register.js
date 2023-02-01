const express = require('express');
const checkapiapirouter = express.Router();

const https = require('https');

// for third party testing
checkapiapirouter.get('/checkapi', (reqt, resp, next) => {

    let request = https.get('https://jsonplaceholder.typicode.com/users', (res) => {
      if (res.statusCode !== 200) {
        console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
        res.resume();
        return;
      }
    
      let data = '';
    
      res.on('data', (chunk) => {
        data += chunk;
      });
    
      res.on('close', () => {

        console.log('Retrieved all data');
        //console.log(JSON.parse(data));
        return resp.status(200).send({
            msg: 'Retrieved all data!',
            
            body: JSON.parse(data)
          });
      });
    });

 
});


module.exports = checkapiapirouter;