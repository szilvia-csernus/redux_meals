import { useCallback, useState } from "react";


const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false)

    const sendRequest = useCallback(async (configData, apply) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(configData.url,
                {
                    method: configData.method ? configData.method : 'GET',
                    headers: configData.headers ? configData.headers : {},
                    body: configData.body ? JSON.stringify(configData.body) : null,

                });

            if (response.ok) {
                setSuccess(true)
            } else {
                // throwing an error inside a promise will result in the promise to be rejected.
                throw new Error('Request failed!');
            }

            const data = await response.json();

            setIsLoading(false);

            apply(data)

        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);

    }, []);

    return { isLoading, success, error, sendRequest }
}

export default useHttp