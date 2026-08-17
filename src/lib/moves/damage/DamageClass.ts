export type DamageDice = `${number}d${number}`
export type DamageClass = [DamageDice, DamageDice, DamageDice, DamageDice]

const InvalidDamageClass: DamageClass = ["0d4", "0d4", "0d4", "0d4"]

const DamageClasses: Record<string, DamageClass> = {
	"0": ["1d4", "1d6", "1d8", "1d10"],
	"10": ["1d4", "1d6", "1d8", "2d6"],
	"20": ["1d4", "2d4", "1d12", "4d4"],
	"30": ["1d6", "1d10", "2d8", "5d4"],
	"40": ["1d6", "1d12", "2d8", "4d6"],
	"50": ["1d8", "2d6", "4d4", "3d10"],
	"60": ["1d10", "2d8", "5d4", "4d8"],
	"70": ["1d12", "2d8", "2d12", "6d6"],
	"80": ["2d6", "2d8", "4d6", "6d6"],
	"90": ["2d8", "2d10", "3d10", "4d12"],
	"100": ["4d4", "2d12", "4d8", "8d6"],
	"110": ["3d6", "3d8", "6d6", "7d8"],
	"120": ["2d10", "3d8", "4d10", "7d8"],
	"130": ["5d4", "3d10", "5d8", "8d8"],
	"140": ["2d12", "3d10", "7d6", "8d8"],
	"150": ["3d8", "5d6", "4d12", "8d8"],
	"160": ["4d6", "5d6", "6d8", "6d12"],
	"180": ["3d10", "6d6", "8d6", "7d12"],
	"200": ["5d6", "4d10", "6d10", "8d12"],
}

export const DamageClass = {
	get: (cl: string): DamageClass => DamageClasses[cl] ?? InvalidDamageClass,
}
