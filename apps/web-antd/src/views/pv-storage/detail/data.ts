import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';

// 故障信息搜索表单配置
export function useFaultFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Select',
      fieldName: 'type',
      label: '类型',
      defaultValue: 'all',
      componentProps: {
        allowClear: false,
        options: [
          { label: '全部', value: 'all' },
          { label: '故障', value: 'error' },
          { label: '警告', value: 'warning' },
        ],
      },
    },
  ];
}

// 实时故障表格列配置
export function useRealtimeFaultColumns<T = any>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
    { title: '序号', type: 'seq', width: 60 },
    {
      field: 'faultName',
      title: '故障名称',
      formatter: (cellValue: any) => cellValue.cellValue ?? '--',
    },
    {
      field: 'faultTime',
      title: '故障时间',
      formatter: (cellValue: any) => cellValue.cellValue ?? '--',
    },
    {
      field: 'faultType',
      title: '故障类型',
      slots: { default: 'fault-type' },
    },
    {
      field: 'status',
      title: '状态',
      slots: { default: 'fault-status' },
    },
    {
      align: 'center',
      cellRender: {
        attrs: { onClick: onActionClick },
        name: 'CellOperation',
        options: [{ code: 'view', text: 'View Description' }],
      },
      field: 'operation',
      fixed: 'right',
      title: '操作',
      width: 150,
    },
  ];
}

// 历史故障表格列配置
export function useHistoryFaultColumns<T = any>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
    { title: '序号', type: 'seq', width: 60 },
    {
      field: 'faultName',
      title: '故障名称',
      formatter: (cellValue: any) => cellValue.cellValue ?? '--',
    },
    {
      field: 'startTime',
      title: '开始时间',
      formatter: (cellValue: any) => cellValue.cellValue ?? '--',
    },
    {
      field: 'endTime',
      title: '结束时间',
      formatter: (cellValue: any) => cellValue.cellValue ?? '--',
    },
    {
      field: 'faultType',
      title: '故障类型',
      slots: { default: 'fault-type' },
    },
    {
      field: 'status',
      title: '状态',
      slots: { default: 'fault-status' },
    },
    {
      align: 'center',
      cellRender: {
        attrs: { onClick: onActionClick },
        name: 'CellOperation',
        options: [{ code: 'view', text: 'View Description' }],
      },
      field: 'operation',
      fixed: 'right',
      title: '操作',
      width: 150,
    },
  ];
}
