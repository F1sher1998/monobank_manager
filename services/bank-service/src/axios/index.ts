import { HttpError } from "@common/src";
import axios from "axios";


export const receiveMonobankUserDetails = async (apiKey: string) => {
        const client = await axios.get(
                `https://api.monobank.ua/personal/client-info`,
                {headers: {'X-token': `${apiKey}`}
        });

        if(!client || client.status >= 400){
                throw new HttpError(404, 'Failed to retrieve data from Monobank')
        }

        return client.data
}