# Sui dApp Starter - Easy-to-Use Full-Stack Sui Starter
[![Build and Lint (frontend)](https://github.com/suiware/sui-dapp-starter/actions/workflows/build_and_lint.yaml/badge.svg)](https://github.com/suiware/sui-dapp-starter/actions/workflows/build_and_lint.yaml)
[![Discord chat](https://img.shields.io/discord/1237259509366521866.svg?logo=discord&style=flat-square)](https://discord.com/invite/HuDPpXz4Hx)

![Spoiler](https://repository-images.githubusercontent.com/794883099/f0937c6b-c021-41db-b44a-a287b29111c3)

[Won the 1st place in the Randomness category of the Sui Overflow 2024 hackathon](https://blog.sui.io/2024-sui-overflow-hackathon-winners/)

## Motivation

Most of the Sui starters I found were either very basic or one-sided (frontend or backend). Thanks to my experience with various full-stack starters and templates, I knew how to do better, so I started this template with the goal of providing all basic tools and components for you to focus on your business logic from day one and not spend weeks on creating your app skeleton. // [@kkomelin](https://github.com/kkomelin)

## Features

- **[Suibase](https://suibase.io/)**: Painless work with the networks and system dependencies
- **[Local Sui Explorer](https://github.com/suiware/sui-explorer)**: Browse your transactions and objects locally
- **pnpm**: More efficient package management for monorepos
- **TypeScript**: Less error-prone JavaScript
- **React or Next.js**: Choose a template with a framework of your choice
- **Tailwind CSS**: Utility-first CSS for more efficient styling
- **Vite + SWC**: Faster app bundling and optimizing
- **Radix UI**: Accessible React components to prototype quicker 
- **Sui dApp Kit**: All you need to work with Sui network on frontend
- **[@suiware/kit](https://www.npmjs.com/package/@suiware/kit)**: Useful react primitives, such as useTransact, useNetworkType, NetworkType, useBalance, Balance, useFaucet, Faucet and more
- **Frontend Deployment**: [Firebase](https://sui-dapp-starter.dev/docs/frontend/deployment/firebase), [Walrus Sites](https://sui-dapp-starter.dev/docs/frontend/deployment/walrus), [Arweave](https://sui-dapp-starter.dev/docs/frontend/deployment/arweave)
- **One-liner Install**: Just `pnpm create sui-dapp@latest`
- **[Demo app](https://demo.sui-dapp-starter.dev/)**: Default Greeting (React) template

## Prerequisites

Before you begin, install the following:

- [Suibase](https://suibase.io/how-to/install.html)
- [Node (>= 20)](https://nodejs.org/en/download/)
- [pnpm (>= 9)](https://pnpm.io/installation)

## Installation

### Option 1. Use the Github template

1. [Create a new project from the template](https://github.com/new?template_name=sui-dapp-starter&template_owner=suiware&name=my-sui-dapp).

2. Clone the resulting repo locally.

3. Choose a template by running the corresponding init command:

| Template | Init command |
| --- | --- |
| Greeting (React) | `pnpm init:template:greeting-react` |
| Greeting (Next.js) | `pnpm init:template:greeting-next` |
| Counter (React) | `pnpm init:template:counter-react` |

[Template Guide](https://sui-dapp-starter.dev/docs/templates)

### Option 2. Use CLI

```bash
pnpm create sui-dapp@latest
```

This way you'll be able to configure the project step-by-step.

## Usage

#### 1. Run the local Sui network:

```bash
pnpm localnet:start
```

Local Sui Explorer will be available on [localhost:9001](http://localhost:9001/)

#### 2. Deploy the demo contract to the local network:

```bash
pnpm localnet:deploy
```

_This command skips dependency verifications to prevent dependency version mismatch issues, which are caused by local and remote Sui version mismatch. The deploy commands for devnet, testnet and mainnet do perform such verifications._

#### 3. Switch to the local network in your browser wallet settings.

#### 4. Fund your localnet account/address:

You have a few options here:

a) Use the Faucet button integrated into your wallet (e.g. Sui Wallet).

b) Copy the localnet address from your wallet and run the following in your console:

```bash
pnpm localnet:faucet 0xYOURADDRESS
```

c) Run the app and use the Faucet button in the footer.

#### 5. Run the app:

```bash
pnpm start
```
Find all commands in the [documentation](https://sui-dapp-starter.dev/docs/misc/commands/).

## Test

#### Backend

```bash
pnpm test
```

## Docs & Support

- [Sui dApp Starter Docs](https://sui-dapp-starter.dev/docs)
- [Available PNPM Commands](https://sui-dapp-starter.dev/docs/misc/commands/)
- [@suiware/kit Docs](https://www.npmjs.com/package/@suiware/kit)
- [Discord Support](https://discord.com/invite/HuDPpXz4Hx)  

## Useful Links

- [Useful VSCode Extensions](./.vscode/extensions.json)
- [Suibase Docs](https://suibase.io/intro.html)
- [Move Book](https://move-book.com/)
- [Sui Move: Code Conventions](https://docs.sui.io/concepts/sui-move-concepts/conventions)
- [@mysten/create-dapp - official starter](https://www.npmjs.com/package/@mysten/create-dapp)
- [Awesome Sui](https://github.com/sui-foundation/awesome-sui)

## License & Copyright

Copyright (c) 2024 Konstantin Komelin and other contributors

Code is licensed under [MIT](https://github.com/suiware/sui-dapp-starter?tab=MIT-1-ov-file)

SVG Graphics used for NFTs is licensed under [CC-BY 4.0](https://github.com/suiware/sui-dapp-starter?tab=CC-BY-4.0-2-ov-file)
