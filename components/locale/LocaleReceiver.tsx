import React from 'react';
import { LocaleContext } from './LocaleProvider';

const LocaleReceiverWrapper = (WrappedComponent, name?) => {
  const LocaleReceiver: any = (props) => {
    return (
      <LocaleContext.Consumer>
        {(locale) => {
          const componentLocale = locale && locale[name || WrappedComponent.name];
          const localeCode = locale && locale.code;

          return <WrappedComponent {...props} locale={componentLocale} localeCode={localeCode} />;
        }}
      </LocaleContext.Consumer>
    );
  };

  return LocaleReceiver;
};

export default LocaleReceiverWrapper;
