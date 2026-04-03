import type {
  BatteryFormModel,
  ControlTab,
  MeterFormModel,
  SystemFormModel,
} from '../../types';

import { reactive, watch } from 'vue';

type ControlPanelEmits = {
  'update:batteryForm': [value: BatteryFormModel];
  'update:controlTab': [value: ControlTab];
  'update:meterForm': [value: MeterFormModel];
  'update:systemForm': [value: SystemFormModel];
};

type ControlPanelProps = {
  batteryForm: BatteryFormModel;
  controlTab: ControlTab;
  meterForm: MeterFormModel;
  systemForm: SystemFormModel;
};

export function useControlPanelLogic(
  props: ControlPanelProps,
  emit: <K extends keyof ControlPanelEmits>(
    event: K,
    ...args: ControlPanelEmits[K]
  ) => void,
) {
  const localSystemForm = reactive({ ...props.systemForm });
  const localMeterForm = reactive({ ...props.meterForm });
  const localBatteryForm = reactive({ ...props.batteryForm });

  watch(
    () => props.systemForm,
    (value) => {
      Object.assign(localSystemForm, value ?? {});
    },
    { deep: true },
  );

  watch(
    () => props.meterForm,
    (value) => {
      Object.assign(localMeterForm, value ?? {});
    },
    { deep: true },
  );

  watch(
    () => props.batteryForm,
    (value) => {
      Object.assign(localBatteryForm, value ?? {});
    },
    { deep: true },
  );

  watch(
    localSystemForm,
    (value) => {
      emit('update:systemForm', { ...value });
    },
    { deep: true },
  );

  watch(
    localMeterForm,
    (value) => {
      emit('update:meterForm', { ...value });
    },
    { deep: true },
  );

  watch(
    localBatteryForm,
    (value) => {
      emit('update:batteryForm', { ...value });
    },
    { deep: true },
  );

  function updateControlTab(value: number | string) {
    emit('update:controlTab', value as ControlTab);
  }

  return {
    localBatteryForm,
    localMeterForm,
    localSystemForm,
    updateControlTab,
  };
}
