"use client";

import { useState, useEffect } from "react";
import InputNumber from 'rc-input-number';
import {QRCodeSVG} from 'qrcode.react';

import { Button } from "@material-tailwind/react";

import { NumPad } from '@/components/NumPad'
import { generateXPub, generateAddress } from '@/utils/wallet'

import Loader from '../components/Loader';
import { useGetCryptosQuery } from "../services/cryptoApi"

const MNEMONIC = "talk story visual hidden behind wasp evil abandon bus brand circle sketch"

const Home = () => {
  const [mnemonic, setMnemonic] = useState(MNEMONIC)
  const [XPub, setXPub] = useState('')
  const [address, setAddress] = useState('')
  const [account, setAccount] = useState(0)
  const [change, setChange] = useState(0)
  const [index, setIndex] = useState(0)
  const [BIP21, setBIP21] = useState(false)
  const [payAmount, setPayAmount] = useState('')
  const [BIP21URL, setBIP21URL] = useState('')

  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  useEffect(() => {
    console.log("Xpub", XPub)
    if (XPub === '') return
    const addr = () => {
      const res = generateAddress(XPub, change, index)
      console.log(res);
      setAddress(res)
    }
    addr();
  }, [XPub, change, index])

  useEffect(() => {
    if (!BIP21 && payAmount != '') {
      setBIP21URL(address + `?amount=${payAmount}`)
    } else {
      setBIP21URL(address)
    }
  }, [address, payAmount, BIP21])

  const getXPub = async () => {
    const res = await generateXPub(mnemonic, account);
    console.log(res);
    setXPub(res);
  }

  const getNumPadAmount = (numpadAmount) => {
    console.log(numpadAmount)
    setPayAmount(numpadAmount)
  }

  if (isFetching) return <Loader />;

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
        <Button className="border-4 bg-transparent" onClick={() => { getXPub() }} >
          Get Extended Public Key
        </Button>
        <InputNumber
          value={account}
          onChange={(e) => setAccount(e)}
          min={0}
          required
          className="flex flex-start"
        />
        <InputNumber
          value={change}
          onChange={(e) => setChange(e)}
          min={0}
          required
          className="flex flex-start"
        />
        <InputNumber
          value={index}
          onChange={(e) => setIndex(e)}
          min={0}
          required
          className="flex flex-start"
        />
        { BIP21
          ? <Button className="border-4 bg-red-600" onClick={() => setBIP21(!BIP21)}>
              BIP44 Off
            </Button>
          : <Button className="border-4 bg-green-600" onClick={() => setBIP21(!BIP21)}>
              BIP44 On 
            </Button>
        }
      </div>

      <div className='flex-end mx-3 mb-5 gap-4'>XPub {XPub}</div>
      <div className='flex-end mx-3 mb-5 gap-4'>{globalStats.total}</div>
      <div className='flex-end mx-3 mb-5 gap-4'>BIP44 Path m/44'/1'/{account}'/{change}/{index}</div>
      <div className='flex-end mx-3 mb-5 gap-4'>Address {address}</div>
      <QRCodeSVG className="mb-5" value={BIP21URL} />
      <div className='flex-end mx-3 mb-5 gap-4'>{BIP21URL}</div>
      <NumPad inputAmount={getNumPadAmount} />

    </section>
  )
}

export default Home;