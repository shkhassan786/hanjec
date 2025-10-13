# This file contains instructions or information related to the SSL certificates used for HTTPS hosting.

# SSL Certificates for HTTPS Hosting

This directory contains the SSL certificates required for hosting the multilingual website over HTTPS. 

## Instructions

1. **Certificate Files**: Ensure that you have the following files in this directory:
   - `server.crt`: The SSL certificate file.
   - `server.key`: The private key file associated with the SSL certificate.

2. **Configuration**: Update your server configuration to point to these certificate files. For example, in your `server.js`, you should have something like:

   ```javascript
   const https = require('https');
   const fs = require('fs');

   const options = {
       key: fs.readFileSync('certs/server.key'),
       cert: fs.readFileSync('certs/server.crt')
   };

   https.createServer(options, app).listen(443);
   ```

3. **Testing**: After setting up the certificates, test your server by navigating to `https://yourdomain.com`. Ensure that the SSL certificate is valid and properly configured.

4. **Renewal**: Keep track of the expiration date of your SSL certificates and renew them as necessary to maintain secure connections.

5. **Security**: Always keep your private key secure and do not share it publicly. 

For further assistance, refer to the documentation provided by your SSL certificate provider.