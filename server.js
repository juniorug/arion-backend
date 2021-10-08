"use strict";

var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

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
    console.log(`[createActor] called with body: ${JSON.stringify(req.body)}. `);
    await prepareHyperledgerConnection();
    await createActor(req.body);
    await disconnectGateway();
    console.log("CreateActor Transaction has been submitted");

    await appendObjectToAsset("AddActor", req.body.actorID, req.body.assetID);
    console.log("AddActor Transaction has been submitted");

    res.status(201).send("Transaction has been submitted");
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).send("Internal server error. Please try again later.");
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
    res.status(500).send("Internal server error. Please try again later.");
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
    res.status(500).send("Internal server error. Please try again later.");
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
    res.status(500).send("Internal server error. Please try again later.");
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
    res.status(500).send("Internal server error. Please try again later.");
  }
});

async function createActor(actor) {
  actor.actorID = generateUuidIfNotProvided(actor.actorID);
  console.log("createActor called: ", actor);
  await contract.submitTransaction(
    "CreateActor",
    actor.actorID,
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
    res.status(500).send("Internal server error. Please try again later.");
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
    res.status(500).send("Internal server error. Please try again later.");
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
    res.status(500).send("Internal server error. Please try again later.");
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
    res.status(500).send("Internal server error. Please try again later.");
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
    res.status(500).send("Internal server error. Please try again later.");
  }
});

async function createStep(step) {
  generateUuidIfNotProvided(step.stepID),
  console.log("createStep called: ", step);
  await contract.submitTransaction(
    "CreateStep",
    step.stepID,
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
    req.body.assetItemID = generateUuidIfNotProvided(req.body.assetItemID);
    await contract.submitTransaction(
      "CreateAssetItem",
      req.body.assetItemID,
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
    res.status(500).send("Internal server error. Please try again later.");
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
    res.status(500).send("Internal server error. Please try again later.");
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
    res.status(500).send("Internal server error. Please try again later.");
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
    res.status(500).send("Internal server error. Please try again later.");
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
    res.status(500).send("Internal server error. Please try again later.");
  }
});

/** MOVE ASSET ITEM */
app.post("/api/asset-items/:id", async function (req, res) {
  try {
    req.body.newAssetItemID = generateUuidIfNotProvided(
      req.body.newAssetItemID
    );
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
    res.status(500).send("Internal server error. Please try again later.");
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
    res.status(500).send("Internal server error. Please try again later.");
  }
});

/***** ASSETS ******/

app.post("/api/assets/", async function (req, res) {
  try {
    await prepareHyperledgerConnection();
    
    /* for (let assetItem of req.body.assetItems) {
      console.log("assetItem: ", assetItem);
      assetItem.assetItemID = generateUuidIfNotProvided(assetItem.assetItemID);
      console.log("generated assetItemId: ", assetItem.assetItemID);
      await createAssetItem(assetItem);
      console.log("CreateAssetItem Transaction has been submitted");
    } */
    
    /* for (let actor of req.body.actors) {
      console.log("actor: ", actor);
      actor.actorID = generateUuidIfNotProvided(actor.actorID);
      console.log("generated actorId: ", actor.actorID);
      await createActor(actor);
      console.log("CreateActor Transaction has been submitted");
    } */
    
    /* for (let step of req.body.steps) {
      console.log("step: ", step);
      step.stepID = generateUuidIfNotProvided(step.stepID);
      console.log("generated stepID: ", step.stepID);
      await createStep(req.body);
      console.log("createStep Transaction has been submitted");
    } */
    req.body.assetID = generateUuidIfNotProvided(req.body.assetID);
    console.log("before contract.submitTransaction for assetID: ", req.body.assetID);
    //req.body.actors = ${JSON.stringify(req.body.actors)};
    console.log(`[CreateAsset] called with body: ${JSON.stringify(req.body)}. `);
    await contract.submitTransaction(
      "CreateAsset",
      preventEmptyField(req.body.assetID),
      preventEmptyField(req.body.assetName),
      preventEmptyField(req.body.description),
      JSON.stringify(preventNullList(req.body.assetItems)),
      JSON.stringify(preventNullList(req.body.actors)),
      JSON.stringify(preventNullList(req.body.steps)),
      JSON.stringify(preventNullList(req.body.aditionalInfoMap)),
    );
    console.log("CreateAsset Transaction has been submitted");
    res.status(201).send("Transaction has been submitted");
    await disconnectGateway();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).send("Internal server error. Please try again later.");
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
    res.status(500).send("Internal server error. Please try again later.");
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
    res.status(500).send("Internal server error. Please try again later.");
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
    res.status(500).send("Internal server error. Please try again later.");
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
    res.status(500).send("Internal server error. Please try again later.");
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
    "goProject",
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
    res.status(500).send("Internal server error. Please try again later.");
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

function preventEmptyField(field) {
  return field ? field : "";
}

function preventNullList(field) {
  return (Boolean(field))? field :[];
}


app.listen(8080, "localhost");
console.log("Running on http://localhost:8080");
