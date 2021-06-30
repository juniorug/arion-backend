"use strict";

var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

const { Gateway, Wallets } = require("fabric-network");
const path = require("path");
const fs = require("fs");
const appUser = "appUser";
const { v4: uuidv4 } = require("uuid");

//create empty global gateway object
let gateway; //let gateway: Gateway;
//create empty global contract object
let contract; //let contract: Contract;

/***** ACTORS ******/

app.post("/api/actors/", async function (req, res) {
  try {
    console.log(`[createActor] called with body: ${req.body}. `);
    await prepareHyperledgerConnection();
    await createActor(req.body);
    await disconnectGateway();
    console.log("CreateActor Transaction has been submitted");

    await appendObjectToAsset("AddActor", req.body.actorID, req.body.assetID);
    console.log("AddActor Transaction has been submitted");

    res.status(201).send("Transaction has been submitted");
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.get("/api/actors", async function (req, res) {
  try {
    await prepareHyperledgerConnection();
    const result = await contract.evaluateTransaction("QueryAllActors");
    console.log(`Transaction evaluated. result is: ${result.toString()}`);
    res.status(200).json({ data: escapeBackslash(result) });
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.put("/api/actors/:id", async function (req, res) {
  try {
    await prepareHyperledgerConnection();
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
    await prepareHyperledgerConnection();
    const result = await contract.evaluateTransaction(
      "QueryActor",
      req.params.id
    );
    res.status(200).json({ data: escapeBackslash(result) });
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.delete("/api/actors/:id", async function (req, res) {
  try {
    await prepareHyperledgerConnection();
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

async function createActor(actor) {
  await contract.submitTransaction(
    "CreateActor",
    generateUuidIfNotProvided(actor.actorID),
    actor.actorType,
    actor.actorName,
    actor.aditionalInfoMap
  );
}

/***** STEPS ******/

app.post("/api/steps/", async function (req, res) {
  try {
    console.log(`[createStep] called with body: ${req.body}. `);
    await prepareHyperledgerConnection();
    await createStep(req.body);
    await disconnectGateway();
    console.log("CreateStep Transaction has been submitted");

    await appendObjectToAsset("AddStep", req.body.stepID, req.body.assetID);
    console.log("AddStep Transaction has been submitted");

    res.status(201).send("Transaction has been submitted");
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.get("/api/steps", async function (req, res) {
  try {
    await prepareHyperledgerConnection();
    const result = await contract.evaluateTransaction("QueryAllSteps");
    console.log(`Transaction evaluated. result is: ${result.toString()}`);
    res.status(200).json({ data: escapeBackslash(result) });
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.put("/api/steps/:id", async function (req, res) {
  try {
    await prepareHyperledgerConnection();
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
    await prepareHyperledgerConnection();
    const result = await contract.evaluateTransaction(
      "QueryStep",
      req.params.id
    );
    console.log(`Transaction. result is: ${result.toString()}`);
    res.status(200).json({ data: escapeBackslash(result) });
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.delete("/api/steps/:id", async function (req, res) {
  try {
    await prepareHyperledgerConnection();
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

async function createStep(step) {
  await contract.submitTransaction(
    "CreateStep",
    generateUuidIfNotProvided(step.stepID),
    step.stepName,
    step.stepOrder,
    step.actorType,
    step.aditionalInfoMap
  );
}
/***** ASSET_ITEMS ******/

app.post("/api/asset-items/", async function (req, res) {
  try {
    await prepareHyperledgerConnection();
    await contract.submitTransaction(
      "CreateAssetItem",
      generateUuidIfNotProvided(req.body.assetItemID),
      req.body.ownerID,
      req.body.stepID,
      req.body.deliveryDate,
      req.body.orderPrice,
      req.body.shippingPrice,
      req.body.status,
      req.body.quantity,
      req.body.aditionalInfoMap
    );
    await disconnectGateway();
    console.log("CreateAssetItem Transaction has been submitted");

    await appendObjectToAsset(
      "AddAssetItem",
      req.body.assetItemID,
      req.body.assetID
    );
    console.log("AddAssetItemID Transaction has been submitted");

    res.status(201).send("Transaction has been submitted");
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.get("/api/asset-items", async function (req, res) {
  try {
    await prepareHyperledgerConnection();
    const result = await contract.evaluateTransaction("QueryAllAssetItems");
    console.log(`Transaction evaluated. result is: ${result.toString()}`);
    res.status(200).json({ data: escapeBackslash(result) });
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.put("/api/asset-items/:id", async function (req, res) {
  try {
    await prepareHyperledgerConnection();
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
    await prepareHyperledgerConnection();
    const result = await contract.evaluateTransaction(
      "QueryAssetItem",
      req.params.id
    );
    console.log(`Transaction. result is: ${result.toString()}`);
    res.status(200).json({ data: escapeBackslash(result) });
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.delete("/api/asset-items/:id", async function (req, res) {
  try {
    await prepareHyperledgerConnection();
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

/** MOVE ASSET ITEM */
app.post("/api/asset-items/:id", async function (req, res) {
  try {
    await prepareHyperledgerConnection();
    await contract.submitTransaction(
      "MoveAssetItem",
      req.body.assetItemID,
      req.body.newAssetItemID,
      req.body.stepID,
      req.body.newOwnerID,
      req.body.orderPrice,
      req.body.shippingPrice,
      req.body.status,
      req.body.quantity,
      req.body.aditionalInfoMap
    );
    await disconnectGateway();
    console.log("MoveAssetItem Transaction has been submitted");

    await appendObjectToAsset(
      "AddAssetItem",
      req.body.newAssetItemID,
      req.body.assetID
    );
    console.log("AddAssetItemID Transaction has been submitted");

    res.send("Transaction has been submitted");
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

/** TRACK ASSET ITEM */
app.get("/api/asset-items/track/:id", async function (req, res) {
  try {
    await prepareHyperledgerConnection();
    const result = await contract.evaluateTransaction(
      "TrackAssetItem",
      req.params.id
    );
    console.log(`Transaction. result is: ${result.toString()}`);
    res.status(200).json({ data: escapeBackslash(result) });
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

/***** ASSETS ******/

app.post("/api/assets/", async function (req, res) {
  try {
    await prepareHyperledgerConnection();
    for (let actor of req.body.actors) {
      console.log("actor: ", actor);
      actor.actorID = generateUuidIfNotProvided(actor.actorID);
      console.log("generated actorId: ", actor.actorID);
      await createActor(actor);
    }
    for (let step of req.body.steps) {
      console.log("step: ", step);
      step.stepID = generateUuidIfNotProvided(step.stepID);
      console.log("generated stepID: ", step.stepID);
      await createStep(req.body);
    }
    await contract.submitTransaction(
      "CreateAsset",
      generateUuidIfNotProvided(req.body.assetID),
      req.body.assetName,
      req.body.description,
      req.body.assetItems,
      req.body.actors,
      req.body.steps,
      req.body.aditionalInfoMap
    );
    console.log("Transaction has been submitted");
    res.status(201).send("Transaction has been submitted");
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.get("/api/assets", async function (req, res) {
  try {
    await prepareHyperledgerConnection();
    const result = await contract.evaluateTransaction("QueryAllAssets");
    console.log(`Transaction evaluated. result is: ${result.toString()}`);
    res.status(200).json({ data: escapeBackslash(result) });
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.put("/api/assets/:id", async function (req, res) {
  try {
    await prepareHyperledgerConnection();
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
    await prepareHyperledgerConnection();
    const result = await contract.evaluateTransaction(
      "QueryAsset",
      req.params.id
    );
    console.log(`Transaction. result is: ${result.toString()}`);
    res.status(200).json({ data: escapeBackslash(result) });
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
  }
});

app.delete("/api/assets/:id", async function (req, res) {
  try {
    await prepareHyperledgerConnection();
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

app.post("/api/assets/:assetId/actors", async function (req, res) {
  await appendObjectToAsset("AddActor", req.body.actorId, req.body.assetId);
});

app.post("/api/assets/:assetId/steps", async function (req, res) {
  await appendObjectToAsset("AddStep", req.body.stepId, req.body.assetId);
});

app.post("/api/assets/:assetId/asset-items", async function (req, res) {
  await appendObjectToAsset(
    "AddAssetItem",
    req.body.assetItemId,
    req.body.assetId
  );
});

/***** HELPERS ******/

async function initGateway() {
  // load the network configuration
  const ccpPath = path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "..",
    "fabric-samples",
    "udemy_course",
    "Fabric2.2",
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

async function appendObjectToAsset(functionName, itemId, assetID) {
  try {
    console.log(
      `[appendObjectToAsset] called with functionName: ${functionName}, itemId: ${itemId} and assetID: ${assetID}. `
    );
    await prepareHyperledgerConnection();
    await contract.submitTransaction(functionName, itemId, assetID);
    console.log("Transaction has been submitted");
    await disconnectGateway();
  } catch (error) {
    console.error(
      `appendObjectToAsset: Failed to evaluate transaction: ${error}`
    );
    process.exit(1);
  }
}

async function disconnectGateway() {
  // Disconnect from the gateway.
  await gateway.disconnect();
}

function escapeBackslash(response) {
  return response.toString().includes('"')
    ? JSON.parse(response.toString())
    : response.toString();
}

function generateUuidIfNotProvided(id) {
  return id ? id : uuidv4();
}

app.listen(8080, "localhost");
console.log("Running on http://localhost:8080");
