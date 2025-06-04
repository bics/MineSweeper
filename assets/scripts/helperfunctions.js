export class Helper
{
    isNull(...value)
    {
        //Code snippet taken from ChatGPT
        return value.some(v => v == null);
    }

    isNumber(...value)
    {
        return value.some(v => isNaN(v));
    }
}