"use client";

import { useState, useEffect } from "react";
import InputNumber from 'rc-input-number';
import {QRCodeSVG} from 'qrcode.react';

import { generateXPub, generateAddress } from '@/utils/wallet'

import { NumPad } from '@/components/NumPad'

const MNEMONIC = "talk story visual hidden behind wasp evil abandon bus brand circle sketch"

const Home = () => {
  const [mnemonic, setMnemonic] = useState(MNEMONIC)
  const [XPub, setXPub] = useState('')
  const [address, setAddress] = useState('')
  const [index, setIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    console.log("Xpub", XPub)
    if (XPub === '') return
    const addr = () => {
      const res = generateAddress(XPub, index)
      console.log(res);
      setAddress(res)
    }
    addr();
  }, [XPub, index])  

  const getXPub = async () => {
    const res = await generateXPub(mnemonic);
    console.log(res);
    setXPub(res);
  }

  const increaseIndex = async () => {
    console.log(index)
    setIndex(index+1)
  }

  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        OPTN
        <br className='max-md:hidden' />
        <span className='orange_gradient text-center'> Point of Sales</span>
      </h1>
      <p className='desc text-center'>
        Self-hosted point of sales to accept cryptocurrency payment 
      </p>

      <div className='flex-end mx-3 mb-5 gap-4'>
        <button className="border-4 bg-transparent " onClick={() => { getXPub() }} >
          Get Extended Public Key
        </button>
        <InputNumber
          value={index}
          onChange={(e) => setIndex(e)}
          min={0}
          // max={9223372036854775807}
          // placeholder='total supply'
          required
          className="flex-start"
        />
      </div>

      <div className='flex-end mx-3 mb-5 gap-4'>XPub {XPub}</div>
      <div className='flex-end mx-3 mb-5 gap-4'>BIP44 Path m/44'/1'/0'/0/{index}</div>
      <div className='flex-end mx-3 mb-5 gap-4'>Address {address}</div>
      <QRCodeSVG value={address} />
      <NumPad />

    </section>
  )
}

export default Home;