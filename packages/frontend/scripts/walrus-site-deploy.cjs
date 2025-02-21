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
const WALRUS_SITE_OBJECT_ID_VARIABLE_NAME = 'WALRUS_SITE_OBJECT_ID'
const CONFIG_FILE_PATH = './.env.local'
const WALRUS_SITES_CONFIG_PATH = './walrus-sites.yaml'
const SITE_PATH = './dist'
const WALLET_CONFIG_PATH_FULL = '~/suibase/workdirs/testnet/config/client.yaml'
const NUMBER_OF_EPOCHS = 'max'
const BUY_WAL_TOKEN_BEFORE_RUN = false
const FORCE_UPDATE_EVERYTHING = false
// ~ Configuration.

const main = async () => {
  const configFilePathFull = path.join(process.cwd(), CONFIG_FILE_PATH)
  const walrusConfigPathFull = path.join(
    process.cwd(),
    WALRUS_SITES_CONFIG_PATH
  )
  const sitePathFull = path.join(process.cwd(), SITE_PATH)

  await createFileIfNecessary(configFilePathFull)

  let siteObjectId = await readSiteObjectId(configFilePathFull)

  if (BUY_WAL_TOKEN_BEFORE_RUN) {
    buyWalTokenIfPossible()
  }

  // If the site has not yet been published (no site object ID in the config),
  // then publish the site to Walrus Sites.
  if (siteObjectId == null) {
    console.log('Publishing the app to Walrus Sites...')
    const { stdout, stderr } = await exec(
      `site-builder --config ${walrusConfigPathFull} --wallet ${WALLET_CONFIG_PATH_FULL} publish --epochs ${NUMBER_OF_EPOCHS} ${sitePathFull}`
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
      await setEnvVar(
        configFilePathFull,
        WALRUS_SITE_OBJECT_ID_VARIABLE_NAME,
        siteObjectId
      )
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
    `site-builder --config ${walrusConfigPathFull} --wallet ${WALLET_CONFIG_PATH_FULL} update ${FORCE_UPDATE_EVERYTHING ? '--force' : ''} --epochs ${NUMBER_OF_EPOCHS} ${sitePathFull} ${siteObjectId}`,
    { stdio: 'inherit' }
  )
}

/**
 * Read Walrus site object ID from .env.local.
 *
 * @param {string} configFilePath
 * @returns
 */
const readSiteObjectId = async (configFilePath) => {
  const envFileWriter = new EnvFileWriter(configFilePath, false)
  await envFileWriter.parse()
  return envFileWriter.get(WALRUS_SITE_OBJECT_ID_VARIABLE_NAME, null)
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

const buyWalTokenIfPossible = () => {
  try {
    console.log('Buying test WAL coins from the faucet...')
    execSync(`walrus --wallet ${WALLET_CONFIG_PATH_FULL} get-wal`, {
      stdio: 'inherit',
    })
  } catch (e) {
    console.warn(e)
  }
}

// Main entry point.
main().catch((e) => {
  console.error(e)
})
