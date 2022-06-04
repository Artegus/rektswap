import { JsonRpcProvider } from "@ethersproject/providers";
import { BigNumber, BigNumberish, Contract } from "ethers";
import { TransactionResponse } from "../types/TransactionTypes";


export class RektContract extends Contract {
    
    constructor(address: string, library: JsonRpcProvider, abi: any) {
        super(address, abi, library);
    }

    name(): Promise<string> {
        return this.functions['name']();
    }
    
    symbol(): Promise<string> {
        return this.functions['symbol']();
    }
    
    decimals(): Promise<number> {
        return this.functions['decimals']();
    }
    
    totalSupply(): Promise<string> {
        return this.functions['totalSupply']();
    }
    
    balanceOf(address: string): Promise<BigNumberish> {
        return this.functions['balanceOf'](address);
    }

    approve(addressSpender: string, value: BigNumber): Promise<TransactionResponse> {
        return this.functions['approve'](addressSpender, value);
    }
    
    allowance(addressOwner: string, addressSpender: string): Promise<BigNumberish> {
        return this.functions['allowance'](addressOwner, addressSpender);
    }

}