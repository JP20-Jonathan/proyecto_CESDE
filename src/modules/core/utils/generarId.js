// El backend usa UUID como id, aquí se genera uno igual
export function generarId() {
  return crypto.randomUUID()
}
