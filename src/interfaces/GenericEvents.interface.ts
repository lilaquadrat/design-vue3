export default interface GenericEvents {
    [key: string]: (params?: Record<string, unknown>) => void;
}