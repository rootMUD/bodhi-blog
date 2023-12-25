# 🏗 Bodhi AI Explorer

<h4 align="center">
  <a href="https://smart-contract-explorer.movespace.xyz/"> -[ Lanuch App ]- </a>
</h4>

🧪 Bodhi AI Explorer 是一个基于向量化数据和智能合约的 Bodhi 内容搜索和去中心化内容标注 App。


## Quickstart

如果您想快速体验我们的功能请通过：<a href="https://bodhi.movespace.xyz/">Lanuch App</a>

## Frontend
### Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

To get started with Bodhi AI Explorer, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/NonceGeek/ai-based-smart-contract-explorer.git
cd ai-based-smart-contract-explorer
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the contract component or the example ui in the frontend. You can tweak the app config in `packages/nextjs/explorer.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `VectorDBProposalGovernancer.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`
## Reference

如果您想了解数据流的实现，请先下载我们实现的client：<a href="https://github.com/NonceGeek/movespace_db_uploader_cli/blob/main/movespace_db_uploader_cli">movespace_db_uploader_cli</a>

#### 请确保使用变量“EMBEDBASE_KEY” 将您获取的app_key存储在dotenv（.env）中

参数列表和类型：
```
 [path: :string, embedbaseid: :string, type: :string, insert: :boolean, delete: :boolean, metadata: :string],
```
参数别名：
```
f: :filepath, e: :embedbaseid, t: :type, i: :insert, d: :delete, m: :metadata
```
使用格式：
```
./movespace_db_uploader_cli --type [mddoc, code] --path [the_path_for_content] --metadata [the_path_for_metadata] --embedbaseid [embedbase_id] --insert
```
使用事例：

```
$ ./movespace_db_uploader_cli --type mddoc --path example_data/eth/analysis/erc20.md --metadata example_data/eth/analysis/erc20.json --embedbaseid eth-smart-contracts-analysis --insert
$ ./movespace_db_uploader_cli --type code --path example_data/eth/sliced/erc20.json --embedbaseid eth-smart-contracts-sliced --insert
```




## Architecture

![AI-based Smart Contract Explorer (3)](https://github.com/NonceGeek/ai-based-smart-contract-explorer/assets/12784118/505467a6-03ed-4730-abb8-5869d7bb5228)

