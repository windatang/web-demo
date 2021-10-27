import styled from '@emotion/styled';
import { Meta, Story } from '@storybook/react/types-6-0';

import { withTranslation } from 'react-i18next';

import React from 'react';
import { CountryCard } from './CountryCard';
import { CountryDetail } from './CountryDetail';


const Style = styled.div`
  //background: var(--color-global-bg);
  height: 100%;
  flex: 1
`


const CountryCardWrap = () => {
    // const ref = React.createRef();
    const item = {
        "name": {
            "common": "Malaysia",
            "official": "Malaysia",
            "nativeName": {
                "eng": {"official": "Malaysia", "common": "Malaysia"},
                "msa": {"official": "مليسيا", "common": "مليسيا"}
            }
        },
        "tld": [".my"],
        "cca2": "MY",
        "ccn3": "458",
        "cca3": "MYS",
        "cioc": "MAS",
        "independent": true,
        "status": "officially-assigned",
        "unMember": true,
        "currencies": {"MYR": {"name": "Malaysian ringgit", "symbol": "RM"}},
        "idd": {"root": "+6", "suffixes": ["0"]},
        "capital": ["Kuala Lumpur"],
        "altSpellings": ["MY"],
        "region": "Asia",
        "subregion": "South-Eastern Asia",
        "languages": {"eng": "English", "msa": "Malay"},
        "translations": {
            "ara": {"official": "ماليزيا", "common": "ماليزيا"},
            "ces": {"official": "Malajsie", "common": "Malajsie"},
            "cym": {"official": "Malaysia", "common": "Malaysia"},
            "deu": {"official": "Malaysia", "common": "Malaysia"},
            "est": {"official": "Malaisia", "common": "Malaisia"},
            "fin": {"official": "Malesia", "common": "Malesia"},
            "fra": {"official": "Fédération de Malaisie", "common": "Malaisie"},
            "hrv": {"official": "Malezija", "common": "Malezija"},
            "hun": {"official": "Malajzia", "common": "Malajzia"},
            "ita": {"official": "Malaysia", "common": "Malesia"},
            "jpn": {"official": "マレーシア", "common": "マレーシア"},
            "kor": {"official": "말레이시아", "common": "말레이시아"},
            "nld": {"official": "Maleisië", "common": "Maleisië"},
            "per": {"official": "فدراسیون مالزی", "common": "مالزی"},
            "pol": {"official": "Malezja", "common": "Malezja"},
            "por": {"official": "Malásia", "common": "Malásia"},
            "rus": {"official": "Малайзия", "common": "Малайзия"},
            "slk": {"official": "Malajzia", "common": "Malajzia"},
            "spa": {"official": "Malasia", "common": "Malasia"},
            "swe": {"official": "Malaysia", "common": "Malaysia"},
            "urd": {"official": "ملائیشیا", "common": "ملائیشیا"},
            "zho": {"official": "马来西亚", "common": "马来西亚"}
        },
        "latlng": [2.5, 112.5],
        "landlocked": false,
        "borders": ["BRN", "IDN", "THA"],
        "area": 330803.0,
        "demonyms": {"eng": {"f": "Malaysian", "m": "Malaysian"}, "fra": {"f": "Malaisienne", "m": "Malaisien"}},
        "flag": "\uD83C\uDDF2\uD83C\uDDFE",
        "maps": {
            "googleMaps": "https://goo.gl/maps/qrY1PNeUXGyXDcPy6",
            "openStreetMaps": "https://www.openstreetmap.org/relation/2108121"
        },
        "population": 32365998,
        "gini": {"2015": 41.1},
        "fifa": "MAS",
        "car": {"signs": ["MAL"], "side": "left"},
        "timezones": ["UTC+08:00"],
        "continents": ["Asia"],
        "flags": {"png": "https://flagcdn.com/w320/my.png", "svg": "https://flagcdn.com/my.svg"},
        "coatOfArms": {
            "png": "https://mainfacts.com/media/images/coats_of_arms/my.png",
            "svg": "https://mainfacts.com/media/images/coats_of_arms/my.svg"
        },
        "startOfWeek": "sunday",
        "capitalInfo": {"latlng": [3.17, 101.7]},
        "postalCode": {"format": "#####", "regex": "^(\\d{5})$"}
    }
    return <><CountryCard item={item} onDetail={() => {
    }}/>
        <CountryDetail  item={item}/>
    </>
}


const Template: Story<any> = withTranslation('common')((...rest) => {
    return <Style>
        <h4>Country Card</h4>
        <CountryCardWrap/>


    </Style>
}) as Story<any>;

export default {
    title: 'components/Block',
    component: CountryCardWrap,
    argTypes: {},
} as Meta
//@ts-ignore
export const BlockStory = Template.bind({});
// SwitchPanel.args = {}

