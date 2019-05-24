export default {
  documents: {
    QuickStart: {
      name: 'quickstart',
      component: () => import('@/README.md'),
    },
    I18n: {
      name: 'i18n',
      component: () => import('@examples/docs/i18n.md'),
    },
  },
  components: {
    Basic: {
      Icon: {
        name: 'icon',
        component: () => import('@examples/docs/icon.md'),
      },
      Button: {
        name: 'button',
        component: () => import('@examples/docs/button.md'),
      },
    },
    Layout: {
      Layout: {
        name: 'layout',
        component: () => import('@examples/docs/layout.md'),
      },
      Grid: {
        name: 'grid',
        component: () => import('@examples/docs/grid.md'),
      },
    },
    Form: {
      Radio: {
        name: 'radio',
        component: () => import('@examples/docs/radio.md'),
      },
      Checkbox: {
        name: 'checkbox',
        component: () => import('@examples/docs/checkbox.md'),
      },
      Input: {
        name: 'input',
        component: () => import('@examples/docs/input.md'),
      },
      NumberInput: {
        name: 'numberinput',
        component: () => import('@examples/docs/numberinput.md'),
      },
      Select: {
        name: 'select',
        component: () => import('@examples/docs/select.md'),
      },
      Switch: {
        name: 'switch',
        component: () => import('@examples/docs/switch.md'),
      },
      Slider: {
        name: 'slider',
        component: () => import('@examples/docs/slider.md'),
      },
      Calendar: {
        name: 'calendar',
        component: () => import('@examples/docs/calendar.md'),
      },
      DatePicker: {
        name: 'datepicker',
        component: () => import('@examples/docs/datepicker.md'),
      },
      TimePicker: {
        name: 'timepicker',
        component: () => import('@examples/docs/timepicker.md'),
      },
      Upload: {
        name: 'upload',
        component: () => import('@examples/docs/upload.md'),
      },
      Form: {
        name: 'form',
        component: () => import('@examples/docs/form.md'),
      },
    },
    Data: {
      Table: {
        name: 'table',
        component: () => import('@examples/docs/table.md'),
      },
      Tag: {
        name: 'tag',
        component: () => import('@examples/docs/tag.md'),
      },
      Progress: {
        name: 'progress',
        component: () => import('@examples/docs/progress.md'),
      },
      Panel: {
        name: 'panel',
        component: () => import('@examples/docs/panel.md'),
      },
      Pagination: {
        name: 'pagination',
        component: () => import('@examples/docs/pagination.md'),
      },
      Tree: {
        name: 'tree',
        component: () => import('@examples/docs/tree.md'),
      },
      Transfer: {
        name: 'transfer',
        component: () => import('@examples/docs/transfer.md'),
      },
      Avatar: {
        name: 'avatar',
        component: () => import('@examples/docs/avatar.md'),
      },
    },
    Notice: {
      Alert: {
        name: 'alert',
        component: () => import('@examples/docs/alert.md'),
      },
      Loading: {
        name: 'loading',
        component: () => import('@examples/docs/loading.md'),
      },
      Message: {
        name: 'message',
        component: () => import('@examples/docs/message.md'),
      },
      Modal: {
        name: 'modal',
        component: () => import('@examples/docs/modal.md'),
      },
      Confirm: {
        name: 'confirm',
        component: () => import('@examples/docs/confirm.md'),
      },
      Notification: {
        name: 'notification',
        component: () => import('@examples/docs/notification.md'),
      },
    },
    Nav: {
      Menu: {
        name: 'menu',
        component: () => import('@examples/docs/menu.md'),
      },
      Tab: {
        name: 'tab',
        component: () => import('@examples/docs/tab.md'),
      },
      Breadcrumb: {
        name: 'breadcrumb',
        component: () => import('@examples/docs/breadcrumb.md'),
      },
      Step: {
        name: 'step',
        component: () => import('@examples/docs/step.md'),
      },
      Dropdown: {
        name: 'dropdown',
        component: () => import('@examples/docs/dropdown.md'),
      },
    },
    Others: {
      Tooltip: {
        name: 'tooltip',
        component: () => import('@examples/docs/tooltip.md'),
      },
      Popover: {
        name: 'popover',
        component: () => import('@examples/docs/popover.md'),
      },
      Popconfirm: {
        name: 'popconfirm',
        component: () => import('@examples/docs/popconfirm.md'),
      },
      Mask: {
        name: 'mask',
        component: () => import('@examples/docs/mask.md'),
      },
      Swipe: {
        name: 'swipe',
        component: () => import('@examples/docs/swipe.md'),
      },
      Transition: {
        name: 'transition',
        component: () => import('@examples/docs/transition.md'),
      },
    },
  },
};
