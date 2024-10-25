function generateId(prefix: string | undefined): string {
	return `${prefix || "id"}-${Math.random().toString(36).substr(2, 9)}`;
}

export { generateId };
