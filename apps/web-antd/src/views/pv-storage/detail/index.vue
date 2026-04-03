<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import { Card, Modal, Spin, Tabs } from 'ant-design-vue';

import BaseInfoPanel from './components/BaseInfoPanel.vue';
import ControlPanel from './components/ControlPanel.vue';
import FaultInfoPanel from './components/FaultInfoPanel.vue';
import LeftInfoCard from './components/LeftInfoCard.vue';
import { usePvStorageDetail } from './logic/usePvStorageDetail';

const { TabPane } = Tabs;

const {
  activeTab,
  batteryForm,
  batteryGroups,
  batteryModelOptions,
  controlLoading,
  controlTab,
  controlTabs,
  currentFaultTab,
  deviceInfo,
  faultDetailRow,
  faultDetailVisible,
  faultTabs,
  feederPowerLimitOptions,
  goBack,
  HistoryFaultGrid,
  leftBindIndicator,
  leftSideInfo,
  leftStatusIndicator,
  meterForm,
  meterModelOptions,
  onControlCancel,
  onControlConfirm,
  onTabChange,
  RealtimeFaultGrid,
  systemForm,
  systemGridIntegrationStandardsOptions,
  systemPvConnectionModeOptions,
  systemWorkModeOptions,
} = usePvStorageDetail();
</script>

<template>
  <Page auto-content-height>
    <Spin :spinning="controlLoading" tip="Loading...">
      <div class="mb-4">
        <img
          src="/images/icon/detail-back@2x.png"
          alt="back"
          class="inline-block h-7 w-7 cursor-pointer object-contain"
          @click="goBack"
        />
      </div>
      <div class="flex gap-6">
        <LeftInfoCard
          :left-bind-indicator="leftBindIndicator"
          :left-side-info="leftSideInfo"
          :left-status-indicator="leftStatusIndicator"
        />
        <!-- 右侧Tab信息栏 -->
        <div class="flex-1 min-w-0">
          <Card :body-style="{ paddingTop: 0 }">
            <Tabs
              v-model:active-key="activeTab"
              class="mb-0"
              @change="onTabChange"
            >
              <TabPane key="base" tab="基本信息">
                <BaseInfoPanel
                  :device-info="deviceInfo"
                  :battery-groups="batteryGroups"
                />
              </TabPane>
              <TabPane key="fault" tab="故障信息">
                <FaultInfoPanel
                  :active-tab="activeTab"
                  :current-fault-tab="currentFaultTab"
                  :fault-tabs="faultTabs"
                  :history-fault-grid="HistoryFaultGrid"
                  :realtime-fault-grid="RealtimeFaultGrid"
                  @update:current-fault-tab="
                    (value) => (currentFaultTab = value)
                  "
                />
              </TabPane>
              <TabPane key="control" tab="设备控制">
                <ControlPanel
                  :active-tab="activeTab"
                  :control-tab="controlTab"
                  :control-tabs="controlTabs"
                  :system-form="systemForm"
                  :meter-form="meterForm"
                  :battery-form="batteryForm"
                  :system-pv-connection-mode-options="
                    systemPvConnectionModeOptions
                  "
                  :system-work-mode-options="systemWorkModeOptions"
                  :system-grid-integration-standards-options="
                    systemGridIntegrationStandardsOptions
                  "
                  :meter-model-options="meterModelOptions"
                  :feeder-power-limit-options="feederPowerLimitOptions"
                  :battery-model-options="batteryModelOptions"
                  :on-control-cancel="onControlCancel"
                  :on-control-confirm="onControlConfirm"
                  @update:system-form="
                    (value) => Object.assign(systemForm, value)
                  "
                  @update:meter-form="
                    (value) => Object.assign(meterForm, value)
                  "
                  @update:battery-form="
                    (value) => Object.assign(batteryForm, value)
                  "
                  @update:control-tab="(value) => (controlTab = value)"
                />
              </TabPane>
            </Tabs>
          </Card>
        </div>
      </div>

      <!-- 故障描述弹窗 -->
      <Modal
        v-model:open="faultDetailVisible"
        :footer="null"
        width="420px"
        :body-style="{ padding: '0 24px 24px' }"
      >
        <template #title>
          <div class="flex items-center gap-2">
            <img
              src="/images/icon/fault-info@2x.png"
              alt="fault"
              class="h-5 w-5 object-contain"
            />
            <span class="text-base font-semibold">{{
              faultDetailRow?.faultName ?? '--'
            }}</span>
          </div>
        </template>
        <div v-if="faultDetailRow" class="flex flex-col gap-4 pt-2">
          <div class="rounded-md bg-gray-50 p-4">
            <div class="mb-1 text-sm font-medium text-gray-700">
              Description:
            </div>
            <div class="text-sm text-gray-500">
              {{ faultDetailRow.descEn ?? '--' }}
            </div>
          </div>
          <div class="rounded-md bg-gray-50 p-4">
            <div class="mb-1 text-sm font-medium text-gray-700">Solution:</div>
            <div class="whitespace-pre-line text-sm text-gray-500">
              {{ faultDetailRow.solutionEn ?? '--' }}
            </div>
          </div>
        </div>
      </Modal>
    </Spin>
  </Page>
</template>

<style scoped>
.fault-tab-segmented :deep(.ant-segmented-item-selected) {
  background-color: #237ebc;
}

.fault-tab-segmented
  :deep(.ant-segmented-item-selected .ant-segmented-item-label) {
  color: #fff;
}

.control-tab-segmented :deep(.ant-segmented-item-selected) {
  background-color: #237ebc;
}

.control-tab-segmented
  :deep(.ant-segmented-item-selected .ant-segmented-item-label) {
  color: #fff;
}

.fault-grid-panel :deep(.relative.rounded-sm.py-3) {
  padding-top: 0;
}
</style>
