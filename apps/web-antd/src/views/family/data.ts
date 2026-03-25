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
        placeholder: '请输入家庭名称',
      },
      fieldName: 'installerStationName',
      label: '家庭名称',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        placeholder: '请选择故障类型',
        options: [
          { label: '故障', value: '1' },
          { label: '警告', value: '3' },
          { label: '正常', value: '2' },
          { label: '全部', value: '0' },
        ],
      },
      fieldName: 'faultNum',
      label: '故障类型',
    },
    {
      component: 'ApiSelect',
      componentProps: {
        api: getCountryList,
        allowClear: true,
        class: 'w-full',
        labelField: 'countryName',
        placeholder: '请选择国家',
        valueField: 'countryId',
      },
      fieldName: 'countryId',
      label: '国家',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入安装商名称',
      },
      fieldName: 'stationName',
      label: '安装商名称',
    },
  ];
}

export function useColumns<T = FamilyApi.Family>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'installerStationPicture',
      title: '头像',
      slots: { default: 'image-url' },
    },
    {
      field: 'installerStationName',
      title: '家庭名称',
    },
    {
      field: 'totalFaultCount',
      title: '绑定设备数量',
    },
    {
      field: 'faultType',
      title: '故障类型',
      slots: { default: 'fault-type' },
    },
    {
      field: 'countryName',
      title: '国家',
    },
    {
      field: 'installerStationAddress',
      title: '地址',
    },
    {
      field: 'createTime',
      title: '创建时间',
    },
    // {
    //   field: 'installerInfoId',
    //   title: '安装商',
    // },
    {
      field: 'pvCapacity',
      title: '光伏装机容量',
    },
    {
      field: 'batteryCapacity',
      title: '电池总容量',
    },
    {
      field: 'wallboxPower',
      title: '充电桩总功率',
    },
    {
      field: 'pumpPower',
      title: '热泵总功率',
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
          { code: 'view', text: '查看' },
        ],
      },
      field: 'operation',
      fixed: 'right',
      title: $t('page.family.operation'),
      width: 130,
    },
  ];
}
