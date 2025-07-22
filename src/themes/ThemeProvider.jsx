import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { createTheme, CssBaseline, GlobalStyles, StyledEngineProvider, ThemeProvider as MuiThemeProvider } from '@mui/material'
import * as colors from '../config/colors'

import MuiButton from './Button'
import MuiPaper from './Paper'
import MuiTab from './Tab'
import MuiTable from './Table'
import MuiTypography from './Typography'
import MuiInputLabel from './Label'
import MuiInputBase from './InputBase'
import MuiDivider from './Divider'

const MPLUSRounded1cRegular = '/assets/fonts/MPLUSRounded1c-Regular.ttf'
const MPLUSRounded1cMedium = '/assets/fonts/MPLUSRounded1c-Medium.ttf'
const MPLUSRounded1cBold = '/assets/fonts/MPLUSRounded1c-Bold.ttf'
const MPLUSRounded1cExtraBold = '/assets/fonts/MPLUSRounded1c-ExtraBold.ttf'

const ThemeProvider = ({ children }) => {
  const themes = useMemo(() => {
    return createTheme({
      palette: {
        mode: 'light',
        white: { main: '#FFFFFF', darker: '#D1D1D1' },
        black: { main: '#000000', light: '#D1D1D1' },
        lightGray: { main: colors.lightGray, contrastText: '#FFFFFF' },
        darkGray: { main: colors.darkGray, contrastText: '#FFFFFF' },
        peach: { main: colors.peach, contrastText: '#000000' },
        primary: { main: colors.primary, contrastText: '#FFFFFF' },
        lightBlue: { main: colors.lightBlue, contrastText: '#FFFFFF' },
        orange: { main: colors.orange, contrastText: '#FFFFFF' },
        green: { main: colors.green, contrastText: '#FFFFFF' },
        red: { main: colors.red, contrastText: '#FFFFFF' },
      },
      typography: {
        fontFamily: [
          'MPLUSRounded1c',
          'Roboto',
          'Arial',
          'Tahoma',
          'Helvetica',
          'Verdana',
          'Times New Roman',
          '"Segoe UI"',
          'sans-serif',
        ].join(','),
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 700 },
        h5: { fontWeight: 700 },
        h6: { fontWeight: 700 },
        subtitle1: { fontSize: 16, fontWeight: 700 },
        subtitle2: { fontSize: 14, fontWeight: 700 },
        font147: { fontSize: 14, fontWeight: 700 },
        font145: { fontSize: 14, fontWeight: 500 },
        font143: { fontSize: 14, fontWeight: 400 },
        font127: { fontSize: 12, fontWeight: 700 },
        font125: { fontSize: 12, fontWeight: 500 },
        font124: { fontSize: 12, fontWeight: 400 },
        font107: { fontSize: 10, fontWeight: 700 },
        font105: { fontSize: 10, fontWeight: 500 },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: `
            @font-face {
              font-family: 'MPLUSRounded1c';
              font-weight: 400;
              src: local('MPLUSRounded1c-Regular'), url(${MPLUSRounded1cRegular}) format('truetype');
            }
            @font-face {
              font-family: 'MPLUSRounded1c';
              font-weight: 500;
              src: local('MPLUSRounded1c-Medium'), url(${MPLUSRounded1cMedium}) format('truetype');
            }
            @font-face {
              font-family: 'MPLUSRounded1c';
              font-weight: 700;
              src: local('MPLUSRounded1c-Bold'), url('${MPLUSRounded1cBold}') format('truetype');
            }
            @font-face {
              font-family: 'MPLUSRounded1c';
              font-weight: 900;
              src: local('MPLUSRounded1c-ExtraBold'), url('${MPLUSRounded1cExtraBold}') format('truetype');
            }
          `,
        },
        MuiTypography,
        MuiButton,
        MuiTab,
        MuiPaper,
        MuiTable,
        MuiInputLabel,
        MuiInputBase,
        MuiDivider,
      },
    })
  }, [])

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={themes}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            'html,body': {
              height: '100%',
              overscrollBehaviorY: 'none',
            },
            '#root': {
              display: 'flex',
              height: '100%',
            },
            form: {
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
            },
          }}
        />
        {children}
      </MuiThemeProvider>
    </StyledEngineProvider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ThemeProvider
