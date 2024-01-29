export default interface ApiConfig {
    mode: 'custom' | 'live' | 'next'
    customEndpoints?: {
        api: string
        media: string
    },
    company: string
    project: string
}