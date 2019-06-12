export default {
  documents: {
    QuickStart: {
      name: 'quickstart',
      component: () => import('@/README.md'),
    },
    I18n: {
      name: 'i18n',
      component: () => import('@/components/locale/i18n.md'),
    },
  },
  components: {
    Basic: {
      Icon: {
        name: 'icon',
        component: () => import('@/components/icon/icon.md'),
      },
      Button: {
        name: 'button',
        component: () => import('@/components/button/button.md'),
      },
    },
    Layout: {
      Layout: {
        name: 'layout',
        component: () => import('@/components/layout/layout.md'),
      },
      Grid: {
        name: 'grid',
        component: () => import('@/components/grid/grid.md'),
      },
    },
    Form: {
      Radio: {
        name: 'radio',
        component: () => import('@/components/radio/radio.md'),
      },
      Checkbox: {
        name: 'checkbox',
        component: () => import('@/components/checkbox/checkbox.md'),
      },
      Input: {
        name: 'input',
        component: () => import('@/components/input/input.md'),
      },
      NumberInput: {
        name: 'numberinput',
        component: () => import('@/components/number-input/numberinput.md'),
      },
      Select: {
        name: 'select',
        component: () => import('@/components/select/select.md'),
      },
      Switch: {
        name: 'switch',
        component: () => import('@/components/switch/switch.md'),
      },
      Slider: {
        name: 'slider',
        component: () => import('@/components/slider/slider.md'),
      },
      Calendar: {
        name: 'calendar',
        component: () => import('@/components/calendar/calendar.md'),
      },
      DatePicker: {
        name: 'datepicker',
        component: () => import('@/components/date-picker/datepicker.md'),
      },
      TimePicker: {
        name: 'timepicker',
        component: () => import('@/components/time-picker/timepicker.md'),
      },
      Upload: {
        name: 'upload',
        component: () => import('@/components/upload/upload.md'),
      },
      Form: {
        name: 'form',
        component: () => import('@/components/form/form.md'),
      },
    },
    Data: {
      Table: {
        name: 'table',
        component: () => import('@/components/table/table.md'),
      },
      Tag: {
        name: 'tag',
        component: () => import('@/components/tag/tag.md'),
      },
      Progress: {
        name: 'progress',
        component: () => import('@/components/progress/progress.md'),
      },
      Panel: {
        name: 'panel',
        component: () => import('@/components/panel/panel.md'),
      },
      Pagination: {
        name: 'pagination',
        component: () => import('@/components/pagination/pagination.md'),
      },
      Tree: {
        name: 'tree',
        component: () => import('@/components/tree/tree.md'),
      },
      Transfer: {
        name: 'transfer',
        component: () => import('@/components/transfer/transfer.md'),
      },
      Avatar: {
        name: 'avatar',
        component: () => import('@/components/avatar/avatar.md'),
      },
    },
    Notice: {
      Alert: {
        name: 'alert',
        component: () => import('@/components/alert/alert.md'),
      },
      Loading: {
        name: 'loading',
        component: () => import('@/components/loading/loading.md'),
      },
      Message: {
        name: 'message',
        component: () => import('@/components/message/message.md'),
      },
      Modal: {
        name: 'modal',
        component: () => import('@/components/modal/modal.md'),
      },
      Confirm: {
        name: 'confirm',
        component: () => import('@/components/confirm/confirm.md'),
      },
      Notification: {
        name: 'notification',
        component: () => import('@/components/notification/notification.md'),
      },
    },
    Nav: {
      Menu: {
        name: 'menu',
        component: () => import('@/components/menu/menu.md'),
      },
      Tab: {
        name: 'tab',
        component: () => import('@/components/tab/tab.md'),
      },
      Breadcrumb: {
        name: 'breadcrumb',
        component: () => import('@/components/breadcrumb/breadcrumb.md'),
      },
      Step: {
        name: 'step',
        component: () => import('@/components/step/step.md'),
      },
      Dropdown: {
        name: 'dropdown',
        component: () => import('@/components/dropdown/dropdown.md'),
      },
    },
    Others: {
      Tooltip: {
        name: 'tooltip',
        component: () => import('@/components/tooltip/tooltip.md'),
      },
      Popover: {
        name: 'popover',
        component: () => import('@/components/popover/popover.md'),
      },
      Popconfirm: {
        name: 'popconfirm',
        component: () => import('@/components/popconfirm/popconfirm.md'),
      },
      Mask: {
        name: 'mask',
        component: () => import('@/components/mask/mask.md'),
      },
      Swipe: {
        name: 'swipe',
        component: () => import('@/components/swipe/swipe.md'),
      },
      Transition: {
        name: 'transition',
        component: () => import('@/components/transition/transition.md'),
      },
    },
  },
};
