import LocalizedStrings from 'react-native-localization'

export const localStrings = new LocalizedStrings({
  'tr-TR': {
    noLocationService: 'Lokasyon Servisi Kapalı',
    logout: 'Çıkış',
    yes: 'Evet',
    no: 'Hayır',
    cancel: 'İptal',
    areYouSure: 'Emin misiniz?',
    logoutDesc: 'Çıkış yapmak üzeresiniz onaylıyor musunuz?',
    noInternet: 'İnternet Bağlantısı Yok',
  },
  en: {
    noLocationService: 'Location Service Not Available',
    logout: 'Logout',
    yes: 'Yes',
    no: 'No',
    cancel: 'Cancel',
    areYouSure: 'Are you sure?',
    logoutDesc: 'You are about to log out, confirm?',
    noInternet: 'No Internet Connection',
  },
  ru: {
    email: 'e-mail',
    password: 'password',
    login: 'login',
  },
  il: {
    email: 'אימייל',
    password: 'סיסמה',
    login: 'התחברות',
  },
})

// ? Set the language manually
localStrings.setLanguage('il')
