import { providers } from "ethers";

export type TransactionReceipt = providers.TransactionReceipt;

export interface UserTransaction {
    quantitySold: string;
    quantityReceived: string;
    transactionHash: string;
}
