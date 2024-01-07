export interface LanguageContent {
  notFound: {
    [key: string]: string;
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
      [key: string]: string;
    };
    signUpPage: {
      [key: string]: string;
    };
  };
  formErrorMessage: {
    [key: string]: string;
  };
  mainPage: {
    [key: string]: string;
  };
  welcome: {
    rsSchool: string;
    aboutProject: string;
    projectDescription: string;
    developer: string;
    info: DevelopersInfo[];
  };
}

interface DevelopersInfo {
  name: string;
  position: string;
  description: string;
}
