import { getAvailableClubs, printAvailableClubs } from "./src/clubs";

async function main() {
  try {
    const days = getNextDays();

    days.forEach(async (day) => {
      const availableCLubs = await getAvailableClubs(day);
      printAvailableClubs(availableCLubs);
    });
  } catch (error) {
    console.error(error);
  }
}

function getNextDays(numberOfDays = 1): string[] {
  return Array.from({ length: numberOfDays }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split("T")[0];
  });
}

main();
