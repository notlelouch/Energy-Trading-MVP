# CHANGELOG


## 1.3.22

- fix getNetWork


## 1.3.21

- fix connect
- update `DummyProvider` fee


## 1.3.20

- multi call Use respective signer 

## 1.3.19

- Fix #482


## 1.3.18

- support panda 2.0

## 1.3.17

- optimizing defaultProvider
- add `getOffchainUpdates()` to `SmartContract`
  
**breaking change**
  
- remove `offchainUpdates` of `SmartContract`



## 1.3.16

- add `PandaSigner`
- implement the following functions in `abstract` Signer:
  
  1. `signRawTransaction`
  2. `signTransaction`




## 1.3.14

- TAAL and GorillaPool providers fetch current fee rate upon connect.
- WoC provider - lowered fee rate to 1 sat / KB.


## 1.3.13

1. support override `this.lockingScript`
2. support override `this.init()`
3. support access `this.delegateInstance`


## 1.3.11

- add `getDefaultTxBuilder()`

## 1.3.10

- rename `setConstructor()` to `init()`
- add `fromUTXO()`



## 1.3.9

- support attaching a NOP script (like 1sat ordinal) to a contract instance. 

  **example:**

  ```ts
    const demo = new Demo(1n, 2n)

    // connect to a signer
    await demo.connect(getDefaultSigner())

    const nopScript = bsv.Script.fromASM("OP_FALSE OP_IF ... OP_ENDIF");

    demo.prependNOPScript(nopScript)

    // contract deployment
    const deployTx = await demo.deploy(1)
    console.log('Demo contract deployed: ', deployTx.id)

    // create instance from transaction
    let currentInstance = Demo.fromTx(deployTx, 0, {}, nopScript);

  ```


- add build-ins function `this.timeLock()`， see https://docs.scrypt.io/tutorials/timeLock
  
  **example:**

  ```ts
  assert(this.timeLock(this.locktime0), 'time lock for locktime0 failed')
  ```
 

## 1.3.8

- augment bsv types with  `.toByteString()`
- change domain specific byte types to take `ByteString` as init. param instead of `Bytes`
- add `Addr` type
- add `pubKey2Addr` helper function


## 1.3.7

- fix `this.debug.diffOutputs(outputs: ByteString)` issue.


## 1.3.5

- fix `slice()` issue.
- support attaching ordinal inscription to a contract instance. 

**example:**

```ts
  const demo = new Demo(1n, 2n)

  // connect to a signer
  await demo.connect(getDefaultSigner())

  demo.setOrdinal({
      content: toByteString("hello, this is demo contract.", true),
      contentType: "text/plain"
  })

  // contract deployment
  const deployTx = await demo.deploy(1)
  console.log('Demo contract deployed: ', deployTx.id)
```


- 
## 1.3.4

- fix `TestWallet` issue


## 1.3.3

- fix `fill` issue
- verify transaction when `process.env.NETWORK === 'local'`
  
## 1.3.2

- fix fee issue

## 1.3.1

- auto verify `this.prevouts`  

## 1.3.0

- support `this.prevouts`
- fix `signer.connect()`
- fix auto pay fee


## 1.2.2

- refactor find `scrypt.index.json` file
- support auto find tx builder by method name


## 1.1.0

- remove transpiler code

## 1.0.2

- catch websocket error events


## 1.0.1

- add dependencies overrides


## 1.0.0

- support [TAAL Wallet](https://chrome.google.com/webstore/detail/taal-wallet/engokokaoeppkmchbkjeoeimiffobcke?hl=en-GB)
- support typescript `5.x.x`, 

**note:** 

```ts
If you want to update `scrypt-ts` in your project to the latest `1.0.0` version, just execute `npm install typescript@latest` to upgrade `Typescript` used in your project.
```

- fix known issues



## 0.3.0-beta.2

- fix bsv patch.


## 0.3.0-beta.1

- support typescript `5.x.x`
- 

## 0.2.4-beta.1

- support typescript `4.9.x`
  

## 0.2.3-beta.1

- remove `src\contracts` path in `artifacts` directory

## 0.2.2-beta.6

- fix list listUnspent

## 0.2.2-beta.1

- fix Sensible API error
- Add prompt information when the provider's network does not match the private key


## 0.2.1-beta.9

- update `len` and `reverseByteString` functions, only `bigint` now

## 0.2.1-beta.8

- add `slice(b: ByteString, start: bigint, end?: bigint): ByteString` issue, `ByteString.slice()` deprecated.
- fix auto pay transation fee
- fix struct transpiling
- `compile()` function breakchange.

## 0.2.1-beta.5

- fix `buildChangeOutput()` issue
- pump scryptlib 


## 0.2.1-beta.4

- update `MethodCallOptions`
- add `MultiContractCallOptions`

```ts
export interface MethodCallOptions<T> {
  ...
  /** signer does not contain all private keys, it is used when multiple parties are required to perform signature authorization, default is false， only work in single call */
  readonly partiallySigned?: boolean;
  /** execute a contract's public method to to check if arguments are valid, default is true */
  readonly exec?: boolean;
  /** auto add utxo to pay transaction fee, default is true*/
  readonly autoPayFee?: boolean;
}

export interface MultiContractCallOptions {
  /** verify transaction before send transaction */
  readonly verify?: boolean;
  /** signer does not contain all private keys, it is used when multiple parties are required to perform signature authorization, default is false， only work in single call */
  readonly partiallySigned?: boolean;
  /** auto add utxo to pay transaction fee, default is true*/
  readonly autoPayFee?: boolean;
}
```


## 0.2.0-beta.9

- add `tx` field for `ContractCalledEvent`

## 0.2.0-beta.8

- add `tx` field for `ContractCalledEvent`

## 0.2.0-beta.8

- add `Scrypt.contractApi.subscribe()` 


## 0.2.0-beta.1

- add `Scrypt.contractApi.xxx` 
- add `ScryptProvider`
- add `Scrypt.init()`:

```ts
Scrypt.init({
    apiKey: 'alpha_test_api_key',
    baseUrl: 'https://testnet.api.scrypt.io',
})
```



## 0.1.9-beta.1

- add `checkMultiSig`. Close #234.
- less confusing error on method call w wrong args. Close #311.


## 0.1.8-beta.2

- rename `partialContractTransaction` -> `partialContractTx` , #304

## 0.1.8-beta.1

- supports call multiple contracts, #285
- remove `transformer` in `ContractArtifact`, #287
- add js doc, #293


## 0.1.7-beta.5

- add sync state from transation:

```ts
const counter = new Counter(0n);
counter.syncState(tx, atOutputIndex)
```
- transpiler: to remove code injection


## 0.1.7-beta.3

- update `compilerOptions.target` to fix #253


## 0.1.7-beta.1

- upgrade `HashedMap` & `HashedSet`
- add erc20/erc721
- add more providers
- fix issue after webpack minimize build
- fix #230
- fix #170



## 0.1.6-beta.8

- add `this.buildChangeOutput()`
- fix #216
- fix #171
- fix #211
- fix #225 
- improve err message for Whatsonchain provider
- add comments


## 0.1.6-beta.6

- fix `getSignatures`


## 0.1.6-beta.6

- fix `getSignatures`


## 0.1.6-beta.5

- add `DefaultProvider`
- rename `findSigFrom` to `findSig`
- rename `sigRequiredAddress` to `pubKeyOrAddrToSign`, supports both pubKey and address


## 0.1.6-beta.4

- add buildChangeOutput for SmartContract class, #207
- allow *non-public* methods returns `void`, #206
- fix `static` methods call, #204
- pump scryptlib

## 0.1.6-beta.3

- export `findSigFrom()`

## 0.1.6-beta.2

- fix Contract.clone issue, #186
- refator `toByteString()`, #190
- add `Utils.buildPublicKeyHashOutput()`, #194
- buildins function rename
- rename `unlockFrom` -> `to`, `lockTo` -> `from`, #189
- `@prop(true)` cannot be readonly, fix #201
- support `getter` & `setter`, fix #169
- using sensilet api `signTx`, not `signTransaction`, fix #172 



## 0.1.6-beta.1

- support use in browser
- Fix [#115](https://github.com/sCrypt-Inc/scrypt-ts/issues/115)
- change [getNetwork](https://github.com/sCrypt-Inc/scrypt-ts/blob/0077508889c6e737a3d8008291e7fec989c493b9/src/bsv/abstract-provider.ts#L40) to returns promise
- add connected event for provider
- remove `SensiletProvider`

## 0.1.5-beta.18

- Fix #164 don't clone unlockFrom and lockTo
- Update `.npmignore`


## 0.1.5-beta.15

- change [getNetwork](https://github.com/sCrypt-Inc/scrypt-ts/blob/0077508889c6e737a3d8008291e7fec989c493b9/src/bsv/abstract-provider.ts#L40) to returns promise

## 0.1.5-beta.13

- Fix [#115](https://github.com/sCrypt-Inc/scrypt-ts/issues/115)

## 0.1.5-beta.12

- support use in browser

## 0.1.5-beta.14

- Fix references struct defined in library

## 0.1.5-beta.11

- support use in browser

## 0.1.5-beta.10

- move library `axios` from  *devDependencies* to *dependencies*

## 0.1.5-beta.9

- Fix transpiling struct literal 

## 0.1.5-beta.8

- Fix transpiling static readonly property, it is different from [compile-time constant](https://scrypt.io/scrypt-ts/getting-started/how-to-write-a-contract#compile-time-constant).



## 0.1.5-beta.7 

- add signer
- add provoider
- support for asynchronous signatures



## 0.1.5-beta.6

- rename fields in `ScriptContext` to be more friendly


## 0.1.5-beta.6

- rename fields in `ScriptContext` to be more friendly

## 0.1.5-beta.5

- update transpiler to popup more friendly error messages
- support `HashedMap` and `HashedSet`

## 0.1.5-beta.4

- disallow type `string` and `String` used in `@prop`
- implement `assert(condition: any, msg?: string)`

## 0.1.5-beta.2

- support show transpile error in vscode editor
- support [OP_PUSH_TX](https://medium.com/@xiaohuiliu/op-push-tx-3d3d279174c1) without transation preimage
