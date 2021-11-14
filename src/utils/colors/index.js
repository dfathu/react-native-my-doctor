const mainColors = {
  green1: '#0BCAD4',
  green2: '#EDFCFD',
  black1: '#112340',
  black2: '#495A75',
  black3 : '#000000',
  black4 : 'rgba(0,0,0,0.5)',
  grey1: '#7D8797',
  grey2: '#B1B7C2',
  grey3: '#EDEEF0',
  blue1: '#0066CB',
  white1: '#FFFFFF',
  red1 : 'red',
};

export const colors = {
  primary: mainColors.green1,
  secondary: mainColors.black1,
  teriary : mainColors.blue1,
  white: mainColors.white1,
  black: mainColors.black1,
  disable: mainColors.grey3,
  border: {
    satu: '#E9E9E9',
    dua: '#EEEEEE',
  },
  text: {
    primary: mainColors.black1,
    secondary: mainColors.grey1,
    menuactive: mainColors.green1,
    menuInactive: mainColors.black2,
    disable: mainColors.grey2
  },
  button: {
    primary: {
      background: mainColors.green1,
      text: mainColors.white1,
    },
    secondary: {
      background: mainColors.white1,
      text: mainColors.black1,
    },
    grey : {
      background: '#EDEEF0',
      text: mainColors.grey2,
    }
  },
  cardight: {
    background: mainColors.green2
  },
  loadingBackground: mainColors.black4,
  errorMessage : mainColors.red1,
};
