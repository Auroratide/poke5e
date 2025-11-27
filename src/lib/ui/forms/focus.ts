export function focusInputField(id: string) {
	setTimeout(() => {
		document.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(`#${id}-input`)?.focus()
	}, 50)
}
