import type { FaultTab } from '../../types';

export function useFaultInfoPanelLogic(
  emit: (event: 'update:currentFaultTab', value: FaultTab) => void,
) {
  function updateCurrentFaultTab(value: number | string) {
    emit('update:currentFaultTab', value as FaultTab);
  }

  return {
    updateCurrentFaultTab,
  };
}
