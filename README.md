# MetaBallot

A decentralized, blockchain-based voting platform built on Ethereum that ensures transparent, tamper-proof, and anonymous elections. Every vote is recorded on-chain, making results publicly auditable while preserving voter anonymity through wallet-based authentication.

---

## Overview

MetaBallot eliminates the need for centralized voting authorities by leveraging smart contracts to:
- Record and verify votes transparently
- Prevent vote tampering through immutability
- Maintain voter anonymity via wallet authentication
- Enable real-time result tracking

Perfect for organizations, DAOs, communities, and institutions requiring trustless, verifiable elections.

---

## Tech Stack

### Blockchain
- **Solidity** - Smart contracts for ballot logic, voter registration, and vote tallying
- **Hardhat** - Local blockchain development, testing, and deployment
- **OpenZeppelin** - Secure contract libraries

### Frontend
- **Next.js 12** - React framework with SSR
- **React 18** - UI library
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Web3Modal + Ethers.js** - Blockchain interaction
- **Lucide React** - Icons

### Storage & Services
- **IPFS (Pinata)** - Decentralized metadata storage
- **MetaMask** - Wallet connection

---

## Features

### For Organizers
- Create and manage voting elections
- Register authorized voters (allowlist-based)
- Add candidates with profile images
- View real-time voting statistics
- Deploy to multiple networks (Holesky, Polygon, BSC, Base)

### For Voters
- Connect wallet securely
- Browse candidates
- Cast votes (one per wallet)
- View voting status

### Security
- Smart contract enforces one-vote-per-wallet
- Only contract owner can add candidates/voters
- All votes stored on-chain
- IPFS for immutable metadata

---

## Project Structure

```
MetaBallot/
├── contracts/           # Solidity smart contracts
│   └── VotingContract.sol
├── context/            # React context for state management
│   ├── Voter.js        # Voting logic & blockchain interaction
│   └── constants.js    # Contract addresses & network config
├── pages/              # Next.js pages
│   ├── index.js        # Landing page redirect
│   ├── landing.jsx    # Marketing landing page
│   ├── home.js        # Voting dashboard
│   ├── allowed-voters.js    # Voter registration
│   ├── candidate-regisration.js  # Candidate registration
│   └── voterList.js   # Voter list
├── components/
│   ├── landing-components/  # Landing page UI components
│   ├── landing/            # Alternative landing components
│   ├── NavBar/             # Navigation
│   ├── card/               # Candidate cards
│   ├── Button/             # Reusable button
│   ├── Input/              # Form inputs
│   └── Loader.jsx          # Loading spinner
├── styles/             # CSS modules
├── hardhat.config.js  # Hardhat configuration
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MetaMask browser extension
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/your-repo/metaballot.git
cd metaballot

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Contract Configuration
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
NEXT_PUBLIC_CONTRACT_OWNER=your_wallet_address
NEXT_PUBLIC_NETWORK=holesky

# Pinata IPFS (for metadata storage)
NEXT_PUBLIC_PINATA_API_KEY=your_api_key
NEXT_PUBLIC_PINATA_SECRECT_KEY=your_secret_key
NEXT_PUBLIC_PINATA_POST_URL=https://api.pinata.cloud/pinning/pinFileToIPFS
NEXT_PUBLIC_PINATA_POST_JSON_URL=https://api.pinata.cloud/pinning/pinJSONToIPFS
NEXT_PUBLIC_PINATA_HASH_URL=https://gateway.pinata.cloud/ipfs/
NEXT_PUBLIC_PINATA_POST_JSON_URL=https://api.pinata.cloud/pinning/pinJSONToIPFS
```

### Running Locally

#### 1. Start Hardhat Node

```bash
npm run node
```

This starts a local blockchain at `http://localhost:8545`.

#### 2. Deploy Contract

In a new terminal:

```bash
npm run deploy-local
```

#### 3. Update Contract Address

Copy the deployed contract address from the output and update:
- `NEXT_PUBLIC_CONTRACT_ADDRESS` in `.env`
- `Create.json` ABI file in `context/`

#### 4. Run Frontend

```bash
npm run dev
```

Visit `http://localhost:3000`

#### 5. Connect MetaMask

- Add Hardhat Local Network (Chain ID: 31337, RPC: http://localhost:8545)
- Import an account from Hardhat (use one of the private keys shown when running `npm run node`)

---

## Smart Contract

### Contract: `Create.sol`

**Key Functions:**

| Function | Description |
|----------|-------------|
| `setCandidate()` | Add a new candidate (owner only) |
| `voterRight()` | Authorize a voter (owner only) |
| `vote()` | Cast a vote for a candidate |
| `getCandidate()` | Get all candidate addresses |
| `getVoterList()` | Get all authorized voters |
| `getVoterData()` | Get voter details by address |
| `getCandidateData()` | Get candidate details by address |

**Access Control:**
- Only the contract deployer (owner) can add candidates and authorize voters
- Anyone with voter rights can cast one vote per wallet

---

## Supported Networks

Configure in `context/constants.js`:
- **Holesky** (Testnet)
- **Polygon Amoy** (Testnet)
- **Polygon Mainnet**
- **BSC Mainnet**
- **Base Mainnet**
- **Base Sepolia** (Testnet)
- **Localhost** (Development)

---

## Deployment

### Deploy to Testnet

```bash
# Holesky
npm run deploy
```

Update `NEXT_PUBLIC_NETWORK` in `.env` to match.

---

## Usage Flow

1. **Landing Page** - View platform overview at `/`
2. **Connect Wallet** - Click "Start Voting" to connect MetaMask
3. **Voting Dashboard** - See candidates and cast votes at `/home`
4. **Admin Functions** (Owner only):
   - Register voters: `/allowed-voters`
   - Add candidates: `/candidate-regisration`
   - View voter list: `/voterList`

---

## License

MIT
