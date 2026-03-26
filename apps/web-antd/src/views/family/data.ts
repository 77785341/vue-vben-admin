import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { FamilyApi } from '#/api/family/family';

import { z } from '#/adapter/form';
import { getCountryList } from '#/api/family';
import { $t } from '#/locales';

export function useFormSchema(): VbenFormSchema[] {
  return [
    {
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
      fieldName: 'installerStationPicture',
      label: $t('page.family.installerStationPicture'),
      dependencies: {
        triggerFields: ['installerStationPicture'],
        show: false,
      },
    },
    {
      component: 'Input',
      fieldName: 'customerName',
      label: $t('page.family.customerName'),
      dependencies: {
        triggerFields: ['installerStationPicture'],
        show: false,
      },
    },
    {
      component: 'Input',
      fieldName: 'installerInfoId',
      label: $t('page.family.installerInfoId'),
      dependencies: {
        triggerFields: ['installerStationPicture'],
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
      component: 'ApiSelect',
      componentProps: {
        api: getCountryList,
        class: 'w-full',
        labelField: 'countryName',
        valueField: 'countryId',
      },
      fieldName: 'country',
      label: $t('page.family.country'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'installerStationAddress',
      label: $t('page.family.installerStationAddress'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'zipCode',
      label: $t('page.family.zipCode'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'customerEmail',
      label: $t('page.family.customerEmail'),
      rules: z.string().email('邮箱格式不正确').or(z.literal('')).optional(),
    },
    {
      component: 'Input',
      fieldName: 'customerPhone',
      label: $t('page.family.customerPhone'),
      rules: z
        .string()
        .regex(/^\+?[0-9-]{6,}$/, '电话号码需要至少6位数字，可以包含+和-')
        .or(z.literal(''))
        .optional(),
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('page.family.familyNamePlaceholder'),
      },
      fieldName: 'installerStationName',
      label: $t('page.family.familyName'),
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        placeholder: $t('page.family.faultTypePlaceholder'),
        options: [
          { label: $t('page.family.faultTypeFault'), value: '1' },
          { label: $t('page.family.faultTypeWarning'), value: '3' },
          { label: $t('page.family.faultTypeNormal'), value: '2' },
          { label: $t('page.family.faultTypeAll'), value: '0' },
        ],
      },
      fieldName: 'faultNum',
      label: $t('page.family.faultType'),
    },
    {
      component: 'ApiSelect',
      componentProps: {
        api: getCountryList,
        allowClear: true,
        class: 'w-full',
        labelField: 'countryName',
        placeholder: $t('page.family.countryPlaceholder'),
        valueField: 'countryId',
      },
      fieldName: 'countryId',
      label: $t('page.family.country'),
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('page.family.installerNamePlaceholder'),
      },
      fieldName: 'stationName',
      label: $t('page.family.installerName'),
    },
  ];
}

export function useColumns<T = FamilyApi.Family>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'installerStationPicture',
      title: $t('page.family.avatar'),
      slots: { default: 'image-url' },
    },
    {
      field: 'installerStationName',
      title: $t('page.family.familyName'),
    },
    {
      field: 'totalFaultCount',
      title: $t('page.family.boundDeviceCount'),
    },
    {
      field: 'faultType',
      title: $t('page.family.faultType'),
      slots: { default: 'fault-type' },
    },
    {
      field: 'countryName',
      title: $t('page.family.country'),
    },
    {
      field: 'installerStationAddress',
      title: $t('page.family.address'),
    },
    {
      field: 'createTime',
      title: $t('page.family.createTime'),
    },
    // {
    //   field: 'installerInfoId',
    //   title: '安装商',
    // },
    {
      field: 'pvCapacity',
      title: $t('page.family.pvCapacity'),
    },
    {
      field: 'batteryCapacity',
      title: $t('page.family.batteryCapacity'),
    },
    {
      field: 'wallboxPower',
      title: $t('page.family.wallboxPower'),
    },
    {
      field: 'pumpPower',
      title: $t('page.family.pumpPower'),
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
          // { code: 'edit', text: $t('common.edit') },
          // { code: 'delete', text: $t('common.delete'), danger: true },
          { code: 'view', text: $t('system.common.view') },
        ],
      },
      field: 'operation',
      fixed: 'right',
      title: $t('page.family.operation'),
      width: 130,
    },
  ];
}
