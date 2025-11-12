/**
 * Contrato Keynua API
 * @see {@link https://docs.keynua.com/}
 *
 */
export interface Contract {
  id: string
  accountId: string
  sentBy: string
  templateId: string
  createdAt: string
  startedAt: string
  finishedAt: string | null
  deletedAt: string | null
  canceledAt: string | null
  title: string
  description: string
  language: string
  timezone: string
  metadata: Record<string, unknown>
  reference: string
  shortCode: string
  expirationInHours: number
  expired: boolean
  itemsCount: number
  groups: ContractGroup[]
  users: ContractUser[]
  documents: ContractDocument[]
  items: ContractItem[]
  status: string
}

/**
 * Grupo dentro del contrato, como "Firmantes"
 */
export interface ContractGroup {
  id: string
  name: string
  description: string
  icon: string
  digitalSignature: boolean
  bulk: boolean
  isApprover: boolean
}

/**
 * Usuario (firmante o aprobador)
 */
export interface ContractUser {
  id: number
  ref: string | null
  name: string
  email?: string
  phone?: string
  groups: string[]
  attempts: ContractUserAttempts
  token: string
  state: string
}

export interface ContractUserAttempts {
  max: number
  current: number
}

/**
 * Documento asociado al contrato
 */
export interface ContractDocument {
  id: number
  name: string
  ext: string
  sha: string
  size: number
  type: string
  url: string
}

/**
 * Item (tarea o proceso automatizado dentro del flujo del contrato)
 */
export interface ContractItem {
  id: number
  version: number
  state: string
  userId: number | null
  reference: string
  title: string
  type: string
  stageIndex: number
  allowsManualUpdate: boolean
  allowsRetry: boolean
  hideOnWebApp: boolean
}
