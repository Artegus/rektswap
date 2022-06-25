export class ValidationUtils {

    private static readonly REGEX_NUMBER = new RegExp(/^[+-]?(\d+\.?\d*|\.\d+)$/);

    public static validateNumber(number: string) {
        return this.REGEX_NUMBER.test(number);
    }

}