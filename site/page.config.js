export default {
  documents: {
    QuickStart: {
      name: 'quickstart',
      component: () => import('@/README.md'),
    },
    I18n: {
      name: 'i18n',
      component: () => import('@site/docs/i18n.md'),
    },
  },
  components: {
    Basic: {
      Icon: {
        name: 'icon',
        component: () => import('@site/docs/icon.md'),
      },
      Button: {
        name: 'button',
        component: () => import('@site/docs/button.md'),
      },
    },
    Layout: {
      Layout: {
        name: 'layout',
        component: () => import('@site/docs/layout.md'),
      },
      Grid: {
        name: 'grid',
        component: () => import('@site/docs/grid.md'),
      },
    },
    Form: {
      Radio: {
        name: 'radio',
        component: () => import('@site/docs/radio.md'),
      },
      Checkbox: {
        name: 'checkbox',
        component: () => import('@site/docs/checkbox.md'),
      },
      Input: {
        name: 'input',
        component: () => import('@site/docs/input.md'),
      },
      NumberInput: {
        name: 'numberinput',
        component: () => import('@site/docs/numberinput.md'),
      },
      Select: {
        name: 'select',
        component: () => import('@site/docs/select.md'),
      },
      Switch: {
        name: 'switch',
        component: () => import('@site/docs/switch.md'),
      },
      Slider: {
        name: 'slider',
        component: () => import('@site/docs/slider.md'),
      },
      Calendar: {
        name: 'calendar',
        component: () => import('@site/docs/calendar.md'),
      },
      DatePicker: {
        name: 'datepicker',
        component: () => import('@site/docs/datepicker.md'),
      },
      TimePicker: {
        name: 'timepicker',
        component: () => import('@site/docs/timepicker.md'),
      },
      Upload: {
        name: 'upload',
        component: () => import('@site/docs/upload.md'),
      },
      Form: {
        name: 'form',
        component: () => import('@site/docs/form.md'),
      },
    },
    Data: {
      Table: {
        name: 'table',
        component: () => import('@site/docs/table.md'),
      },
      Tag: {
        name: 'tag',
        component: () => import('@site/docs/tag.md'),
      },
      Progress: {
        name: 'progress',
        component: () => import('@site/docs/progress.md'),
      },
      Panel: {
        name: 'panel',
        component: () => import('@site/docs/panel.md'),
      },
      Pagination: {
        name: 'pagination',
        component: () => import('@site/docs/pagination.md'),
      },
      Tree: {
        name: 'tree',
        component: () => import('@site/docs/tree.md'),
      },
      Transfer: {
        name: 'transfer',
        component: () => import('@site/docs/transfer.md'),
      },
      Avatar: {
        name: 'avatar',
        component: () => import('@site/docs/avatar.md'),
      },
    },
    Notice: {
      Alert: {
        name: 'alert',
        component: () => import('@site/docs/alert.md'),
      },
      Loading: {
        name: 'loading',
        component: () => import('@site/docs/loading.md'),
      },
      Message: {
        name: 'message',
        component: () => import('@site/docs/message.md'),
      },
      Modal: {
        name: 'modal',
        component: () => import('@site/docs/modal.md'),
      },
      Confirm: {
        name: 'confirm',
        component: () => import('@site/docs/confirm.md'),
      },
      Notification: {
        name: 'notification',
        component: () => import('@site/docs/notification.md'),
      },
    },
    Nav: {
      Menu: {
        name: 'menu',
        component: () => import('@site/docs/menu.md'),
      },
      Tab: {
        name: 'tab',
        component: () => import('@site/docs/tab.md'),
      },
      Breadcrumb: {
        name: 'breadcrumb',
        component: () => import('@site/docs/breadcrumb.md'),
      },
      Step: {
        name: 'step',
        component: () => import('@site/docs/step.md'),
      },
      Dropdown: {
        name: 'dropdown',
        component: () => import('@site/docs/dropdown.md'),
      },
    },
    Others: {
      Tooltip: {
        name: 'tooltip',
        component: () => import('@site/docs/tooltip.md'),
      },
      Popover: {
        name: 'popover',
        component: () => import('@site/docs/popover.md'),
      },
      Popconfirm: {
        name: 'popconfirm',
        component: () => import('@site/docs/popconfirm.md'),
      },
      Mask: {
        name: 'mask',
        component: () => import('@site/docs/mask.md'),
      },
      Swipe: {
        name: 'swipe',
        component: () => import('@site/docs/swipe.md'),
      },
      Transition: {
        name: 'transition',
        component: () => import('@site/docs/transition.md'),
      },
    },
  },
};
