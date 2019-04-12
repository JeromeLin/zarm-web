import React from 'react';
import { LocaleContext } from './LocaleProvider';
import hoistNonReactStatic from 'hoist-non-react-statics';

type GetContextInnerType<T extends React.Context<any>> = T extends React.Context<infer R> ? R : never;

function LocaleReceiverWrapper(name?: keyof GetContextInnerType<typeof LocaleContext>) {
  return function InnerWapper<T extends { new(...args: any[]): any }>(WrappedComponent: T) {
    function LocaleReceiver(props: InstanceType<T>['props'] & { forwardedRef: React.Ref<InstanceType<T>> }) {
      return (
        <LocaleContext.Consumer>
          {locale => {
            const LocalName = name || WrappedComponent.name as keyof GetContextInnerType<typeof LocaleContext>;
            const componentLocale = locale && locale[LocalName];
            const localeCode = locale && locale.code;
            const { forwardedRef, ...rest } = props;
            return (
              <WrappedComponent
                {...rest}
                ref={forwardedRef}
                locale={componentLocale}
                localeCode={localeCode}
              />
            );
          }}
        </LocaleContext.Consumer>
      );
    }
    const forwardRef = (props: InstanceType<T>['props'], ref: React.Ref<InstanceType<T>>) => {
      return <LocaleReceiver {...props} forwardedRef={ref} />;
    };

    const LocaleReceiverWithRef = React.forwardRef<InstanceType<T>, InstanceType<T>['props']>(forwardRef);
    hoistNonReactStatic(LocaleReceiverWithRef, WrappedComponent);
    return LocaleReceiverWithRef as (T & typeof LocaleReceiverWithRef);
  };
}

export default LocaleReceiverWrapper;
