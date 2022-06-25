
export class FormatUtils {

    private static readonly DECIMALS_REKT = 2;
    private static readonly DECIMALS_ETH = 4;

    public static fortmatBalance = (balance: string, decimals: number) => {
        return Number(balance).toFixed(decimals);
    }
    
    public static formatRekt(balance: string) {
        return this.fortmatBalance(balance, this.DECIMALS_REKT);
    }

    public static formatEth(balance: string) {
        return this.fortmatBalance(balance, this.DECIMALS_ETH);
    }

}
