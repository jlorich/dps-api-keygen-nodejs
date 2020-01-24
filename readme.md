# Azure IoT Hub DPS key generation in Node

To call the Azure IoT Hub Device Provisioning Service API you can't use your credentials from the portal directly.  As these keys are highly secured they aren't something we want to pass over the internet.  These keys are instead used to generate short-lived Shared Access Signatures (SAS) that are used to authenticare requests to the DPS API.

In `index.js` you can find a short example taking your keys from DPS, generating a SAS, and making a basic web request to get an enrollment.  Simply fill in the 4 parameters at the top of the file and run it.

Here's what it looks like when running:

```
jlorich@games:/mnt/c/Users/Joseph/projects/dps-test$ node index.js
(node:451) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
statusCode:  200
headers:  {
  connection: 'close',
  date: 'Fri, 24 Jan 2020 19:21:00 GMT',
  'content-type': 'application/json; charset=utf-8',
  'transfer-encoding': 'chunked',
  'x-ms-request-id': '89d6cea1-95b4-423a-b3d8-51f6ac4a24d7',
  'strict-transport-security': 'max-age=31536000; includeSubDomains'
}
body:  {
  registrationId: 'YOUR-REGISTRATION-ID',
  registrationState: {
    registrationId: 'YOUR-REGISTRATION-ID',
    createdDateTimeUtc: '2020-01-20T19:52:20.8314563Z',
    assignedHub: 'YOUR-DPS-NAME.azure-devices.net',
    deviceId: 'YOUR-REGISTRATION-ID',
    status: 'assigned',
    substatus: 'initialAssignment',
    lastUpdatedDateTimeUtc: '2020-01-20T19:52:20.98529Z',
    etag: '"1d01341e-0000-0700-0000-5e2604f40000"'
  },
  attestation: { type: 'symmetricKey' },
  capabilities: { iotEdge: false },
  etag: 'IjAzMDAyMGQ3LTAwMDAtMDcwMC0wMDAwLTVlMTc1NDMwMDAwMCI=',
  provisioningStatus: 'enabled',
  reprovisionPolicy: { updateHubAssignment: true, migrateDeviceData: true },
  createdDateTimeUtc: '2020-01-09T16:26:24.8482637Z',
  lastUpdatedDateTimeUtc: '2020-01-09T16:26:24.8482637Z',
  allocationPolicy: 'hashed',
  iotHubs: [ 'YOUR-DPS-NAME.azure-devices.net' ]
}
```