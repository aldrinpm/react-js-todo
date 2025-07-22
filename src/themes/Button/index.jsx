import * as colors from '../../config/colors'

const MuiButton = {
  styleOverrides: {
    root: {
      borderRadius: 50,
      textTransform: 'none',
      fontSize: '14px',
      height: '46px',
    },
    containedPrimary: {
      ':disabled': {
        color: '#fff',
        backgroundColor: colors.primary,
        opacity: 0.7,
      },
    },
  },
  variants: [
    {
      props: { variant: 'button1' },
      style: {
        color: '#fff',
        backgroundColor: colors.green,
        fontWeight: 700,
        ':disabled': {
          color: '#fff',
          backgroundColor: colors.darkGray+'!important',
          // opacity: 0.7,
        },
        ':hover': {
          backgroundColor: colors.green,
        },
      },
    },{
      props: { variant: 'buttonClose' },
      style: {
        color: colors.red,
        border: `1px solid ${colors.red}`,
        fontWeight: 700,
      },
    },
    {
      props: { variant: 'button2' },
      style: {
        color: colors.lightBlue,
        border: `1px solid ${colors.lightBlue}`,
        fontWeight: 400,
      },
    },
    {
      props: { variant: 'button3' },
      style: {
        color: '#000000',
        border: `1px solid ${colors.darkGray}`,
        fontWeight: 400,
      },
    },
    {
      props: { variant: 'button5' },
      style: {
        color: colors.darkGray,
        border: `1px solid ${colors.darkGray}`,
        fontWeight: 400,
      },
    },
    {
      props: { variant: 'button11' },
      style: {
        padding: 3,
        color: '#000000',
        backgroundColor: colors.offWhite,
        fontWeight: 400,
        fontSize: '12px',
        height: '24px',
        minWidth: '70px',
        ':hover': {
          backgroundColor: colors.offWhite,
        },
      },
    },
    {
      props: { variant: 'button11-active' },
      style: {
        padding: 3,
        color: '#fff',
        backgroundColor: colors.green,
        fontWeight: 700,
        fontSize: '12px',
        height: '24px',
        minWidth: '70px',
        ':hover': {
          backgroundColor: colors.green,
        },
      },
    },
  ],
}

export default MuiButton
