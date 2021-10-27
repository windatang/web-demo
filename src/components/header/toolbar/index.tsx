import { IconButton, SelectChangeEvent, } from '@mui/material';
// import {
//      SettingIcon,
//
// } from 'common-resources';
import { bindHover, usePopupState } from 'material-ui-popup-state/hooks';
import { useSettings } from 'stores';
import React from 'react';
import { DropDownIcon, i18n, LanguageType, ThemeDarkIcon, ThemeLightIcon, ThemeType } from 'common-resources';
import { OutlineSelect, OutlineSelectItem } from 'components/basic-lib';

export const BtnTheme = ({t, handleClick}: any) => {
    const {themeMode} = useSettings()
    //const [mode, setMode] = React.useState(themeMode)
    const _handleClick = React.useCallback(() => {
        // setMode(mode === ThemeType.dark ? ThemeType.light : ThemeType.dark)
        if (handleClick) {
            handleClick(themeMode)
        }
    }, [themeMode, handleClick])
    return <IconButton aria-label={t('change theme')} onClick={_handleClick}>
        {themeMode === ThemeType.dark ? <ThemeDarkIcon/> : <ThemeLightIcon/>}</IconButton>
}


export const BtnLanguage = ({t, label, handleChange}: any) => {
    const _handleChange = React.useCallback((event: SelectChangeEvent<unknown>) => {
        if (handleChange) {
            handleChange(event.target.value);
        }
    }, [handleChange]);
    return <OutlineSelect aria-label={t(label)} IconComponent={DropDownIcon}
                          labelId="language-selected"
                          id="language-selected"
                          value={i18n.language} autoWidth
                          onChange={_handleChange}>
        <OutlineSelectItem value={LanguageType.en_US}>EN</OutlineSelectItem>
        <OutlineSelectItem value={LanguageType.zh_CN}>中文</OutlineSelectItem>
    </OutlineSelect>
}