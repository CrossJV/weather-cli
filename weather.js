#!/usr/bin/env node
import getArgs from "./helpers/args.js"
import { PrintError, PrintSuccess, PrintHelp, printWeather } from './serveses/log.service.js'
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from "./serveses/storage.service.js"
import { getWeather } from './serveses/api.service.js'


async function saveToken(token)
{
    if(!token.length)
    {
        PrintError('TOKEN NOT VALID')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        PrintSuccess(`TOKEN: ${token} - WAS SAVED`)
    } catch(e)
    {
        PrintError(e.message)
    } 
}

async function saveCity(city)
{
    if(!city.length)
    {
        PrintError('CITY NOT VALID')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        await getWeather(city)
        PrintSuccess(`CITY: ${city} - WAS SAVED`)
    } catch(e)
    {
        PrintError(e.message)
    }
}

async function getForcast() 
{
    try {
        const weather = await getWeather(await getKeyValue(TOKEN_DICTIONARY.city))
        await printWeather(weather)
                            
    } catch(e)
    {
        if(e?.response?.status == 404)
        {
            PrintError('CITY IS NOT VALID')
        }
        else if(e?.response?.status == 401)
        {
            PrintError('BAD TOKEN')
        }
        else
        {
            PrintError(e.message)
        }
    }
}

function initCLI()
{
    const args = getArgs(process.argv)

    if(args.h)
    {
        return PrintHelp()
    }
    if(args.s)
    {
        return saveCity(args.s)
    }
    if(args.t)
    {
        return saveToken(args.t)
    }
    return getForcast()
}

initCLI()