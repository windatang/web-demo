import React from 'react'
import {  Story } from '@storybook/react/types-6-0';
import styled from "@emotion/styled";
import {
    Checkbox,
    FormControl,
    FormControlLabel as MuiFormControlLabel,
    Grid,
    ListItemText, SelectChangeEvent,
    Typography
} from '@mui/material'
// import {  MenuItem, OutlineSelect, OutlineSelectItem } from '../../basic-lib'
import { withTranslation } from "react-i18next";
import {
    InputButtonProps,
    InputSelectProps,
    TextField,
    InputSearch,
    IconClearStyled
} from "./input";

import { Link } from '@mui/material';
import { CheckBoxIcon, CheckedIcon, CloseIcon, DropDownIcon, i18n, LanguageType } from 'common-resources';
import { MenuItem, OutlineSelect, OutlineSelectItem } from '../lists';


const Style = styled.div`
  background: var(--color-global-bg);
  
`

export const BtnLanguage = ({ handleChange}: any) => {
    const _handleChange = React.useCallback((event: SelectChangeEvent<any>) => {
        if (handleChange) {
            handleChange(event.target.value);
        }
    }, [handleChange]);
    return <OutlineSelect  IconComponent={DropDownIcon}
                          labelId="language-selected"
                          id="language-selected"
                          value={i18n.language}
                          onChange={_handleChange}>
        <OutlineSelectItem value={LanguageType.en_US}>EN</OutlineSelectItem>
        <OutlineSelectItem value={LanguageType.zh_CN}>中文</OutlineSelectItem>
    </OutlineSelect>
}

const SimpleSelect = ({t}: any) => {
    const datas = [
        {label: 'Text1', value: '1'},
        {label: 'Text2', value: '2'},
        {label: 'Text3', value: '3'},
        {label: 'Text4', value: '4'},
        {label: 'Text5', value: '5'},
        {label: 'Text6', value: '6'},
        {label: 'Text7', value: '7'},
        {label: 'Text8', value: '8'},
        {label: 'Text4TextTextTextTextText', value: '9'},
        {label: 'Text3', value: '10'},
        {label: 'Text4TextTextTextTextText', value: '11'},
        {label: 'Text4TextTextTextTextText', value: '12'},
    ]
    const [value, setValue] = React.useState('1');
    return <> <FormControl>
        <TextField
            id="outlined-select-currency"
            select
            label="type"
            value={value}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setValue(event.target.value as string);
            }}
            inputProps={{IconComponent: DropDownIcon}}
        > {datas.map(({label, value}) => <MenuItem key={value} value={value}>{t(label)}</MenuItem>)}
        </TextField>
    </FormControl>
    </>
}
// const SearchWrap = () => {
//     const inputProps: OutlinedInputProps = {
//         placeholder: 'Search Coin',
//         value: '',
//         onChange: (value: any) => {
//             console.log('FilterString', value);
//             //setFilterString(value);
//         },
//     }
//     return <OutlinedInput
//         // ref={inputEle}
//         {...inputProps}
//         key={'search'}
//         // placeholder={'search'}
//         className={'search'}
//         aria-label={'search'}
//         startAdornment={<InputAdornment position="start">
//             <SearchIcon/>
//         </InputAdornment>}
//     />
// }
const Template: Story<any> = withTranslation()((props: any) => {
    const [value, setValue] = React.useState('');
    const [searchValue, setSearchValue] = React.useState('');

    const handleSearchChange = React.useCallback((value) => {
        setSearchValue(value)
    }, [])
    const handleClear = React.useCallback(() => {
        // @ts-ignore
        // addressInput?.current?.value = "";
        setSearchValue('')
    }, [])
    // const handleClear = React.useCallback(() => {
    //     // @ts-ignore
    //     // addressInput?.current?.value = "";
    //     setAddress('')
    // }, [])


    return <Style>
        <h4>Select token ground btn and input value</h4>
        <Grid container spacing={2} alignItems={'center'} justifyContent={'flex-start'} marginBottom={2}>
            <Grid item xs={3}>
                <SimpleSelect {...props} />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    id="transferFeeType"
                    select
                    label={'label'}
                    value={value}
                    onChange={(event: React.ChangeEvent<any>) => {
                        setValue(event.target?.value);
                    }}
                    inputProps={{IconComponent: DropDownIcon}}
                    fullWidth={true}
                >{[{belong: 'eth', fee: '0.1'}, {belong: 'lrc', fee: '1000'}].map(({belong, fee}) => {
                    return <MenuItem key={belong} value={fee} withnocheckicon={'true'}>
                        <ListItemText primary={<Typography
                            sx={{display: 'inline'}}
                            component="span"
                            variant="body1"
                            color="text.primary"
                        >{belong}</Typography>} secondary={<Typography
                            sx={{display: 'inline'}}
                            component="span"
                            variant="body1"
                            color="text.primaryLight"
                        >{fee}</Typography>}/>
                    </MenuItem>
                })}</TextField>
            </Grid>
            <Grid item xs={3}>
            <BtnLanguage {...props} handleChange={(value:any)=>console.log(value)}  />
            </Grid>
            <Grid item xs={3}>
                <MuiFormControlLabel
                    control={<Checkbox defaultChecked checkedIcon={<CheckedIcon/>} icon={<CheckBoxIcon/>}
                                       color="default"/>} label="Label"/>
            </Grid>

            <Grid item xs={3} marginTop={2} alignSelf={"stretch"} position={'relative'}>
                {/* <SearchWrap/> */}
                <InputSearch value={searchValue} fullWidth onChange={handleSearchChange} />
                {searchValue !== '' ? <IconClearStyled size={'small'}  style={{top:'22px'}} aria-label="Clear" onClick={handleClear}>
                    <CloseIcon/>
                </IconClearStyled> : ''}
            </Grid>
            <Grid item xs={3} marginTop={2} alignSelf={"stretch"} position={'relative'}>
                <TextField
                    value={searchValue}
                    // error={addressError && addressError.error ? true : false}
                    label={'input'}
                    placeholder={'input'}
                    onChange={()=>{handleSearchChange(searchValue)}}
                    // disabled={chargeFeeTokenList.length ? false : true}
                    SelectProps={{IconComponent: DropDownIcon}}
                    // required={true}
                    // inputRef={addressInput}
                    // helperText={<Typography
                    //     variant={'body2'}
                    //     component={'span'}>{addressError && addressError.error ? addressError.message : ''}</Typography>}
                    fullWidth={true}
                />
                {searchValue !== '' ? <IconClearStyled size={'small'} style={{top:'46px'}} aria-label="Clear" onClick={handleClear}>
                    <CloseIcon/>
                </IconClearStyled> : ''}
            </Grid>
            {/*<MyDatePicker {...props} />*/}
        </Grid>


    </Style>
}) as Story<any>;

// @ts-ignore
export const FormItem = Template.bind({});
FormItem.args = {}
