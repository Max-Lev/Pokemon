export interface IEncounters {
    location_area: {
        name: string;
        url: string;
    }
    version_details: {
        encounter_details: [
            {
                chance: number;
                condition_values: any[];
                max_level: number;
                method: {
                    name: string;
                    url: string;
                },
                min_level: number;
            }
        ],
        max_chance: number;
        version: {
            name: string;
            url: string;
        }
    }[]
}

export interface IGeneration {

    id: number;
    name: string;
    names:
    {
        language: { name: string; url: string; },
        name: string;
    }[],
    version_group: {
        name: string;
        url: string;
    }

}