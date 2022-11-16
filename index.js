#!/usr/bin/env node

import clear from 'clear';
import chalk from 'chalk';
import countryList from 'country-list';

const { getCode } = countryList;

// get the argument as a string

const arr = process.argv.slice(2);
const countryName = arr[0]
let year = arr[1]


if (getCode(countryName) === undefined ) {      // if it's undefined it is not a well-formatted country name
    console.log(chalk.red("Please enter a well-formatted country name"));
} else {
    console.log(chalk.green(`The code of the country is : `) + chalk.bold(`${getCode(countryName)}`));
    if (year === undefined) {
        year = new Date().getFullYear()    // no year is specified so current year
        getData();
    } else {
        getData();      // the year is gonna be the second argument
    }
}


// // perform an HTTP request to the API

async function getData() {
    try {
        console.log(chalk.red("Fetching data ..."));
        const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${getCode(countryName)}`);
        const datas = await res.json();
        clear();
        console.log(chalk.greenBright("✔ Data fetched!"))
        // show the results (a list of holidays dates for the current year) in a readable way

        datas.forEach(data => {
        console.log(
            chalk.green(data.date),
            chalk.yellow(data.name),
            '- aka -',
            chalk.cyan(data.localName))
      });
    }
    catch(err) {
        console.log(err);
    }
}