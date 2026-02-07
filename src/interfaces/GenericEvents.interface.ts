import type { Ref } from 'vue';

export default interface GenericEvents {
    // eslint-disable-next-line no-unused-vars
    [key: string]: (additionalData: string | undefined, mouseEvent: MouseEvent, traceId: Ref) => void;
}