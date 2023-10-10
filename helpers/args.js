export default function getArgs(args)
{
    const res = {}
    const [exec, file, ...rest] = args
    rest.forEach((arg, index, arr) => {
        if(arg.charAt(0) == '-')
        {
            if(index == arr.length -1)
            {
                res[arg.substring(1)] = true
            }
            else if(arr[index + 1].charAt(0) != '-')
            {
                res[arg.substring(1)] = arr[index + 1]
            } else {
                res[arg.substring(1)] = true
            }
        }
    });
    return res
}