export default interface GenericEvents {
    [key: string]: (additionalData: string | undefined, mouseEvent: MouseEvent) => void;
}