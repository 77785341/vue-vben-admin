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
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          { label: $t('system.staff.installerRoleAdmin'), value: 'admin' },
          { label: $t('system.staff.installerRoleUser'), value: 'user' },
        ],
        style: {
          width: '100%',
        },
      },
      fieldName: 'installerRole',
      label: $t('system.staff.installerRole'),
      defaultValue: 'user',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: $t('common.enabled'), value: 'Active' },
          { label: $t('common.disabled'), value: 'Inactive' },
        ],
        optionType: 'button',
      },
      defaultValue: 'Active',
      fieldName: 'status',
      label: $t('system.staff.status'),
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'installerName',
      label: $t('system.staff.username'),
    },

    {
      component: 'Input',
      fieldName: 'phone',
      label: $t('system.staff.phone'),
    },
    // {
    //   component: 'Select',
    //   componentProps: {
    //     allowClear: true,
    //     options: [
    //       { label: '管理员', value: 'admin' },
    //       { label: '普通用户', value: 'user' },
    //     ],
    //     style: {
    //       width: '100%',
    //     },
    //   },
    //   fieldName: 'installerRole',
    //   label: '账号身份',
    // },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          { label: $t('common.enabled'), value: 'Active' },
          { label: $t('common.disabled'), value: 'Inactive' },
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
      field: 'installerRole',
      title: $t('system.staff.installerRole'),
      width: 100,
      formatter: (cellValue: any) => {
        // 处理可能的对象类型或其他非预期值
        const roleMap: Record<string, string> = {
          admin: $t('system.staff.installerRoleAdmin'),
          user: $t('system.staff.installerRoleUser'),
        };
        return roleMap[cellValue.cellValue] || cellValue.cellValue;
      },
    },
    {
      cellRender: {
        attrs: {
          beforeChange: onStatusChange,
          checkedValue: 'Active',
          uncheckedValue: 'Inactive',
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
