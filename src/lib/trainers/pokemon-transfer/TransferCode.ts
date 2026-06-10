export type TransferCode = string

// For presentational consistency, I have T.* just to differentiate it from fakemon and trainer ids.
export const TransferCode = {
	from: (raw: string): TransferCode => `T.${raw}`,
	raw: (code: TransferCode): string => code.substring(2),
} as const
