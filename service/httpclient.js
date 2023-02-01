
// var HttpClient = require("node-rest-client").Client;
// const fs = require("fs");
// var httpsAgent = require("https-agent");

// HttpClient = new HttpClient();

// const AppHtpClient = function(subUrl,  args,  fnSuccessCallBack,  fnErrorCallBack) {
//   HttpClient.post(subUrl, args, function(res) {
//     if (fnSuccessCallBack != undefined) {
//       fnSuccessCallBack(res);
//     }
//   })
//     .on("error", function(error) {
//       if (fnErrorCallBack != undefined) {
//         fnErrorCallBack(error);
//       }
//     })
//     .on("requestTimeout", function(req) {
//       req.abort();
//     })
//     .on("responseTimeout", function(res) {
//       res.abort();
//     });
// };

// export { AppHtpClient };
