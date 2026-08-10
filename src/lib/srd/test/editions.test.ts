import { test, expect } from "vitest"
import { chooseEditionData } from "../editions"

const data = (id: string, name: string | undefined | null, age: number | undefined | null) => ({
	id, name, age,
})

test("overrides the values according to edition", () => {
	const values2024 = [
		data("renibel", "Renibel", 16),
		data("iris", "Iris", 22),
		data("blis", "Blis", 18),
	]

	const values2018 = [
		data("renibel", "Renibel", 10),
		data("iris", "Iris", 16),
		data("blis", "Blis", 12),
	]

	const result2024 = chooseEditionData("2024", values2024, {
		"2018": values2018,
	})

	expect(result2024).toEqual([
		data("renibel", "Renibel", 16),
		data("iris", "Iris", 22),
		data("blis", "Blis", 18),
	])

	const result2018 = chooseEditionData("2018", values2024, {
		"2018": values2018,
	})

	expect(result2018).toEqual([
		data("renibel", "Renibel", 10),
		data("iris", "Iris", 16),
		data("blis", "Blis", 12),
	])
})

test("edition data not provided", () => {
	const values2024 = [
		data("renibel", "Renibel", 16),
		data("iris", "Iris", 22),
		data("blis", "Blis", 18),
	]

	const result2024 = chooseEditionData("2024", values2024, {})

	expect(result2024).toEqual([
		data("renibel", "Renibel", 16),
		data("iris", "Iris", 22),
		data("blis", "Blis", 18),
	])

	const result2018 = chooseEditionData("2018", values2024, {})

	expect(result2018).toEqual([
		data("renibel", "Renibel", 16),
		data("iris", "Iris", 22),
		data("blis", "Blis", 18),
	])
})

test("unspecified values are inherited", () => {
	const values2024 = [
		data("renibel", "Renibel", 16),
		data("iris", "Iris", 22),
		data("blis", "Blis", 18),
	]

	const values2018 = [
		data("renibel", undefined, 10),
		data("iris", undefined, 16),
		data("blis", undefined, 12),
	]

	const result2024 = chooseEditionData("2024", values2024, {
		"2018": values2018,
	})

	expect(result2024).toEqual([
		data("renibel", "Renibel", 16),
		data("iris", "Iris", 22),
		data("blis", "Blis", 18),
	])

	const result2018 = chooseEditionData("2018", values2024, {
		"2018": values2018,
	})

	expect(result2018).toEqual([
		data("renibel", "Renibel", 10),
		data("iris", "Iris", 16),
		data("blis", "Blis", 12),
	])
})

test("some values are deleted in the edition", () => {
	const values2024 = [
		data("renibel", "Renibel", 16),
		data("iris", "Iris", 22),
		data("blis", "Blis", 18),
	]

	const values2018 = [
		data("renibel", "Renibel", null),
		data("iris", "Iris", null),
		data("blis", "Blis", null),
	]

	const result2024 = chooseEditionData("2024", values2024, {
		"2018": values2018,
	})

	expect(result2024).toEqual([
		data("renibel", "Renibel", 16),
		data("iris", "Iris", 22),
		data("blis", "Blis", 18),
	])

	const result2018 = chooseEditionData("2018", values2024, {
		"2018": values2018,
	})

	expect(result2018).toEqual([
		data("renibel", "Renibel", undefined),
		data("iris", "Iris", undefined),
		data("blis", "Blis", undefined),
	])
})
