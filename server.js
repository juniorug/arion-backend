"use strict";

var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

const { Gateway, Wallets } = require("fabric-network");
const path = require("path");
const fs = require("fs");
const appUser = "appUser";

//create empty global gateway object
let gateway: Gateway;
//create empty global contract object
let contract: Contract;

/***** ACTORS ******/

app.post("/api/actors/", async function (req, res) {
  try {
    prepareHyperledgerConnection();
    await contract.submitTransaction(
      "CreateActor",
      req.body.actorID,
      req.body.actorType,
      req.body.actorName,
      req.body.aditionalInfoMap
    );
    console.log("Transaction has been submitted");
    res.send("Transaction has been submitted");
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.get("/api/actors", async function (req, res) {
  try {
    prepareHyperledgerConnection();
    const result = await contract.evaluateTransaction("QueryAllActors");
    console.log(`Transaction evaluated. result is: ${result.toString()}`);
    res.status(200).json({ response: result.toString() });
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.put("/api/actors/:id", async function (req, res) {
  try {
    prepareHyperledgerConnection();
    await contract.submitTransaction(
      "UpdateActor",
      req.params.id,
      req.body.newOwner
    );
    console.log("Transaction has been submitted");
    res.send("Transaction has been submitted");
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.get("/api/actors/:id", async function (req, res) {
  try {
    prepareHyperledgerConnection();
    const result = await contract.evaluateTransaction(
      "QueryActor",
      req.params.id
    );
    console.log(`Transaction. result is: ${result.toString()}`);
    res.status(200).json({ response: result.toString() });
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.delete("/api/actors/:id", async function (req, res) {
  try {
    prepareHyperledgerConnection();
    const result = await contract.evaluateTransaction(
      "DeleteActor",
      req.params.id
    );
    console.log(`Transaction. result is: ${result.toString()}`);
    res.status(204).send();
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

/***** STEPS ******/

app.post("/api/steps/", async function (req, res) {
  try {
    prepareHyperledgerConnection();
    await contract.submitTransaction(
      "CreateStep",
      req.body.stepID,
      req.body.stepName,
      req.body.stepOrder,
      req.body.actorType,
      req.body.aditionalInfoMap
    );
    console.log("Transaction has been submitted");
    res.send("Transaction has been submitted");
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.get("/api/steps", async function (req, res) {
  try {
    prepareHyperledgerConnection();
    const result = await contract.evaluateTransaction("QueryAllSteps");
    console.log(`Transaction evaluated. result is: ${result.toString()}`);
    res.status(200).json({ response: result.toString() });
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.put("/api/steps/:id", async function (req, res) {
  try {
    prepareHyperledgerConnection();
    await contract.submitTransaction(
      "UpdateStep",
      req.params.id,
      req.body.newOwner
    );
    console.log("Transaction has been submitted");
    res.send("Transaction has been submitted");
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.get("/api/steps/:id", async function (req, res) {
  try {
    prepareHyperledgerConnection();
    const result = await contract.evaluateTransaction(
      "QueryStep",
      req.params.id
    );
    console.log(`Transaction. result is: ${result.toString()}`);
    res.status(200).json({ response: result.toString() });
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.delete("/api/steps/:id", async function (req, res) {
  try {
    prepareHyperledgerConnection();
    const result = await contract.evaluateTransaction(
      "DeleteStep",
      req.params.id
    );
    console.log(`Transaction. result is: ${result.toString()}`);
    res.status(204).send();
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

/***** ASSET_ITEMS ******/

app.post("/api/asset-items/", async function (req, res) {
  try {
    prepareHyperledgerConnection();
    await contract.submitTransaction(
      "CreateAssetItem",
      req.body.assetItemID,
      req.body.currentOwnerID,
      req.body.processDate,
      req.body.deliveryDate,
      req.body.orderPrice,
      req.body.shippingPrice,
      req.body.status,
      req.body.aditionalInfoMap
    );
    console.log("Transaction has been submitted");
    res.send("Transaction has been submitted");
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.get("/api/asset-items", async function (req, res) {
  try {
    prepareHyperledgerConnection();
    const result = await contract.evaluateTransaction("QueryAllAssetItems");
    console.log(`Transaction evaluated. result is: ${result.toString()}`);
    res.status(200).json({ response: result.toString() });
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.put("/api/asset-items/:id", async function (req, res) {
  try {
    prepareHyperledgerConnection();
    await contract.submitTransaction(
      "UpdateAssetItem",
      req.params.id,
      req.body.newOwner
    );
    console.log("Transaction has been submitted");
    res.send("Transaction has been submitted");
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.get("/api/asset-items/:id", async function (req, res) {
  try {
    prepareHyperledgerConnection();
    const result = await contract.evaluateTransaction(
      "QueryAssetItem",
      req.params.id
    );
    console.log(`Transaction. result is: ${result.toString()}`);
    res.status(200).json({ response: result.toString() });
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.delete("/api/asset-items/:id", async function (req, res) {
  try {
    prepareHyperledgerConnection();
    const result = await contract.evaluateTransaction(
      "DeleteAssetItem",
      req.params.id
    );
    console.log(`Transaction. result is: ${result.toString()}`);
    res.status(204).send();
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

/***** ASSETS ******/

app.post("/api/assets/", async function (req, res) {
  try {
    prepareHyperledgerConnection();
    await contract.submitTransaction(
      "CreateEmptyAsset",
      req.body.assetID,
      req.body.assetName,
      req.body.aditionalInfoMap
    );
    console.log("Transaction has been submitted");
    res.send("Transaction has been submitted");
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.get("/api/assets", async function (req, res) {
  try {
    prepareHyperledgerConnection();
    const result = await contract.evaluateTransaction("QueryAllAssets");
    console.log(`Transaction evaluated. result is: ${result.toString()}`);
    res.status(200).json({ response: result.toString() });
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.put("/api/assets/:id", async function (req, res) {
  try {
    prepareHyperledgerConnection();
    await contract.submitTransaction(
      "UpdateAsset",
      req.params.id,
      req.body.newOwner
    );
    console.log("Transaction has been submitted");
    res.send("Transaction has been submitted");
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.get("/api/assets/:id", async function (req, res) {
  try {
    prepareHyperledgerConnection();
    const result = await contract.evaluateTransaction(
      "DeleteAsset",
      req.params.id
    );
    console.log(`Transaction. result is: ${result.toString()}`);
    res.status(200).json({ response: result.toString() });
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.delete("/api/assets/:id", async function (req, res) {
  try {
    prepareHyperledgerConnection();
    const result = await contract.evaluateTransaction(
      "DeleteAsset",
      req.params.id
    );
    console.log(`Transaction. result is: ${result.toString()}`);
    res.status(204).send();
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.put("/api/assets/:assetId/actors/:actorId", async function (req, res) {
  try {
    prepareHyperledgerConnection();
    await contract.submitTransaction(
      "AddActor",
      req.params.assetId,
      req.params.actorId
    );
    console.log("Transaction has been submitted");
    res.send("Transaction has been submitted");
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.put("/api/assets/:assetId/steps/:stepId", async function (req, res) {
  try {
    prepareHyperledgerConnection();
    await contract.submitTransaction(
      "AddStep",
      req.params.assetId,
      req.params.stepId
    );
    console.log("Transaction has been submitted");
    res.send("Transaction has been submitted");
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.put(
  "/api/assets/:assetId/asset-items/:assetItemId",
  async function (req, res) {
    try {
      prepareHyperledgerConnection();
      await contract.submitTransaction(
        "AddAssetItem",
        req.params.assetId,
        req.params.assetItemId
      );
      console.log("Transaction has been submitted");
      res.send("Transaction has been submitted");
      await disconnectGateway();
    } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      process.exit(1);
    }
  }
);

/***** HELPERS ******/
async function initGateway() {
  // load the network configuration
  const ccpPath = path.resolve(
    __dirname,
    "..",
    "fabric-samples",
    "test-network",
    "organizations",
    "peerOrganizations",
    "org1.example.com",
    "connection-org1.json"
  );
  const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

  // Create a new file system based wallet for managing identities.
  const walletPath = path.join(process.cwd(), "wallet");
  const wallet = await Wallets.newFileSystemWallet(walletPath);
  console.log(`Wallet path: ${walletPath}`);

  // Check to see if we've already enrolled the user.
  const identity = await wallet.get("appUser");
  if (!identity) {
    console.log(
      `An identity for the user ${appUser} does not exist in the wallet`
    );
    console.log("Run the registerUser.js application before retrying");
    return;
  }

  // Create a new gateway for connecting to our peer node.
  gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identity: appUser,
    discovery: { enabled: true, asLocalhost: true },
  });
}

async function loadContract() {
  const network = await gateway.getNetwork("testchannel");
  contract = network.getContract("arion");
}

async function prepareHyperledgerConnection() {
  await initGateway();
  await loadContract();
}

async function disconnectGateway() {
  // Disconnect from the gateway.
  await gateway.disconnect();
}

app.listen(8080, "localhost");
console.log("Running on http://localhost:8080");
