import React from 'react';
import { LocaleProvider } from 'zarm';
import defaultLocale from './locale/zh_CN';

const LocaleProviderWrapper = ({ locale = defaultLocale, children }) => {
  return (
    <LocaleProvider locale={locale as any}>
      {children}
    </LocaleProvider>
  );
};

export default LocaleProviderWrapper;
