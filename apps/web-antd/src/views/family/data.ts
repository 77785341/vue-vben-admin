import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { FamilyApi } from '#/api/family/family';

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
      fieldName: 'installerStationName',
      label: $t('page.family.installerStationName'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'installerInfoId',
      label: $t('page.family.installerInfoId'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'country',
      label: $t('page.family.country'),
    },
    {
      component: 'Input',
      fieldName: 'zipCode',
      label: $t('page.family.zipCode'),
    },
    {
      component: 'Input',
      fieldName: 'installerStationAddress',
      label: $t('page.family.installerStationAddress'),
    },
    {
      component: 'Input',
      fieldName: 'installerStationPicture',
      label: $t('page.family.installerStationPicture'),
    },
    {
      component: 'Input',
      fieldName: 'customerName',
      label: $t('page.family.customerName'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'customerPhone',
      label: $t('page.family.customerPhone'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'customerEmail',
      label: $t('page.family.customerEmail'),
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
      label: $t('page.family.status'),
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'installerStationName',
      label: $t('page.family.installerStationName'),
    },

    {
      component: 'Input',
      fieldName: 'customerPhone',
      label: $t('page.family.customerPhone'),
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
      label: $t('page.family.status'),
    },
  ];
}

export function useColumns<T = FamilyApi.Family>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'installerStationName',
      title: $t('page.family.installerStationName'),
      width: 200,
    },
    {
      field: 'customerName',
      title: $t('page.family.customerName'),
      width: 150,
    },
    {
      field: 'customerPhone',
      title: $t('page.family.customerPhone'),
      width: 150,
    },
    {
      field: 'installerStationAddress',
      title: $t('page.family.installerStationAddress'),
      minWidth: 200,
    },
    {
      field: 'country',
      title: $t('page.family.country'),
      width: 120,
    },
    {
      field: 'zipCode',
      title: $t('page.family.zipCode'),
      width: 100,
    },
    {
      cellRender: {
        name: 'CellTag',
      },
      field: 'status',
      title: $t('page.family.status'),
      width: 100,
    },
    {
      field: 'createTime',
      title: $t('common.createTime'),
      width: 200,
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'installerStationName',
          nameTitle: $t('page.family.installerStationName'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: [
          { code: 'edit', text: $t('common.edit') },
          { code: 'delete', text: $t('common.delete'), danger: true },
        ],
      },
      field: 'operation',
      fixed: 'right',
      title: $t('common.operation'),
      width: 130,
    },
  ];
}
