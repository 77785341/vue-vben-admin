<script lang="ts" setup>
import { Card } from 'ant-design-vue';

defineProps<{
  batteryGroups: any[];
  deviceInfo: any;
}>();
</script>

<template>
  <div>
    <div class="mb-4">
      <Card size="small" :body-style="{ padding: '12px' }">
        <div class="font-bold mb-2">Data Logger</div>
        <div class="flex flex-wrap">
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">SN：</span>
            <span style="color: #6c7680">{{
              deviceInfo?.collectionSn || '--'
            }}</span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">Last reported time：</span>
            <span style="color: #6c7680">{{
              deviceInfo?.sendTime || '--'
            }}</span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">Current total power：</span>
            <span style="color: #6c7680">{{ deviceInfo?.p7 ?? '--' }}</span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">Hardware version：</span>
            <span style="color: #6c7680">{{ deviceInfo?.s4 || '--' }}</span>
          </Card.Grid>
        </div>
      </Card>
    </div>
    <div class="mb-4">
      <Card size="small" :body-style="{ padding: '12px' }">
        <div class="font-bold mb-2">Inverter</div>
        <div class="flex flex-wrap">
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">SN：</span>
            <span style="color: #6c7680">{{
              deviceInfo?.inverterSn ?? '--'
            }}</span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">Rated power：</span>
            <span style="color: #6c7680">{{ deviceInfo?.p7 ?? '--' }}</span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">Main ARM software version：</span>
            <span style="color: #6c7680">{{ deviceInfo?.p12 ?? '--' }}</span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">ARM auxiliary software version：</span>
            <span style="color: #6c7680">{{ deviceInfo?.p20 ?? '--' }}</span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">Main DSP software version：</span>
            <span style="color: #6c7680">{{ deviceInfo?.p18 ?? '--' }}</span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">Auxiliary DSP software version：</span>
            <span style="color: #6c7680">{{
              deviceInfo?.auxiliaryDspSoftwareVersion ?? '--'
            }}</span>
          </Card.Grid>
        </div>
      </Card>
    </div>
    <div class="mb-4">
      <Card size="small" :body-style="{ padding: '12px' }">
        <div class="font-bold mb-2">PV Module</div>
        <div class="flex flex-wrap">
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">Installed capacity：</span>
            <span style="color: #6c7680">{{
              deviceInfo?.capacity ?? '--'
            }}</span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">MPPT Channels：</span>
            <span style="color: #6c7680">{{ deviceInfo?.p6 ?? '--' }}</span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">Current total power：</span>
            <span style="color: #6c7680">{{ deviceInfo?.p42 ?? '--' }}</span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">Total power generation：</span>
            <span style="color: #6c7680">{{ deviceInfo?.p196 ?? '--' }}</span>
          </Card.Grid>
        </div>
        <div style="width: 100%; margin-top: 1rem">
          <table
            class="w-full text-center text-xs"
            style="font-size: 0.875rem; border-collapse: collapse; border: none"
          >
            <thead style="color: #839bb3; background-color: #f1f8ff">
              <tr style="height: 2rem">
                <th
                  style="
                    padding: 0.5rem;
                    border-top: none;
                    border-right: none;
                    border-bottom: 1px solid #e4e9f2;
                    border-left: none;
                  "
                >
                  名称
                </th>
                <th
                  style="
                    padding: 0.5rem;
                    border-top: none;
                    border-right: none;
                    border-bottom: 1px solid #e4e9f2;
                    border-left: none;
                  "
                >
                  Voltage (V)
                </th>
                <th
                  style="
                    padding: 0.5rem;
                    border-top: none;
                    border-right: none;
                    border-bottom: 1px solid #e4e9f2;
                    border-left: none;
                  "
                >
                  Current (A)
                </th>
                <th
                  style="
                    padding: 0.5rem;
                    border-top: none;
                    border-right: none;
                    border-bottom: 1px solid #e4e9f2;
                    border-left: none;
                  "
                >
                  Power(kW)
                </th>
              </tr>
            </thead>
            <tbody style="color: #6c7680; background-color: #fbfdff">
              <tr style="height: 2rem">
                <td
                  style="
                    padding: 0.5rem;
                    border-top: 1px solid #e4e9f2;
                    border-right: none;
                    border-bottom: 1px solid #e4e9f2;
                    border-left: none;
                  "
                >
                  PV1
                </td>
                <td
                  style="
                    padding: 0.5rem;
                    border-top: 1px solid #e4e9f2;
                    border-right: none;
                    border-bottom: 1px solid #e4e9f2;
                    border-left: none;
                  "
                >
                  {{ deviceInfo?.p43 ?? '--' }}
                </td>
                <td
                  style="
                    padding: 0.5rem;
                    border-top: 1px solid #e4e9f2;
                    border-right: none;
                    border-bottom: 1px solid #e4e9f2;
                    border-left: none;
                  "
                >
                  {{ deviceInfo?.p44 ?? '--' }}
                </td>
                <td
                  style="
                    padding: 0.5rem;
                    border-top: 1px solid #e4e9f2;
                    border-right: none;
                    border-bottom: 1px solid #e4e9f2;
                    border-left: none;
                  "
                >
                  {{ deviceInfo?.power1 ?? '--' }}
                </td>
              </tr>
              <tr style="height: 2rem">
                <td
                  style="
                    padding: 0.5rem;
                    border-top: 1px solid #e4e9f2;
                    border-right: none;
                    border-bottom: none;
                    border-left: none;
                  "
                >
                  PV2
                </td>
                <td
                  style="
                    padding: 0.5rem;
                    border-top: 1px solid #e4e9f2;
                    border-right: none;
                    border-bottom: none;
                    border-left: none;
                  "
                >
                  {{ deviceInfo?.p45 ?? '--' }}
                </td>
                <td
                  style="
                    padding: 0.5rem;
                    border-top: 1px solid #e4e9f2;
                    border-right: none;
                    border-bottom: none;
                    border-left: none;
                  "
                >
                  {{ deviceInfo?.p46 ?? '--' }}
                </td>
                <td
                  style="
                    padding: 0.5rem;
                    border-top: 1px solid #e4e9f2;
                    border-right: none;
                    border-bottom: none;
                    border-left: none;
                  "
                >
                  {{ deviceInfo?.power2 ?? '--' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
    <div class="mb-4">
      <Card size="small" :body-style="{ padding: '12px' }">
        <div class="font-bold mb-2">Electricity meter</div>
        <div class="flex flex-wrap">
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">Available status:</span>
            <span
              :style="{
                color: deviceInfo?.e2 !== 0 ? '#4CAF50' : '#6C7680',
              }"
            >
              {{ deviceInfo?.e2 !== 0 ? 'Available' : 'Unavailable' }}
            </span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">Total electricity purchased:</span>
            <span style="color: #6c7680">{{ deviceInfo?.e43 ?? '--' }}</span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">Total electricity sales:</span>
            <span style="color: #6c7680">{{ deviceInfo?.e44 ?? '--' }}</span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">Current power:</span>
            <span style="color: #6c7680">{{ deviceInfo?.e19 ?? '--' }}</span>
          </Card.Grid>
        </div>
        <div style="width: 100%; margin-top: 1rem">
          <table
            class="w-full text-center text-xs"
            style="font-size: 0.875rem; border-collapse: collapse; border: none"
          >
            <thead style="color: #839bb3; background-color: #f1f8ff">
              <tr style="height: 2rem">
                <th
                  style="
                    padding: 0.5rem;
                    border-top: none;
                    border-right: none;
                    border-bottom: 1px solid #e4e9f2;
                    border-left: none;
                  "
                >
                  名称
                </th>
                <th
                  style="
                    padding: 0.5rem;
                    border-top: none;
                    border-right: none;
                    border-bottom: 1px solid #e4e9f2;
                    border-left: none;
                  "
                >
                  Voltage (V)
                </th>
                <th
                  style="
                    padding: 0.5rem;
                    border-top: none;
                    border-right: none;
                    border-bottom: 1px solid #e4e9f2;
                    border-left: none;
                  "
                >
                  Current (A)
                </th>
                <th
                  style="
                    padding: 0.5rem;
                    border-top: none;
                    border-right: none;
                    border-bottom: 1px solid #e4e9f2;
                    border-left: none;
                  "
                >
                  Frequency(Hz)
                </th>
              </tr>
            </thead>
            <tbody style="color: #6c7680; background-color: #fbfdff">
              <tr style="height: 2rem">
                <td
                  style="
                    padding: 0.5rem;
                    border-top: 1px solid #e4e9f2;
                    border-right: none;
                    border-bottom: 1px solid #e4e9f2;
                    border-left: none;
                  "
                >
                  Phase A
                </td>
                <td
                  style="
                    padding: 0.5rem;
                    border-top: 1px solid #e4e9f2;
                    border-right: none;
                    border-bottom: 1px solid #e4e9f2;
                    border-left: none;
                  "
                >
                  {{ deviceInfo?.e4 ?? '--' }}
                </td>
                <td
                  style="
                    padding: 0.5rem;
                    border-top: 1px solid #e4e9f2;
                    border-right: none;
                    border-bottom: 1px solid #e4e9f2;
                    border-left: none;
                  "
                >
                  {{ deviceInfo?.e7 ?? '--' }}
                </td>
                <td
                  style="
                    padding: 0.5rem;
                    border-top: 1px solid #e4e9f2;
                    border-right: none;
                    border-bottom: 1px solid #e4e9f2;
                    border-left: none;
                  "
                >
                  {{ deviceInfo?.e16 ?? '--' }}
                </td>
              </tr>
              <tr style="height: 2rem">
                <td
                  style="
                    padding: 0.5rem;
                    border-top: 1px solid #e4e9f2;
                    border-right: none;
                    border-bottom: 1px solid #e4e9f2;
                    border-left: none;
                  "
                >
                  Phase B
                </td>
                <td
                  style="
                    padding: 0.5rem;
                    border-top: 1px solid #e4e9f2;
                    border-right: none;
                    border-bottom: 1px solid #e4e9f2;
                    border-left: none;
                  "
                >
                  {{ deviceInfo?.e5 ?? '--' }}
                </td>
                <td
                  style="
                    padding: 0.5rem;
                    border-top: 1px solid #e4e9f2;
                    border-right: none;
                    border-bottom: 1px solid #e4e9f2;
                    border-left: none;
                  "
                >
                  {{ deviceInfo?.e8 ?? '--' }}
                </td>
                <td
                  style="
                    padding: 0.5rem;
                    border-top: 1px solid #e4e9f2;
                    border-right: none;
                    border-bottom: 1px solid #e4e9f2;
                    border-left: none;
                  "
                >
                  {{ deviceInfo?.e16 ?? '--' }}
                </td>
              </tr>
              <tr style="height: 2rem">
                <td
                  style="
                    padding: 0.5rem;
                    border-top: 1px solid #e4e9f2;
                    border-right: none;
                    border-bottom: none;
                    border-left: none;
                  "
                >
                  Phase C
                </td>
                <td
                  style="
                    padding: 0.5rem;
                    border-top: 1px solid #e4e9f2;
                    border-right: none;
                    border-bottom: none;
                    border-left: none;
                  "
                >
                  {{ deviceInfo?.e6 ?? '--' }}
                </td>
                <td
                  style="
                    padding: 0.5rem;
                    border-top: 1px solid #e4e9f2;
                    border-right: none;
                    border-bottom: none;
                    border-left: none;
                  "
                >
                  {{ deviceInfo?.e9 ?? '--' }}
                </td>
                <td
                  style="
                    padding: 0.5rem;
                    border-top: 1px solid #e4e9f2;
                    border-right: none;
                    border-bottom: none;
                    border-left: none;
                  "
                >
                  {{ deviceInfo?.e16 ?? '--' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
    <div class="mb-4">
      <Card size="small" :body-style="{ padding: '12px' }">
        <div class="font-bold mb-2">Battery</div>
        <div class="flex flex-wrap">
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">Online status：</span>
            <span
              :style="{
                color: deviceInfo?.b36 !== 0 ? '#4CAF50' : '#6C7680',
              }"
            >
              {{ deviceInfo?.b36 !== 0 ? '● Online' : '● Offline' }}
            </span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">SN：</span>
            <span style="color: #6c7680">{{
              deviceInfo?.batterySn ?? '--'
            }}</span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">BMS version：</span>
            <span style="color: #6c7680">{{ deviceInfo?.b6 ?? '--' }}</span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">Battery capacity：</span>
            <span style="color: #6c7680">{{ deviceInfo?.b22 ?? '--' }}</span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">Battery cycle count：</span>
            <span style="color: #6c7680">{{ deviceInfo?.b5 ?? '--' }}</span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">Battery SOH：</span>
            <span style="color: #6c7680">{{ deviceInfo?.b8 ?? '--' }} %</span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">Battery SOC：</span>
            <span style="color: #6c7680">{{ deviceInfo?.b7 ?? '--' }} %</span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">Battery voltage：</span>
            <span style="color: #6c7680">{{ deviceInfo?.b9 ?? '--' }} V</span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">Charging current：</span>
            <span style="color: #6c7680">{{ deviceInfo?.b10 ?? '--' }} A</span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">Discharge current：</span>
            <span style="color: #6c7680">{{ deviceInfo?.b11 ?? '--' }} A</span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">Battery temperature：</span>
            <span style="color: #6c7680">{{ deviceInfo?.b4 ?? '--' }} ℃ </span>
          </Card.Grid>
          <Card.Grid style="width: 33.33%; padding: 0; box-shadow: none">
            <span style="color: #9ea8b2">BMS motherboard temperature：</span>
            <span style="color: #6c7680">{{ deviceInfo?.b21 ?? '--' }} ℃</span>
          </Card.Grid>
        </div>
        <div style="width: 100%; margin-top: 1rem">
          <div v-if="batteryGroups.length > 0">
            <div
              v-for="(battery, batteryIdx) in batteryGroups"
              :key="batteryIdx"
              class="mb-4"
            >
              <div class="font-bold mb-2">电池{{ batteryIdx + 1 }}</div>
              <div
                v-for="(table, tableIdx) in battery"
                :key="tableIdx"
                class="mb-4"
              >
                <div style="width: 100%; overflow-x: auto">
                  <table
                    class="min-w-full text-center text-xs"
                    style="
                      font-size: 0.875rem;
                      border-collapse: collapse;
                      border: none;
                    "
                  >
                    <thead style="color: #839bb3; background-color: #f1f8ff">
                      <tr style="height: 2rem">
                        <th
                          style="
                            padding: 0.5rem;
                            border-top: none;
                            border-right: none;
                            border-bottom: 1px solid #e4e9f2;
                            border-left: none;
                          "
                        >
                          Cells
                        </th>
                        <th
                          v-for="cell in table"
                          :key="cell.cellIndex"
                          style="
                            padding: 0.5rem;
                            border-top: none;
                            border-right: none;
                            border-bottom: 1px solid #e4e9f2;
                            border-left: none;
                          "
                        >
                          {{ cell.cellIndex.toUpperCase() }}
                        </th>
                      </tr>
                    </thead>
                    <tbody style="color: #6c7680; background-color: #fbfdff">
                      <tr style="height: 2rem">
                        <td
                          style="
                            padding: 0.5rem;
                            border-top: 1px solid #e4e9f2;
                            border-right: none;
                            border-bottom: 1px solid #e4e9f2;
                            border-left: none;
                          "
                        >
                          V
                        </td>
                        <td
                          v-for="cell in table"
                          :key="`${cell.cellIndex}-v`"
                          style="
                            padding: 0.5rem;
                            border-top: 1px solid #e4e9f2;
                            border-right: none;
                            border-bottom: 1px solid #e4e9f2;
                            border-left: none;
                          "
                        >
                          {{ cell.cellVoltage }}
                        </td>
                      </tr>
                      <tr style="height: 2rem">
                        <td
                          style="
                            padding: 0.5rem;
                            border-top: 1px solid #e4e9f2;
                            border-right: none;
                            border-bottom: none;
                            border-left: none;
                          "
                        >
                          ℃
                        </td>
                        <td
                          v-for="cell in table"
                          :key="`${cell.cellIndex}-t`"
                          style="
                            padding: 0.5rem;
                            border-top: 1px solid #e4e9f2;
                            border-right: none;
                            border-bottom: none;
                            border-left: none;
                          "
                        >
                          {{ cell.cellTemperature }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
