import { getAvailableClubs, printAvailableClubs } from "./src/clubs";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

async function main() {
  // const argv = yargs(hideBin(process.argv)).argv;

  // console.log(argv);
  // return;
  try {
    const days = getNextDays(5);

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
