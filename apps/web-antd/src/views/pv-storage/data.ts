import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';

import { $t } from '#/locales';

// 光储管理无新增表单需求，仅保留筛选字段，接口相关已注释
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'collectionSn',
      label: $t('page.pvStorage.collectorSn'),
      componentProps: {
        placeholder: $t('page.pvStorage.collectorSnPlaceholder'),
      },
    },
    {
      component: 'Input',
      fieldName: 'inverterSn',
      label: $t('page.pvStorage.inverterSn'),
      componentProps: {
        placeholder: $t('page.pvStorage.inverterSnPlaceholder'),
      },
    },
    {
      component: 'Input',
      fieldName: 'stationName',
      label: $t('page.pvStorage.stationName'),
      componentProps: {
        placeholder: $t('page.pvStorage.stationNamePlaceholder'),
      },
    },
    {
      component: 'Input',
      fieldName: 'installerInfoName',
      label: $t('page.pvStorage.installerInfoName'),
      componentProps: {
        placeholder: $t('page.pvStorage.installerInfoNamePlaceholder'),
      },
    },
    {
      component: 'Select',
      fieldName: 'isBind',
      label: $t('page.pvStorage.isBind'),
      componentProps: {
        allowClear: true,
        options: [
          { label: $t('page.pvStorage.isBindYes'), value: 'yes' },
          { label: $t('page.pvStorage.isBindNo'), value: 'no' },
        ],
        placeholder: $t('page.pvStorage.isBindPlaceholder'),
      },
    },
    {
      component: 'Select',
      fieldName: 'status',
      label: $t('page.pvStorage.onlineStatus'),
      componentProps: {
        allowClear: true,
        options: [
          { label: $t('page.family.online'), value: 'online' },
          { label: $t('page.family.offline'), value: 'offline' },
        ],
        placeholder: $t('page.pvStorage.onlineStatusPlaceholder'),
      },
    },
    {
      component: 'Select',
      fieldName: 'faultType',
      label: $t('page.pvStorage.faultType'),
      componentProps: {
        allowClear: true,
        options: [
          { label: $t('page.pvStorage.fault'), value: 'Error' },
          { label: $t('page.pvStorage.warning'), value: 'Warning' },
          { label: $t('page.pvStorage.normal'), value: 'Normal' },
        ],
        placeholder: $t('page.pvStorage.faultTypePlaceholder'),
      },
    },
  ];
}

// 列表字段与接口字段一致
export function useColumns<T = any>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
    { title: '序号', type: 'seq', width: 50 },
    // {
    //   field: 'inverterName',
    //   title: $t('page.pvStorage.inverterName'),
    //   formatter: (cellValue: any) => {
    //     return cellValue.cellValue ?? '--';
    //   },
    // },
    {
      field: 'stationName',
      title: $t('page.pvStorage.stationName'),
      formatter: (cellValue: any) => {
        return cellValue.cellValue ?? '--';
      },
    },
    {
      field: 'collectionSn',
      title: $t('page.pvStorage.collectorSn'),
      formatter: (cellValue: any) => {
        return cellValue.cellValue ?? '--';
      },
    },
    {
      field: 'inverterSn',
      title: $t('page.pvStorage.inverterSn'),
      formatter: (cellValue: any) => {
        return cellValue.cellValue ?? '--';
      },
    },
    {
      field: 'installerInfoName',
      title: $t('page.pvStorage.installerInfoName'),
      formatter: (cellValue: any) => {
        return cellValue.cellValue ?? '--';
      },
    },
    {
      field: 'createTime',
      title: $t('page.pvStorage.createTime'),
      formatter: (cellValue: any) => {
        return cellValue.cellValue ?? '--';
      },
    },
    {
      field: 'faultType',
      title: $t('page.pvStorage.faultType'),
      slots: { default: 'fault-type' },
    },
    {
      field: 'status',
      title: $t('page.pvStorage.onlineStatus'),
      slots: { default: 'online-status' },
    },
    {
      field: 'isBind',
      title: $t('page.pvStorage.isBind'),
      slots: { default: 'bind-status' },
    },

    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'inverterName',
          nameTitle: $t('page.pvStorage.inverterName'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: [{ code: 'view', text: $t('system.common.view') }],
      },
      field: 'operation',
      fixed: 'right',
      title: $t('page.family.operation'),
      width: 130,
    },
  ];
}
