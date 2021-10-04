# arion-backend
## Dependencies

* Node version: v11.14.0
* NPM: 7.24.0
* Fabric image: 2.2.0
* CA_DOCKER_IMAGE_VERSION=1.4.7


### Start the test-network

```
./runTestNetwork.sh
```

### Start the node server

```
./runServer.sh
```

### Fix common issues
If the errors below happens, please procedure as described 
#### Failed to register user "appUser"
```
cd /etc/hyperledger/fabric-ca-server/
apk add --no-cache curl jq python3 py3-pip sqlite
sqlite3 fabric-ca-server.db
delete from certificates where id='appUser';
delete from users where id='appUser';
```

#### npm does not support Node.js vxx.y.z

```
nvm use v11.14.0
```