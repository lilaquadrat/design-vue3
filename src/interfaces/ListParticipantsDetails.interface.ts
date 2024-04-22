pexport default interface ListParticipantsDetails {
    used: number;
    categories: {
        id: string;
        used: number;
    }[];
}
