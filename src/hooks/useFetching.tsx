import {useState} from "react";

export function useFetching<T>(callback: (...args: any[]) => T) : [(...args: any[]) => Promise<T | undefined>, boolean, string] {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    async function fetching(...args: any[]) {
        try{
            setIsLoading(true);
            setError('')
            return await callback(...args);
        }
        catch (error) {
            console.log(error)

            if(error instanceof Error)
                setError(error.message);
            else if(typeof error === 'string')
                setError(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    return [fetching, isLoading, error];
}