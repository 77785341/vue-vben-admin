<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page, useVbenDrawer } from '@vben/common-ui';

import { Button, Descriptions, message } from 'ant-design-vue';

import { getFamilyById } from '#/api/family/family';
import { $t } from '#/locales';

import Form from './modules/form.vue';

// 获取路由参数
const route = useRoute();
const familyId = ref<string>('');
const familyData = ref<any>(null);
const loading = ref(true);

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: Form,
  destroyOnClose: true,
});

// 获取家庭详情
async function fetchFamilyDetail() {
  try {
    loading.value = true;
    const id = route.query.id as string;
    if (!id) {
      message.error('家庭ID不存在');
      return;
    }
    familyId.value = id;
    const response = await getFamilyById(id);
    familyData.value = response;
  } catch (error) {
    console.error('获取家庭详情失败:', error);
    message.error('获取家庭详情失败');
  } finally {
    loading.value = false;
  }
}

// 编辑家庭信息
function onEdit() {
  formDrawerApi.setData(familyData.value).open();
}

// 处理编辑成功
function onEditSuccess() {
  fetchFamilyDetail();
}

// 组件挂载时获取家庭详情
onMounted(() => {
  fetchFamilyDetail();
});
</script>
<template>
  <Page auto-content-height>
    <FormDrawer @success="onEditSuccess" />
    <div class="p-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">{{ $t('page.family.detail') }}</h2>
        <Button type="primary" @click="onEdit">
          {{ $t('common.edit') }}
        </Button>
      </div>

      <Descriptions title="家庭基本信息" bordered v-if="familyData">
        <Descriptions.Item label="家庭名称">
{{
          familyData.familyName
        }}
</Descriptions.Item>
        <Descriptions.Item label="联系人">
{{
          familyData.contactName
        }}
</Descriptions.Item>
        <Descriptions.Item label="联系电话">
{{
          familyData.contactPhone
        }}
</Descriptions.Item>
        <Descriptions.Item label="地址">
{{
          familyData.address
        }}
</Descriptions.Item>
        <Descriptions.Item label="状态">
          <span v-if="familyData.status === 'on'" class="text-green-500">{{
            $t('common.enabled')
          }}</span>
          <span v-else class="text-red-500">{{ $t('common.disabled') }}</span>
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">
{{
          familyData.createTime
        }}
</Descriptions.Item>
      </Descriptions>
    </div>
  </Page>
</template>
