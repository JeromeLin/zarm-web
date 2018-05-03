const rootRoute = {
  path: '/',
  component: require('./pages/App'),
  childRoutes: [
    {
      path: 'page1',
      getComponent(location, cb) {
        require.ensure(
          [],
          require => {
            cb(null, require('./pages/Page1'));
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
          require => {
            cb(null, require('./pages/Page2'));
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
          require => {
            cb(null, require('./pages/ButtonPage'));
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
          require => {
            cb(null, require('./pages/ModalPage'));
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
          require => {
            cb(null, require('./pages/SliderPage'));
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
          require => {
            cb(null, require('./pages/NotFoundPage'));
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
        require => {
          cb(null, require('./pages/Page1'));
        },
        'Page1'
      );
    }
  }
};

export default rootRoute;
