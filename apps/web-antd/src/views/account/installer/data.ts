/*
 * @Author: Felix 77785341@qq.com
 * @Date: 2026-03-18 13:42:07
 * @LastEditors: Felix 77785341@qq.com
 * @LastEditTime: 2026-03-19 16:51:20
 * @FilePath: \vue-vben-admin\apps\web-antd\src\views\account\installer\data.ts
 * @Description:
 *
 * Copyright (c) 2026 by ${git_name_email}, All Rights Reserved.
 */
import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { InstallerApi } from '#/api/account/installer';

import { getCountryList } from '#/api/family';
import { $t } from '#/locales';

export function useFormSchema(): VbenFormSchema[] {
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
      fieldName: 'installerName',
      label: $t('system.installer.installerName'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'installerPhone',
      label: $t('system.installer.phone'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'installerEmail',
      label: $t('system.installer.email'),
    },
    {
      component: 'ApiSelect',
      componentProps: {
        api: getCountryList,
        class: 'w-full',
        labelField: 'countryName',
        placeholder: $t('system.installer.countryPlaceholder'),
        valueField: 'countryId',
      },
      fieldName: 'country',
      label: $t('system.installer.country'),
      rules: 'required',
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.installer.installerNamePlaceholder'),
      },
      fieldName: 'name',
      label: $t('system.installer.installerName'),
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.installer.phonePlaceholder'),
      },
      fieldName: 'phone',
      label: $t('system.installer.phone'),
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.installer.emailPlaceholder'),
      },
      fieldName: 'email',
      label: $t('system.installer.email'),
    },
  ];
}

export function useColumns<T = InstallerApi.Installer>(
  onActionClick: OnActionClickFn<T>,
  // onStatusChange?: (newStatus: any, row: T) => PromiseLike<boolean | undefined>,
): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'installerName',
      title: $t('system.installer.installerName'),
    },
    {
      field: 'installerPhone',
      title: $t('system.installer.phone'),
    },
    {
      field: 'installerEmail',
      title: $t('system.installer.email'),
    },
    {
      slots: { default: 'country-name' },
      field: 'country',
      title: $t('system.installer.country'),
    },

    // 操作列 查看员工
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
          // 查看员工
          { code: 'view', text: $t('system.common.view') },
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
