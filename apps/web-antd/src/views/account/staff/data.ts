import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { StaffApi } from '#/api/account/staff';

import { $t } from '#/locales';

export function useFormSchema(
  _deptOptions: {
    label: string;
    value: string;
  }[] = [],
  _roleOptions: {
    label: string;
    value: string;
  }[] = [],
): VbenFormSchema[] {
  return [
    {
      // 隐藏id字段，避免用户手动修改
      component: 'Input',
      fieldName: 'id',
      label: 'id',
      dependencies: {
        triggerFields: ['id'],
        show: false,
      },
    },
    {
      component: 'Input',
      fieldName: 'loginName',
      label: $t('system.staff.username'),
      rules: 'required',
    },
    {
      component: 'InputPassword',
      fieldName: 'password',
      label: $t('system.staff.password'),
      componentProps: {
        placeholder: $t('system.staff.defaultPasswordPlaceholder'),
      },
    },

    {
      component: 'Input',
      fieldName: 'phone',
      label: $t('system.staff.phone'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'email',
      label: $t('system.staff.email'),
    },

    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: $t('common.enabled'), value: 'on' },
          { label: $t('common.disabled'), value: 'off' },
        ],
        optionType: 'button',
      },
      defaultValue: 'on',
      fieldName: 'status',
      label: $t('system.staff.status'),
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'loginName',
      label: $t('system.staff.username'),
    },

    {
      component: 'Input',
      fieldName: 'phone',
      label: $t('system.staff.phone'),
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          { label: $t('common.enabled'), value: 'on' },
          { label: $t('common.disabled'), value: 'off' },
        ],
      },
      fieldName: 'status',
      label: $t('system.staff.status'),
    },
  ];
}

export function useColumns<T = StaffApi.Staff>(
  onActionClick: OnActionClickFn<T>,
  onStatusChange?: (newStatus: any, row: T) => PromiseLike<boolean | undefined>,
): VxeTableGridOptions['columns'] {
  return [
    {
      slots: { default: 'image-url' },
      field: 'avatar',
      title: $t('system.staff.avatar'),
      width: 80,
      align: 'center',
    },
    {
      field: 'loginName',
      title: $t('system.staff.username'),
    },
    {
      field: 'phone',
      title: $t('system.staff.phone'),
    },
    {
      field: 'email',
      title: $t('system.staff.email'),
    },
    {
      slots: { default: 'role-names' },
      field: 'roleIds',
      title: $t('system.staff.role'),
    },

    {
      cellRender: {
        attrs: {
          beforeChange: onStatusChange,
          checkedValue: 'on',
          uncheckedValue: 'off',
        },
        name: onStatusChange ? 'CellSwitch' : 'CellTag',
      },
      field: 'status',
      title: $t('system.staff.status'),
      width: 100,
    },
    {
      field: 'createTime',
      title: $t('system.staff.createTime'),
      width: 200,
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'loginName',
          nameTitle: $t('system.staff.name'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: [
          { code: 'assignRole', text: $t('system.staff.assignRole') },
          { code: 'edit', text: $t('common.edit') },
          // { code: 'delete', text: $t('common.delete'), danger: true },
        ],
      },
      field: 'operation',
      fixed: 'right',
      title: $t('system.staff.operation'),
      width: 180,
    },
  ];
}
