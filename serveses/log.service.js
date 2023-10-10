import chalk from 'chalk'
import dedent from 'dedent-js'
import { getCardinalDirection } from "./calculate.service.js"
import { getIcon } from './api.service.js'

export function PrintError(err)
{
    console.log(chalk.bgRed(' ERROR ') + ' ' + err)
}

export function PrintSuccess(msg)
{
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + msg)
}

export function PrintHelp()
{
    console.log(
        dedent`${chalk.bgBlue(' HELP ')}
        Без параметров - вывод погоды
        -s [CITY]  для установки города
        -h  для вывода помощи
        -t [API_KEY] для сохранения токена
        `)
}

export async function printWeather(data) 
{
    console.log(dedent`${chalk.bgGreenBright(' ПОГОДА ')}
                        ${data.name} - ${await getIcon(data.weather[0].icon)} ${data.weather[0].description} ${data.main.temp} Cº
                        Ощущается как: ${data.main.feels_like} Cº
                        Давление: ${data.main.pressure} гПа
                        Влажность: ${data.main.humidity} %
                        Ветер: ${await getCardinalDirection(data.wind.deg)} - ${data.wind.speed} км/ч
                        `)
}