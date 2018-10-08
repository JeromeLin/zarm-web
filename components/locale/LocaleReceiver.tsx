import React from 'react';
import { LocaleContext } from './LocaleProvider';
import hoistNonReactStatic from 'hoist-non-react-statics';

const LocaleReceiverWrapper = (WrappedComponent, name?) => {
  const LocaleReceiver: any = props => {
    return (
      <LocaleContext.Consumer>
        {locale => {
          const componentLocale =
            locale && locale[name || WrappedComponent.name];
          const localeCode = locale && locale.code;

          return (
            <WrappedComponent
              {...props}
              locale={componentLocale}
              localeCode={localeCode}
            />
          );
        }}
      </LocaleContext.Consumer>
    );
  };
  hoistNonReactStatic(LocaleReceiver, WrappedComponent);
  return LocaleReceiver;
};

export default LocaleReceiverWrapper;
