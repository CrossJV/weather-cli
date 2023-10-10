import { homedir } from 'os'
import fs from 'fs'
import { join, basename, dirname, extname, relative, isAbsolute } from 'path'

const filePath = join(homedir(), 'weather-data.json')

export const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city'
}

export async function saveKeyValue(key, value)
{
    let data = {}
    if(await isExist(filePath))
    {
        data = JSON.parse(await fs.promises.readFile(filePath))
    }

    data[key] = value 
    await fs.promises.writeFile(filePath, JSON.stringify(data))
}


export async function getKeyValue(key)
{
    if(await isExist(filePath))
    {
        const data = JSON.parse(await fs.promises.readFile(filePath))
        return data[key]
    }
    return undefined
}

async function isExist(path)
{
    try {
        await fs.promises.stat(path)
        return true
    } catch(e)
    {
        return false
    }
}