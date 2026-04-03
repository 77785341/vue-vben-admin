<script lang="ts" setup>
import type {
  BatteryFormModel,
  ControlTab,
  MeterFormModel,
  SystemFormModel,
} from '../types';

import {
  Button,
  Form,
  FormItem,
  InputNumber,
  Segmented,
  Select,
  Switch,
} from 'ant-design-vue';

import { useControlPanelLogic } from './logic/useControlPanelLogic';

const props = defineProps<{
  activeTab: string;
  batteryForm: BatteryFormModel;
  batteryModelOptions: Array<{ label: string; value: number }>;
  controlTab: ControlTab;
  controlTabs: Array<{ label: string; value: string }>;
  feederPowerLimitOptions: Array<{ label: string; value: number }>;
  meterForm: MeterFormModel;
  meterModelOptions: Array<{ label: string; value: number }>;
  onControlCancel: () => void;
  onControlConfirm: () => void;
  systemForm: SystemFormModel;
  systemGridIntegrationStandardsOptions: Array<{
    label: string;
    value: number;
  }>;
  systemPvConnectionModeOptions: Array<{ label: string; value: number }>;
  systemWorkModeOptions: Array<{ label: string; value: number }>;
}>();

const emit = defineEmits<{
  'update:batteryForm': [value: BatteryFormModel];
  'update:controlTab': [value: ControlTab];
  'update:meterForm': [value: MeterFormModel];
  'update:systemForm': [value: SystemFormModel];
}>();

const { localBatteryForm, localMeterForm, localSystemForm, updateControlTab } =
  useControlPanelLogic(props, emit);
</script>

<template>
  <div v-if="props.activeTab === 'control'">
    <div class="mb-6">
      <Segmented
        :value="props.controlTab"
        :options="props.controlTabs"
        class="control-tab-segmented"
        @update:value="updateControlTab"
      />
    </div>

    <Form
      v-if="props.controlTab === 'system'"
      :label-col="{ style: { width: '200px' } }"
      :wrapper-col="{ style: { width: '440px' } }"
      label-align="left"
      class="max-w-[640px]"
    >
      <FormItem>
        <template #label>
          <span class="text-red-500">*</span>Power On
        </template>
        <Switch v-model:checked="localSystemForm.powerOn" />
      </FormItem>
      <FormItem>
        <template #label>
          <span class="text-red-500">*</span>PV Connection Mode
        </template>
        <Select
          v-model:value="localSystemForm.pvConnectionMode"
          placeholder="Select..."
          :options="props.systemPvConnectionModeOptions"
        />
      </FormItem>
      <FormItem>
        <template #label>
          <span class="text-red-500">*</span>Work Mode
        </template>
        <Select
          v-model:value="localSystemForm.workMode"
          placeholder="Select..."
          :options="props.systemWorkModeOptions"
        />
      </FormItem>
      <FormItem>
        <template #label>
          <span class="text-red-500">*</span>Grid Code
        </template>
        <Select
          v-model:value="localSystemForm.gridIntegrationStandards"
          placeholder="Select..."
          :options="props.systemGridIntegrationStandardsOptions"
        />
      </FormItem>
      <FormItem>
        <div class="flex gap-3">
          <Button @click="props.onControlCancel">Cancel</Button>
          <Button
            type="primary"
            style="background: #237ebc"
            @click="props.onControlConfirm"
          >
            Confirm
          </Button>
        </div>
      </FormItem>
    </Form>

    <Form
      v-else-if="props.controlTab === 'meter'"
      :label-col="{ style: { width: '200px' } }"
      :wrapper-col="{ style: { width: '440px' } }"
      label-align="left"
      class="max-w-[640px]"
    >
      <FormItem>
        <template #label>
          <span class="text-red-500">*</span>Meter Model
        </template>
        <Select
          v-model:value="localMeterForm.meterModel"
          placeholder="Select..."
          :options="props.meterModelOptions"
        />
      </FormItem>
      <FormItem>
        <template #label>
          <span class="text-red-500">*</span>Feeder switch
        </template>
        <Switch v-model:checked="localMeterForm.feederSwitch" />
      </FormItem>
      <FormItem v-if="localMeterForm.feederSwitch">
        <template #label>
          <span class="text-red-500">*</span>Feeder Power limit(w)
        </template>
        <Select
          v-model:value="localMeterForm.feederPowerLimit"
          placeholder="Select..."
          :options="props.feederPowerLimitOptions"
        />
      </FormItem>
      <FormItem>
        <template #label>
          <span class="text-red-500">*</span>CT Ratio
        </template>
        <InputNumber
          v-model:value="localMeterForm.ctRatio"
          :min="1"
          :precision="0"
          placeholder="Input..."
          style="width: 100%"
        />
      </FormItem>
      <FormItem>
        <div class="flex gap-3">
          <Button @click="props.onControlCancel">Cancel</Button>
          <Button
            type="primary"
            style="background: #237ebc"
            @click="props.onControlConfirm"
          >
            Confirm
          </Button>
        </div>
      </FormItem>
    </Form>

    <Form
      v-else-if="props.controlTab === 'battery'"
      :label-col="{ style: { width: '200px' } }"
      :wrapper-col="{ style: { width: '440px' } }"
      label-align="left"
      class="max-w-[640px]"
    >
      <FormItem>
        <template #label>
          <span class="text-red-500">*</span>Battery Model
        </template>
        <Select
          v-model:value="localBatteryForm.batteryModel"
          placeholder="Select..."
          :options="props.batteryModelOptions"
        />
      </FormItem>
      <FormItem>
        <template #label>
          <span class="text-red-500">*</span>Max. SoC limit (%)
        </template>
        <InputNumber
          v-model:value="localBatteryForm.maxSocLimit"
          placeholder="Input..."
          :min="0"
          :max="100"
          style="width: 100%"
        />
      </FormItem>
      <FormItem>
        <template #label>
          <span class="text-red-500">*</span>Min. SoC on-grid (%)
        </template>
        <InputNumber
          v-model:value="localBatteryForm.minSocToGrid"
          placeholder="Input..."
          :min="0"
          :max="100"
          style="width: 100%"
        />
      </FormItem>
      <FormItem>
        <template #label>
          <span class="text-red-500">*</span>Min. SoC off-grid (%)
        </template>
        <InputNumber
          v-model:value="localBatteryForm.minSocOffGrid"
          placeholder="Input..."
          :min="0"
          :max="100"
          style="width: 100%"
        />
      </FormItem>
      <FormItem>
        <div class="flex gap-3">
          <Button @click="props.onControlCancel">Cancel</Button>
          <Button
            type="primary"
            style="background: #237ebc"
            @click="props.onControlConfirm"
          >
            Confirm
          </Button>
        </div>
      </FormItem>
    </Form>
  </div>
</template>
