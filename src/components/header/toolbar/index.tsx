import { IconButton, SelectChangeEvent, Typography, } from '@mui/material';
// import {
//      SettingIcon,
//
// } from 'common-resources';
import { useSettings } from 'stores';
import React from 'react';
import { DropDownIcon, i18n, LanguageType, ThemeDarkIcon, ThemeLightIcon, ThemeType } from 'common-resources';
import { OutlineSelect, OutlineSelectItem } from 'components/basic-lib';

export const BtnTheme = ({t, handleClick}: any) => {
    const {themeMode, setTheme} = useSettings()
    // const [mode, setMode] = React.useState(themeMode)
    // const _handleClick = React.useCallback(() => {
    //     setMode(mode === ThemeType.dark ? ThemeType.light : ThemeType.dark)
    //     if (handleClick) {
    //         handleClick(themeMode)
    //     }
    // }, [themeMode, handleClick])
    const handleThemeClick = React.useCallback((e: any) => {

        if (themeMode === ThemeType.light) {
            setTheme(ThemeType.dark);
        } else {
            setTheme(ThemeType.light);
        }
    }, [themeMode])
    return <Typography onClick={handleThemeClick} display={'inline-flex'} alignItems={'center'}><IconButton aria-label={t('change theme')} >
        {themeMode === ThemeType.dark ? <ThemeDarkIcon/> : <ThemeLightIcon/>}</IconButton>
        <Typography paddingLeft={1} color={'textSecondary'}>{t('labelThemeMode',{mode:themeMode === ThemeType.dark?'Dark':'Light'})}</Typography>
    </Typography>
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