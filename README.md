# arion-backend

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