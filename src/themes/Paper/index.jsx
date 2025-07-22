import { red } from '@mui/material/colors'

const MuiPaper = {
  variants: [
    {
      props: { variant: 'error-outlined' },
      style: {
        border: `1px solid ${red[700]}`,
      },
    },
  ],
  styleOverrides: {
    root: {
      // boxShadow: 'none',  // This removes the box shadow on the Box Component
    }
  }
}

export default MuiPaper
