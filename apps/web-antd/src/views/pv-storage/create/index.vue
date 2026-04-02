<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';

import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  message,
  Select,
} from 'ant-design-vue';

const router = useRouter();

const formState = reactive({
  installer: '',
  plantName: '',
  powerKw: undefined as number | undefined,
  status: 'online',
  address: '',
});

function onSubmit() {
  message.success('创建成功（示例页，未接真实接口）');
  router.push({ path: '/pv-storage' });
}

function onCancel() {
  router.push({ path: '/pv-storage' });
}
</script>

<template>
  <Page auto-content-height>
    <Card>
      <div class="mb-3 text-lg font-semibold">新建光储管理</div>

      <Form layout="vertical" :model="formState">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Form.Item label="安装商" required>
            <Input
              v-model:value="formState.installer"
              placeholder="请输入安装商"
            />
          </Form.Item>

          <Form.Item label="电站名称" required>
            <Input
              v-model:value="formState.plantName"
              placeholder="请输入电站名称"
            />
          </Form.Item>

          <Form.Item label="装机功率(kW)" required>
            <InputNumber
              v-model:value="formState.powerKw"
              :min="0"
              :precision="1"
              class="w-full"
              placeholder="请输入功率"
            />
          </Form.Item>

          <Form.Item label="状态" required>
            <Select
              v-model:value="formState.status"
              :options="[
                { label: '在线', value: 'online' },
                { label: '离线', value: 'offline' },
              ]"
            />
          </Form.Item>
        </div>

        <Form.Item label="地址">
          <Input v-model:value="formState.address" placeholder="请输入地址" />
        </Form.Item>

        <div class="flex items-center gap-3">
          <Button type="primary" @click="onSubmit">提交</Button>
          <Button @click="onCancel">取消</Button>
        </div>
      </Form>
    </Card>
  </Page>
</template>
