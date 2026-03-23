<script lang="ts" setup>
import type { FamilyApi } from '#/api/family/family';

import { onMounted, reactive, ref } from 'vue';
// 路由跳转页面带着row的id
// import { useRouter } from 'vue-router';

import { Page, useVbenDrawer, useVbenForm } from '@vben/common-ui';

import { Button, message } from 'ant-design-vue';

import { getFamilyList } from '#/api';

import { useGridFormSchema } from './data';
import Form from './modules/form.vue';

// const router = useRouter();
const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: Form,
  destroyOnClose: true,
});

// 搜索表单配置

const [SearchForm, searchFormApi] = useVbenForm({
  schema: useGridFormSchema(),
  submitOnChange: false,
  layout: 'inline',
  wrapperClass: 'grid-cols-4 pb-0',
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'grid-cols-4',
    },
    formItemClass: 'grid-cols-4 pb-0',
    hideLabel: true,
  },
  showDefaultActions: true,
  resetButtonOptions: {
    content: '重置',
  },
  submitButtonOptions: {
    content: '查询',
  },
  actionWrapperClass: 'pb-0',
});

// 家庭列表数据
const familyList = ref<FamilyApi.Family[]>([]);
const loading = ref(false);
const pagination = reactive({
  currentPage: 1,
  pageSize: 12,
  total: 0,
});

// 获取家庭列表
async function fetchFamilyList() {
  try {
    loading.value = true;
    const formValues = await searchFormApi.getValues();
    const response = await getFamilyList({
      pageNum: pagination.currentPage,
      pageSize: pagination.pageSize,
      ...formValues,
    });
    familyList.value = response.items || [];
    pagination.total = response.total || 0;
  } catch (error) {
    console.error('获取家庭列表失败:', error);
    message.error('获取家庭列表失败');
  } finally {
    loading.value = false;
  }
}

// 新增家庭
function onCreate() {
  formDrawerApi.setData({}).open();
}

// 组件挂载时获取数据
onMounted(() => {
  fetchFamilyList();
});
</script>
<template>
  <Page auto-content-height>
    <FormDrawer @success="fetchFamilyList" />

    <!-- 搜索栏 -->
    <div class="mb-4">
      <div class="flex items-center">
        <SearchForm>
          <template #submit-before>
            <Button type="primary" @click="onCreate">添加</Button>
          </template>
        </SearchForm>
      </div>
    </div>
    <div></div>
  </Page>
</template>
