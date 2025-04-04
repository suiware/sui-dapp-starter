#!/usr/bin/env node

/**
 * The script publishes to or updates the app on Walrus Sites.
 * After publishing the app, site object ID is copied to .env.local, which is used later to update the app on Walrus Sites.
 * See Configuration section below for more details.
 */

const { promises } = require('node:fs')
const path = require('node:path')
const EnvFileWriter = require('env-file-rw').default
const { execSync, exec } = require('node:child_process')

// Configuration.
const CONFIG_FILE_PATH = './.env.local'
const SITE_PATH = './dist'
const NUMBER_OF_EPOCHS = 1 // "max" means 53 epochs or 2 years currently.
const BUY_WAL_TOKEN_BEFORE_RUN = false
const FORCE_UPDATE_EVERYTHING = false
const WALRUS_SITE_OBJECT_ID_VARIABLE_NAME_BASE = 'WALRUS_SITE_OBJECT_ID'
// ~ Configuration.

const main = async () => {
  const network = getNetworkFromArgs()

  const configFilePathFull = path.join(process.cwd(), CONFIG_FILE_PATH)
  const sitePathFull = path.join(process.cwd(), SITE_PATH)

  await createFileIfNecessary(configFilePathFull)

  let siteObjectId = await readSiteObjectId(configFilePathFull, network)

  if (BUY_WAL_TOKEN_BEFORE_RUN) {
    buyWalTokenIfPossible(network)
  }

  // If the site has not yet been published (no site object ID in the config),
  // then publish the site to Walrus Sites.
  if (siteObjectId == null) {
    console.log('Publishing the app to Walrus Sites...')
    const { stdout, stderr } = await exec(
      `${getWalrusSitesCli(network)} publish --epochs ${NUMBER_OF_EPOCHS} ${sitePathFull}`
    )

    // Get the site object ID from the publish command output.
    stdout.on('data', async (data) => {
      console.log(data)

      const regex = /New site object ID: (.+)/
      const result = data.match(regex)

      // If the line doesn't have site object ID, ignore it.
      if (result == null) {
        return
      }

      siteObjectId = result[1].trim()

      // Save site object ID to the config file.
      await saveSiteObjectId(configFilePathFull, network, siteObjectId)
    })

    stderr.on('data', async (error) => {
      console.error(error)
      // Do not exit if it's a warning.
      // @todo: Find a better way to catch warnings, e.g. by severity level or error code.
      if (error.startsWith('[warn]')) {
        return
      }
      process.exit()
    })

    return
  }

  if (siteObjectId == null) {
    console.error(
      '~ The script could not find the site object ID in the output.'
    )
    console.error(
      '~ If you see it, please add WALRUS_SITE_OBJECT_ID=[site object ID from the output] into packages/frontend/.env.local manually.'
    )
    return
  }

  console.log('Updating the app on Walrus Sites...')
  execSync(
    `${getWalrusSitesCli(network)} update ${FORCE_UPDATE_EVERYTHING ? '--force' : ''} --epochs ${NUMBER_OF_EPOCHS} ${sitePathFull} ${siteObjectId}`,
    { stdio: 'inherit' }
  )
}

/**
 * Read Walrus site object ID from .env.local.
 *
 * @param {string} configFilePath
 * @param {string} network
 * @returns
 */
const readSiteObjectId = async (configFilePath, network) => {
  const envFileWriter = new EnvFileWriter(configFilePath, false)
  await envFileWriter.parse()
  return envFileWriter.get(getWalrusObjectIdVariableName(network), null)
}

/**
 * Save Walrus site object ID t0.env.local.
 *
 * @param {string} configFilePath
 * @param {string} network
 * @param {string} siteObjectId
 * @returns
 */
const saveSiteObjectId = async (configFilePath, network, siteObjectId) => {
  await setEnvVar(
    configFilePath,
    getWalrusObjectIdVariableName(network),
    siteObjectId
  )
}

/**
 * Create a file if it doesn't exist.
 *
 * @param {string} filePath
 * @returns
 */
const createFileIfNecessary = async (filePath) => {
  try {
    await promises.writeFile(filePath, '', { flag: 'wx' })
  } catch {}
}

/**
 * Set the environment variable in the .env.local file.
 *
 * @param {string} envFilePath
 * @param {string} name
 * @param {string} value
 * @returns
 */
const setEnvVar = async (envFilePath, name, value) => {
  const envFileWriter = new EnvFileWriter(envFilePath, false)
  await envFileWriter.parse()
  envFileWriter.set(name, value)
  await envFileWriter.save()
}

const buyWalTokenIfPossible = (network) => {
  try {
    console.log('Buying WAL coins...')
    execSync(`${getWalrusCli(network)} get-wal`, {
      stdio: 'inherit',
    })
  } catch (e) {
    console.warn(e)
  }
}

const getNetworkFromArgs = () => {
  const arg = process.argv.slice(2)

  switch (arg[0]) {
    case '-n':
      return arg[1]

    default:
      return 'testnet'
  }
}

const getWalrusCli = (network) => {
  return network === 'mainnet' ? 'mwalrus' : 'twalrus'
}
const getWalrusSitesCli = (network) => {
  return network === 'mainnet' ? 'msite' : 'tsite'
}

const getWalrusObjectIdVariableName = (network) => {
  return `${WALRUS_SITE_OBJECT_ID_VARIABLE_NAME_BASE}_${network.toUpperCase()}`
}

// Main entry point.
main().catch((e) => {
  console.error(e)
})
