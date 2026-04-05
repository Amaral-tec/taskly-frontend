export enum StatusType {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED'
}

export const StatusDisplayMap: Record<StatusType, string> = {
  [StatusType.SCHEDULED]: 'Scheduled',
  [StatusType.CONFIRMED]: 'Confirmed',
  [StatusType.COMPLETED]: 'Completed',
  [StatusType.CANCELED]: 'Canceled'
};

export const statusOptions = Object.values(StatusType);
