import LocalizedStrings from 'react-localization';
import {english} from './lang/en';
import {portuguese} from './lang/pt';
import {changeLanguage, getAuthUserLanguage} from "../actions/Common";

export const langs = new LocalizedStrings({
    en: english,
    pt: portuguese
});

const currentLang = 'en';
langs.setLanguage(currentLang);