import I18n from 'react-native-i18n';
import en from '../../translations/en';
import fi from '../../translations/fi';

I18n.fallbacks = true;
I18n.locales.en = ['en', 'fi'];
I18n.locales.fi = ['fi', 'en'];

I18n.translations = {
  en,
  fi,
};

function getTranslated(context) {
  var str = typeof(context) === 'string' ? context : context.key;
  var translated = I18n.t(str, {
    defaults: [{ message: 'missing translation!' }],
  });
  for (var key in context) {
    if(context.hasOwnProperty(key) || key !== 'key') {
      var element = context[key];
      translated = translated.replace('${' +key +'}', element);
    }
  }
  return translated;
}

function setLocale(locale) {
  I18n.locale = locale;
}

var texts = {
  ok: 'ok',
  cancel: 'cancel',
  login: 'login',
  loginCompanyName: 'loginCompanyName',
  teamPointsTeams: 'teamPointsTeams',
  teamPointsSearchTeam: 'teamPointsSearchTeam',
  teamPointsYouAreRemoving: 'teamPointsYouAreRemoving',
  teamPointsConfirmRemoving: 'teamPointsConfirmRemoving',
  teamPointsYouAreAdding: 'teamPointsYouAreAdding',
  teamPointsConfirmAdd: 'teamPointsConfirmAdd',
};

export { texts, getTranslated, setLocale };
