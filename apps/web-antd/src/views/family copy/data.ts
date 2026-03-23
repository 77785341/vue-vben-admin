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
      fieldName: 'familyName',
      label: $t('page.family.familyName'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'contactName',
      label: $t('page.family.contactName'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'contactPhone',
      label: $t('page.family.contactPhone'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'address',
      label: $t('page.family.address'),
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
      fieldName: 'familyName',
      componentProps: {
        placeholder: '家庭名称',
        span: 24,
      },
    },
    {
      component: 'Input',
      fieldName: 'familye',
      componentProps: {
        placeholder: '家庭名称',
        span: 24,
      },
    },
  ];
}

export function useColumns<T = FamilyApi.Family>(
  onActionClick: OnActionClickFn<T>,
  onStatusChange?: (newStatus: any, row: T) => PromiseLike<boolean | undefined>,
): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'familyName',
      title: $t('page.family.familyName'),
    },
    {
      field: 'contactName',
      title: $t('page.family.contactName'),
    },
    {
      field: 'contactPhone',
      title: $t('page.family.contactPhone'),
    },
    {
      field: 'address',
      title: $t('page.family.address'),
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
      title: $t('page.family.status'),
      width: 100,
    },
    {
      field: 'createTime',
      title: $t('page.family.createTime'),
      width: 200,
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'familyName',
          nameTitle: $t('page.family.name'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: [
          { code: 'view', text: $t('common.view') },
          { code: 'edit', text: $t('common.edit') },
          // { code: 'delete', text: $t('common.delete'), danger: true },
        ],
      },
      field: 'operation',
      fixed: 'right',
      title: $t('page.family.operation'),
      width: 180,
    },
  ];
}
