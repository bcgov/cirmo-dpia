import axios from 'axios'

export async function getConfig() {
    
    const windowLocationOrigin = window.location.origin
    const processEnvBaseUrl = import.meta.env.BASE_URL
    const url = `${windowLocationOrigin}${processEnvBaseUrl}config/config.json`
    const headers = {
        'Accept': 'application/json',
        'ResponseType': 'application/json',
        'Cache-Control': 'no-cache'
    }
    const response = await axios.get(url, { headers }).catch(() => {
        return Promise.reject(new Error('Could not fetch config json'))
    })

    const exampleString = response.data['EXAMPLE_STRING']
    sessionStorage.setItem('EXAMPLE_STRING', exampleString)
    console.log('Got the example string')

}
