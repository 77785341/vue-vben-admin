import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';

// 故障信息搜索表单配置
export function useFaultFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Select',
      fieldName: 'type',
      label: 'Type',
      defaultValue: 'all',
      componentProps: {
        allowClear: false,
        options: [
          { label: 'All', value: 'all' },
          { label: 'Error', value: 'error' },
          { label: 'Warning', value: 'warning' },
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
    { title: 'No.', type: 'seq', width: 60 },
    {
      field: 'faultName',
      title: 'Fault Name',
      formatter: (cellValue: any) => cellValue.cellValue ?? '--',
    },
    {
      field: 'faultTime',
      title: 'Fault Time',
      formatter: (cellValue: any) => cellValue.cellValue ?? '--',
    },
    {
      field: 'faultType',
      title: 'Fault Type',
      slots: { default: 'fault-type' },
    },
    {
      field: 'status',
      title: 'Status',
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
      title: 'Action',
      width: 150,
    },
  ];
}

// 历史故障表格列配置
export function useHistoryFaultColumns<T = any>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
    { title: 'No.', type: 'seq', width: 60 },
    {
      field: 'faultName',
      title: 'Fault Name',
      formatter: (cellValue: any) => cellValue.cellValue ?? '--',
    },
    {
      field: 'startTime',
      title: 'Start Time',
      formatter: (cellValue: any) => cellValue.cellValue ?? '--',
    },
    {
      field: 'endTime',
      title: 'End Time',
      formatter: (cellValue: any) => cellValue.cellValue ?? '--',
    },
    {
      field: 'faultType',
      title: 'Fault Type',
      slots: { default: 'fault-type' },
    },
    {
      field: 'status',
      title: 'Status',
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
      title: 'Action',
      width: 150,
    },
  ];
}
