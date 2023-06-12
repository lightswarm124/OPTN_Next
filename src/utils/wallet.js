// https://bchjs.fullstack.cash/
import BCHJS from '@psf/bch-js'

const BCHN_MAINNET = 'https://bchn.fullstack.cash/v5/'

const bchjs = new BCHJS({ restURL: BCHN_MAINNET })

export const generateXPub = async (mnemonic = '') => {
  if (mnemonic === '') {
    mnemonic = bchjs.Mnemonic.generate(128);
  }

  try {
    // create root seed buffer
    let rootSeedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
    // create master hd node
    let masterHDNode = bchjs.HDNode.fromSeed(rootSeedBuffer);
    // derive hardened child HDNode with BIP44 path
    let childNode = bchjs.HDNode.derivePath(masterHDNode, "m/44'/1'/0'");
    // to extended public key
    let bchXPub = bchjs.HDNode.toXPub(childNode)

    return bchXPub
  } catch (error) {
    console.log(error);
  }
}

export const generateAddress = (bchXPub, index = 0) => {
  try {
    let cashAddrBCH = bchjs.Address.fromXPub(bchXPub, `0/${index}`);
    return cashAddrBCH
  } catch (error) {
    console.log(error)
  }
}
