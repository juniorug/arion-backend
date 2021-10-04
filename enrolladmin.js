/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";
const FabricCAServices = require("fabric-ca-client");
const { Wallets } = require("fabric-network");
const fs = require("fs");
const path = require("path");

async function main() {
  try {
    // load the network configuration
    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "home",
      "zeus",
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
    console.log("ccpPath: ", ccpPath);
    console.log("---01");
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
    
    console.log("---02");
    // Create a new CA client for interacting with the CA.
    const caInfo = ccp.certificateAuthorities["ca.org1.example.com"];
    const caTLSCACerts = caInfo.tlsCACerts.pem;
    const ca = new FabricCAServices(
      caInfo.url,
      { trustedRoots: caTLSCACerts, verify: false },
      caInfo.caName
    );

    console.log("---03");
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    console.log("---03.1A");
    console.log("Wallets:", Wallets);
    console.log("---03.1B");
    //const wallet = await Wallets.newFileSystemWallet(walletPath);
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log("---03.2. Wallet: ", wallet);
    console.log(`Wallet path: ${walletPath}`);

    console.log("---04");
    // Check to see if we've already enrolled the admin user.
    const identity = await wallet.get("admin");
    if (identity) {
      console.log(
        'An identity for the admin user "admin" already exists in the wallet'
      );
      return;
    }

    console.log("---05");
    // Enroll the admin user, and import the new identity into the wallet.
    const enrollment = await ca.enroll({
      enrollmentID: "admin",
      enrollmentSecret: "adminpw",
    });
    console.log("---06");
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: "Org1MSP",
      type: "X.509",
    };
    console.log("---07");
    await wallet.put("admin", x509Identity);
    console.log(
      'Successfully enrolled admin user "admin" and imported it into the wallet'
    );
  } catch (error) {
    console.error(`Failed to enroll admin user "admin": ${error}`);
    process.exit(1);
  }
}

main();
