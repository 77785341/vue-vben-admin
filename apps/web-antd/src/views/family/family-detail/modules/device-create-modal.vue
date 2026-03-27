<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue';

import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
} from 'ant-design-vue';

import {
  getInverterModelOptions,
  getPumpModelOptions,
  getWallBoxModelOption,
  saveInstallerInverter,
  saveInstallerPump,
  saveInstallerWallbox,
} from '#/api';

const props = defineProps<{
  installerStationId?: string;
  open: boolean;
}>();

const emit = defineEmits<{
  success: [];
  'update:open': [value: boolean];
}>();

type DeviceType = 'inverters' | 'pumps' | 'wallboxes';

const typeOptions = [
  { label: '光储', value: 'inverters' },
  { label: '热泵', value: 'pumps' },
  { label: '充电桩', value: 'wallboxes' },
];

const formState = reactive({
  deviceName: '',
  deviceType: 'inverters' as DeviceType,
  model: undefined as string | undefined,
  pvPower: undefined as number | undefined,
  sn: '',
});

const submitting = ref(false);
const modelOptions = ref<Array<{ label: string; value: string }>>([]);
const modelOptionsLoading = ref(false);

const snLabel = computed(() => {
  return formState.deviceType === 'wallboxes' ? 'SN' : '采集器SN';
});

const modelLabel = computed(() => {
  if (formState.deviceType === 'pumps') return '热泵型号';
  if (formState.deviceType === 'wallboxes') return '充电桩型号';
  return '储能型号';
});

const nameLabel = computed(() => '设备名称');

const showPvPower = computed(() => formState.deviceType === 'inverters');

function normalizeOption(item: unknown, index: number) {
  if (typeof item === 'string' || typeof item === 'number') {
    const text = String(item);
    return { label: text, value: text };
  }

  const option = (item ?? {}) as Record<string, unknown>;
  const label =
    option.label ??
    option.name ??
    option.model ??
    option.text ??
    option.title ??
    option.value;
  const value =
    option.value ??
    option.code ??
    option.id ??
    option.model ??
    option.name ??
    label ??
    `${index}`;

  return {
    label: String(label ?? value ?? ''),
    value: String(value ?? ''),
  };
}

function normalizeModelOptionByType(
  type: DeviceType,
  item: unknown,
  index: number,
) {
  const option = (item ?? {}) as Record<string, unknown>;
  const idFieldByType: Record<DeviceType, string> = {
    inverters: 'inverterModelId',
    pumps: 'pumpModelId',
    wallboxes: 'wallBoxModelId',
  };
  const idField = idFieldByType[type];
  const modelId = option[idField];

  if (
    modelId !== undefined &&
    modelId !== null &&
    String(modelId).trim() !== ''
  ) {
    const text = String(modelId);
    return {
      label: text,
      value: text,
    };
  }

  return normalizeOption(item, index);
}

async function fetchModelOptions(type: DeviceType) {
  modelOptionsLoading.value = true;
  try {
    let response: unknown;
    if (type === 'pumps') {
      response = await getPumpModelOptions();
    } else if (type === 'wallboxes') {
      response = await getWallBoxModelOption();
    } else {
      response = await getInverterModelOptions();
    }

    const raw = Array.isArray(response)
      ? response
      : ((response as any)?.data ?? (response as any)?.items ?? []);
    const list = Array.isArray(raw) ? raw : [];
    modelOptions.value = list
      .map((item, index) => normalizeModelOptionByType(type, item, index))
      .filter((item) => !!item.value);
  } catch (error) {
    console.error('获取型号选项失败:', error);
    modelOptions.value = [];
  } finally {
    modelOptionsLoading.value = false;
  }
}

function resetForm() {
  formState.deviceType = 'inverters';
  formState.sn = '';
  formState.model = undefined;
  formState.deviceName = '';
  formState.pvPower = undefined;
}

function closeModal() {
  emit('update:open', false);
}

function validateForm() {
  if (!props.installerStationId) {
    message.warning('电站ID不存在，无法新增设备');
    return false;
  }
  if (!formState.deviceType) {
    message.warning('请选择设备类型');
    return false;
  }
  if (!formState.sn.trim()) {
    message.warning(`请输入${snLabel.value}`);
    return false;
  }
  if (!(formState.model ?? '').trim()) {
    message.warning(`请输入${modelLabel.value}`);
    return false;
  }
  if (!formState.deviceName.trim()) {
    message.warning(`请输入${nameLabel.value}`);
    return false;
  }
  if (showPvPower.value && !(Number(formState.pvPower) > 0)) {
    message.warning('请输入PV装机容量');
    return false;
  }
  return true;
}

async function handleSubmit() {
  if (!validateForm()) return;

  try {
    submitting.value = true;

    if (formState.deviceType === 'pumps') {
      const model = (formState.model ?? '').trim();
      await saveInstallerPump({
        installerStationId: props.installerStationId ?? '',
        pumpName: formState.deviceName.trim(),
        pumpSn: formState.sn.trim(),
        pumpType: model,
      });
    } else if (formState.deviceType === 'wallboxes') {
      const model = (formState.model ?? '').trim();
      await saveInstallerWallbox({
        installerStationId: props.installerStationId ?? '',
        wallboxModel: model,
        wallboxName: formState.deviceName.trim(),
        wallboxSn: formState.sn.trim(),
      });
    } else {
      const model = (formState.model ?? '').trim();
      await saveInstallerInverter({
        batteryType: model,
        installerStationId: props.installerStationId ?? '',
        inverterName: formState.deviceName.trim(),
        inverterSn: formState.sn.trim(),
        inverterType: model,
        pvPower: Number(formState.pvPower),
      });
    }

    message.success('新增设备成功');
    emit('success');
    closeModal();
  } finally {
    submitting.value = false;
  }
}

watch(
  () => props.open,
  (open) => {
    if (open) {
      resetForm();
      void fetchModelOptions(formState.deviceType);
    }
  },
);

watch(
  () => formState.deviceType,
  (type) => {
    formState.model = undefined;
    if (props.open) {
      void fetchModelOptions(type);
    }
  },
);
</script>

<template>
  <Modal
    :open="open"
    title="新增设备"
    :confirm-loading="submitting"
    :mask-closable="false"
    width="560px"
    @cancel="closeModal"
  >
    <Form
      layout="horizontal"
      class="pt-2"
      :label-col="{ style: { width: '92px' } }"
      :wrapper-col="{ style: { flex: 1 } }"
      label-align="left"
    >
      <Form.Item label="设备类型" required>
        <Select v-model:value="formState.deviceType" :options="typeOptions" />
      </Form.Item>

      <Form.Item :label="snLabel" required>
        <Input v-model:value="formState.sn" placeholder="Input..." />
      </Form.Item>

      <Form.Item :label="modelLabel" required>
        <Select
          v-model:value="formState.model"
          :options="modelOptions"
          :loading="modelOptionsLoading"
          show-search
          :filter-option="true"
          option-filter-prop="label"
          :placeholder="`请选择${modelLabel}`"
        />
      </Form.Item>

      <Form.Item :label="nameLabel" required>
        <Input v-model:value="formState.deviceName" placeholder="Input..." />
      </Form.Item>

      <Form.Item v-if="showPvPower" label="PV装机容量" required>
        <InputNumber
          v-model:value="formState.pvPower"
          :min="0"
          :precision="2"
          style="width: 100%"
          class="w-full"
          placeholder="Input..."
        />
      </Form.Item>
    </Form>

    <template #footer>
      <Button @click="closeModal">取消</Button>
      <Button type="primary" :loading="submitting" @click="handleSubmit">
        确认
      </Button>
    </template>
  </Modal>
</template>
