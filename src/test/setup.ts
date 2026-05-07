import '@testing-library/jest-dom'
import { vi } from 'vitest'

// compatibility shim for legacy jest-style tests
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(globalThis as any).jest = vi
