const bcrypt = require ('bcrypt');

const saltRounds = 10;
const UtilService = 
{
    
    encrypt : function(str)
    {
        //console.log("test encryption " + str );
        // do your stuff
    },
    decrypt : function()
    {
        //console.log("test decryption " + str );
    },
    hashPassword: (password) => {
         return bcrpyt.hash(password, salt, (err, hash) => {
                if (err) reject();
                resolve(hash);
            });
      }
    

};

module.exports = UtilService;