// Created with https://sui-dapp-kit-theme-creator.app
// Installation guide https://sdk.mystenlabs.com/dapp-kit/themes

import type { ThemeVars } from '@mysten/dapp-kit'

export const lightTheme: ThemeVars = {
  blurs: {
    modalOverlay: 'blur(0)',
  },
  backgroundColors: {
    primaryButton: '#F6F7F9',
    primaryButtonHover: '#F0F2F5',
    outlineButtonHover: '#F0F2F5',
    modalOverlay: 'rgba(6, 42, 87, 0.1)',
    modalPrimary: '#F6F7F9',
    modalSecondary: '#F0F2F5',
    iconButton: 'transparent',
    iconButtonHover: '#F0F2F5',
    dropdownMenu: '#F6F7F9',
    dropdownMenuSeparator: '#F0F2F5',
    walletItemSelected: '#F6F7F9',
    walletItemHover: '#F0F2F5',
  },
  borderColors: {
    outlineButton: '#F0F2F5',
  },
  colors: {
    primaryButton: '#062a57',
    outlineButton: '#062a57',
    iconButton: '#062a57',
    body: '#062a57',
    bodyMuted: 'rgba(6, 42, 87, 0.7)',
    bodyDanger: '#FF794B',
  },
  radii: {
    small: '6px',
    medium: '8px',
    large: '12px',
    xlarge: '16px',
  },
  shadows: {
    primaryButton: '0px 4px 12px rgba(246, 247, 249, 0.1)',
    walletItemSelected: '0px 2px 6px rgba(246, 247, 249, 0.05)',
  },
  fontWeights: {
    normal: '400',
    medium: '500',
    bold: '600',
  },
  fontSizes: {
    small: '14px',
    medium: '16px',
    large: '18px',
    xlarge: '20px',
  },
  typography: {
    fontFamily: 'inherit',
    fontStyle: 'normal',
    lineHeight: '1.3',
    letterSpacing: '1',
  },
}

export const darkTheme: ThemeVars = {
  blurs: {
    modalOverlay: 'blur(0)',
  },
  backgroundColors: {
    primaryButton: '#062a57',
    primaryButtonHover: '#052246',
    outlineButtonHover: '#052246',
    modalOverlay: 'rgba(246, 247, 249, 0.1)',
    modalPrimary: '#062a57',
    modalSecondary: '#052246',
    iconButton: 'transparent',
    iconButtonHover: '#052246',
    dropdownMenu: '#062a57',
    dropdownMenuSeparator: '#052246',
    walletItemSelected: '#062a57',
    walletItemHover: '#052246',
  },
  borderColors: {
    outlineButton: '#052246',
  },
  colors: {
    primaryButton: '#F6F7F9',
    outlineButton: '#F6F7F9',
    iconButton: '#F6F7F9',
    body: '#F6F7F9',
    bodyMuted: 'rgba(246, 247, 249, 0.7)',
    bodyDanger: '#FF794B',
  },
  radii: {
    small: '6px',
    medium: '8px',
    large: '12px',
    xlarge: '16px',
  },
  shadows: {
    primaryButton: '0px 4px 12px rgba(6, 42, 87, 0.1)',
    walletItemSelected: '0px 2px 6px rgba(6, 42, 87, 0.05)',
  },
  fontWeights: {
    normal: '400',
    medium: '500',
    bold: '600',
  },
  fontSizes: {
    small: '14px',
    medium: '16px',
    large: '18px',
    xlarge: '20px',
  },
  typography: {
    fontFamily: 'inherit',
    fontStyle: 'normal',
    lineHeight: '1.3',
    letterSpacing: '1',
  },
}
