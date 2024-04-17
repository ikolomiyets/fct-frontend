import axios from 'axios';
import { useConfigStore } from '@/store/config';

const loadConfig = async () => {
    const configStore = useConfigStore();
    let config;
    try {
        const config = await axios.get('/etc/config.json');
        if (config.status !== 200) {
            console.log('Error loading config');
        } else {
            configStore.storeConfig(config.data);
        }
    } catch (e) {
        console.log(e);
    }

    while(configStore.clientId === null) // define the condition as you like
        await new Promise(resolve => setTimeout(resolve, 1000));

    return config;
}

export {
    loadConfig
}