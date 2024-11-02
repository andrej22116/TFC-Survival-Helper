import RECEIPT from "@/constants/receipt.js";


export default class Receipt {
    static getReceipt(configReceipt) {
        if (typeof configReceipt !== 'string') {
            return null;
        }

        const receipt = configReceipt.trim().toLowerCase();
        switch (receipt) {
            case RECEIPT.CASTING:
            case RECEIPT.PLAN:
            case RECEIPT.WELD:
                return receipt;

            default: return null;
        }
    }
}