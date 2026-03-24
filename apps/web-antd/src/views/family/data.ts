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
      field: 'installerStationPicture',
      title: '头像',
      width: 200,
    },
    {
      field: 'installerStationName',
      title: '家庭名称',
      width: 200,
    },
    {
      field: 'totalFaultCount',
      title: '绑定设备数量',
      width: 200,
    },
    {
      field: 'installerStationName',
      title: '故障类型',
      width: 200,
    },
    {
      field: 'installerStationId',
      title: '国家',
      width: 200,
    },
    {
      field: 'installerStationAddress',
      title: '地址',
      width: 200,
    },
    {
      field: 'installerStationName',
      title: '创建时间',
      width: 200,
    },
    {
      field: 'installerInfoId',
      title: '安装商',
      width: 200,
    },
    {
      field: 'pvCapacity',
      title: '光伏装机容量',
      width: 200,
    },
    {
      field: 'batteryCapacity',
      title: '电池总容量',
      width: 200,
    },
    {
      field: 'devicesParameters',
      title: '充电桩总功率',
      width: 200,
      // 格式化一下，数据返回的devicesParameters是一个数组，固定的第0项是充电桩数据，这里面的parameterValue是数据
      formatter: ({ cellValue }) => {
        console.warn('cellValue', cellValue);
        return cellValue && cellValue.length > 0 ? `${cellValue[0].parameterValue} kW` : '--';
      },
    },
    {
      field: 'installerStationName',
      title: '热泵总功率',
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
