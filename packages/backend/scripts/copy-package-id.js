#!/usr/bin/env node

/**
 * The script copies the deployed package ID from the corresponding Suibase network file to .env.local of the frontend package,
 * which is then read by the app.
 *
 * The default network is localnet. To change it, pass "-n [NETWORK_TYPE]" through console.
 */

const { promises } = require("node:fs");
const { homedir } = require("node:os");
const path = require("node:path");
const EnvFileWriter = require("env-file-rw").default;

const DEPLOYED_MODULE_NAME = "greeting";

const main = async () => {
  const network = getNetworkFromArgs();

  // Read package ID from Suibase packageId file.
  const packageId = await readPackageId(network);

  // Create .env.local file if it doesn't exist.
  const targetFile = targetFilePath();
  await createFileIfNecessary(targetFile);

  // Check whether the frontend is Next.js-powered to decide what environment variable name format to use.
  const isNextJs = await isNextJsProject();

  // Add Move package ID to .env.local or update it if it already exists.
  await setEnvVar(
    targetFile,
    `${isNextJs ? "NEXT_PUBLIC" : "VITE"}_${network.toUpperCase()}_CONTRACT_PACKAGE_ID`,
    packageId
  );
};

const sourceFilePath = (network, deployedModuleName) => {
  return path.join(
    homedir(),
    `/suibase/workdirs/${network}/published-data/${deployedModuleName}/most-recent/package-id.json`
  );
};

const targetFilePath = () => {
  return path.join(process.cwd(), "../frontend/.env.local");
};

const getNetworkFromArgs = () => {
  const arg = process.argv.slice(2);

  switch (arg[0]) {
    case "-n":
      return arg[1];

    default:
      return "localnet";
  }
};

/**
 * Read package ID from SuiBase packageId file.
 *
 * @param {string} network
 * @returns
 */
const readPackageId = async (network) => {
  const sourceFile = sourceFilePath(network, DEPLOYED_MODULE_NAME);
  const data = await promises.readFile(sourceFile, "utf8");
  return JSON.parse(data)[0];
};

/**
 * Create a file if it doesn't exist.
 *
 * @param {string} filePath
 * @returns
 */
const createFileIfNecessary = async (filePath) => {
  try {
    await promises.writeFile(filePath, "", { flag: "wx" });
  } catch {}
};

/**
 * Set the environment variable in the .env.local file.
 *
 * @param {string} envFilePath
 * @param {string} name
 * @param {string} value
 * @returns
 */
const setEnvVar = async (envFilePath, name, value) => {
  const envFileWriter = new EnvFileWriter(envFilePath, false);
  await envFileWriter.parse();
  envFileWriter.set(name, value);
  await envFileWriter.save();
};

/**
 * Check if next.config.ts exists in the frontend package.
 *
 * @returns {boolean}
 */
const isNextJsProject = async () => {
  try {
    await promises.stat(path.join(process.cwd(), "../frontend/next.config.ts"));
    return true;
  } catch {
    return false;
  }
};

// Main entry point.
main().catch((e) => {
  console.error(e);
});
