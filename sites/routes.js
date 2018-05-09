import App from './pages/App';

const rootRoute = {
  path: '/',
  component: App,
  childRoutes: [
    {
      path: 'page1',
      getComponent(location, cb) {
        require.ensure(
          [],
          (require) => {
            cb(null, require('./pages/Page1').default);
          },
          'Page1'
        );
      }
    },
    {
      path: 'page2',
      getComponent(location, cb) {
        require.ensure(
          [],
          (require) => {
            cb(null, require('./pages/Page2').default);
          },
          'Page2'
        );
      }
    },
    {
      path: 'button',
      getComponent(location, cb) {
        require.ensure(
          [],
          (require) => {
            cb(null, require('./pages/ButtonPage').default);
          },
          'ButtonPage'
        );
      }
    },
    {
      path: 'modal',
      getComponent(location, cb) {
        require.ensure(
          [],
          (require) => {
            cb(null, require('./pages/ModalPage').default);
          },
          'ModalPage'
        );
      }
    },
    {
      path: 'slider',
      getComponent(location, cb) {
        require.ensure(
          [],
          (require) => {
            cb(null, require('./pages/SliderPage').default);
          },
          'SliderPage'
        );
      }
    },
    {
      path: '*',
      getComponent(location, cb) {
        require.ensure(
          [],
          (require) => {
            cb(null, require('./pages/NotFoundPage').default);
          },
          'NotFoundPage'
        );
      }
    }
  ],
  indexRoute: {
    getComponent(location, cb) {
      require.ensure(
        [],
        (require) => {
          cb(null, require('./pages/Page1').default);
        },
        'Page1'
      );
    }
  }
};

export default rootRoute;
