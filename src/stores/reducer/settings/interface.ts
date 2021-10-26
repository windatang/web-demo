import { LanguageKeys, ThemeKeys } from 'common-resources';


export enum PlatFormType {
    mobile = 'mobile',
    desktop = 'desktop',
    tablet = 'tablet'
}

export type PlatFormKeys = keyof typeof PlatFormType

export interface SettingsState {
    themeMode: ThemeKeys
    language: LanguageKeys
    platform: PlatFormKeys
    // currency: Currency
    // upColor: keyof typeof UpColor
    // slippage: number | 'N'
    // coinJson: any
    // hideL2Assets: boolean
    // hideLpToken: boolean
    // hideSmallBalances: boolean
    // proLayout: Layouts,
    // feeChargeOrder:string[],
}
