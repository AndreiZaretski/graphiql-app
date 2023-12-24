export interface LanguageContent {
  notFound: {
    text: string;
  };
  error: string;
  auth: {
    main: string;
    login: string;
    signUp: string;
    logOut: string;
    email: string;
    password: string;
    loginPage: {
      header: string;
      subheader: string;
    };
    signUpPage: {
      header: string;
      subheader: string;
    };
  };
  formErrorMessage: {
    loginError: string;
    otherError: string;
    emailError: string;
    emailInvalid: string;
    oneNumberError: string;
    oneUpperLetterError: string;
    oneLowerLetterError: string;
    oneSpecialCharacterError: string;
    passwordNotMatchError: string;
    minLength: string;
    required: string;
    notMatch: string;
  };
  mainPage: {
    changeApi: string;
    variableName: string;
    headersName: string;
    prettify: string;
    show: string;
    hide: string;
    doc: string;
    loading: string;
  };
}
