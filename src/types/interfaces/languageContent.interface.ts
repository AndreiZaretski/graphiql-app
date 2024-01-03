export interface LanguageContent {
  notFound: {
    text: string;
  };
  error: string;
  auth: {
    main: string;
    welcome: string;
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
    tooManyRequests: string;
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
    changeApiBtn: string;
    variableName: string;
    headersName: string;
    doc: string;
    loading: string;
    validHeaderMessage: string;
    validVariableMessage: string;
    validUrlMessage: string;
    currentUrl: string;
    successChangeUrlMessage: string;
    errorCorsMessage: string;
  };
  welcome: {
    rsSchool: string;
    aboutProject: string;
    projectDescription: string;
    developer: string;
    position: string;
    info: DevelopersInfo[];
  };
}

interface DevelopersInfo {
  name: string;
  position: string;
  description: string;
}

// info: {
//   andrei: {
//     name: string;
//     description: string;
//   };
//   oksana: {
//     name: string;
//     description: string;
//   };
//   max: {
//     name: string;
//     description: string;
//   };
// };
