export const checkDaysSincePublication = (date: string) => {
  const pastDate = new Date(date); // Converte a string para um objeto Date
  const currentDate = new Date(); // Data atual

  const diffInMs = Math.abs(currentDate.getTime() - pastDate.getTime()); // Diferença em milissegundos
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)); // Converter para dias

  return diffInDays;
};
