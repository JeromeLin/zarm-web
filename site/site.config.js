module.exports = {
  documents: [
    {
      name: 'QuickStart',
      description: '快速上手',
      module: () => import('@/README.md'),
    },
    {
      name: 'ChangeLog',
      description: '更新日志',
      module: () => import('@/CHANGELOG.md'),
    },
    // QuickStart: {
    //   name: 'quickstart',
    //   module: () => import('@/README.md'),
    // },
    // I18n: {
    //   name: 'i18n',
    //   module: () => import('@/components/locale/demo.md'),
    // },
  ],
  components: {
    basic: [
      {
        name: 'Icon',
        module: () => import('@/components/icon/demo.md'),
      },
      {
        name: 'Button',
        module: () => import('@/components/button/demo.md'),
      },
    ],
    layout: [
      {
        name: 'Layout',
        module: () => import('@/components/layout/layout.md'),
      },
      {
        name: 'Grid',
        module: () => import('@/components/grid/grid.md'),
      },
    ],
    form: [
      {
        name: 'Radio',
        module: () => import('@/components/radio/radio.md'),
      },
      {
        name: 'Checkbox',
        module: () => import('@/components/checkbox/checkbox.md'),
      },
      {
        name: 'Input',
        module: () => import('@/components/input/input.md'),
      },
      {
        name: 'NumberInput',
        module: () => import('@/components/number-input/numberinput.md'),
      },
      {
        name: 'Select',
        module: () => import('@/components/select/select.md'),
      },
      {
        name: 'Switch',
        module: () => import('@/components/switch/demo.md'),
      },
      {
        name: 'Slider',
        module: () => import('@/components/slider/slider.md'),
      },
      {
        name: 'Calendar',
        module: () => import('@/components/calendar/calendar.md'),
      },
      {
        name: 'DatePicker',
        module: () => import('@/components/date-picker/datepicker.md'),
      },
      {
        name: 'TimePicker',
        module: () => import('@/components/time-picker/timepicker.md'),
      },
      {
        name: 'Upload',
        module: () => import('@/components/upload/upload.md'),
      },
      {
        name: 'Form',
        module: () => import('@/components/form/form.md'),
      },
    ],
    data: [
      {
        name: 'Table',
        module: () => import('@/components/table/table.md'),
      },
      {
        name: 'Tag',
        module: () => import('@/components/tag/demo.md'),
      },
      {
        name: 'Progress',
        module: () => import('@/components/progress/progress.md'),
      },
      {
        name: 'Panel',
        module: () => import('@/components/panel/panel.md'),
      },
      {
        name: 'Pagination',
        module: () => import('@/components/pagination/pagination.md'),
      },
      {
        name: 'Tree',
        module: () => import('@/components/tree/tree.md'),
      },
      {
        name: 'Transfer',
        module: () => import('@/components/transfer/transfer.md'),
      },
      {
        name: 'Avatar',
        module: () => import('@/components/avatar/avatar.md'),
      },
    ],
    notice: [
      {
        name: 'Alert',
        module: () => import('@/components/alert/alert.md'),
      },
      {
        name: 'loading',
        module: () => import('@/components/loading/loading.md'),
      },
      {
        name: 'message',
        module: () => import('@/components/message/demo.md'),
      },
      {
        name: 'modal',
        module: () => import('@/components/modal/modal.md'),
      },
      {
        name: 'confirm',
        module: () => import('@/components/confirm/confirm.md'),
      },
      {
        name: 'notification',
        module: () => import('@/components/notification/notification.md'),
      },
    ],
    navigation: [
      {
        name: 'Menu',
        module: () => import('@/components/menu/menu.md'),
      },
      {
        name: 'Tab',
        module: () => import('@/components/tab/tab.md'),
      },
      {
        name: 'Breadcrumb',
        module: () => import('@/components/breadcrumb/demo.md'),
      },
      {
        name: 'Step',
        module: () => import('@/components/step/step.md'),
      },
      {
        name: 'Dropdown',
        module: () => import('@/components/dropdown/dropdown.md'),
      },
    ],
    others: [
      {
        name: 'Tooltip',
        module: () => import('@/components/tooltip/tooltip.md'),
      },
      {
        name: 'Popover',
        module: () => import('@/components/popover/popover.md'),
      },
      {
        name: 'Popconfirm',
        module: () => import('@/components/popconfirm/popconfirm.md'),
      },
      {
        name: 'Mask',
        module: () => import('@/components/mask/mask.md'),
      },
      {
        name: 'swipe',
        module: () => import('@/components/swipe/swipe.md'),
      },
      {
        name: 'Transition',
        module: () => import('@/components/transition/transition.md'),
      },
      {
        name: 'LocaleProvider',
        module: () => import('@/components/locale-provider/demo.md'),
      },
    ],
  },
};
