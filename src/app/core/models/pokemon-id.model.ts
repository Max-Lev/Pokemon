
export interface IPokemonIdResponse {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: IAbilities[],
    forms: IForms[],
    game_indices: IGameIndices[],
    held_items: IHeldItems[],
    location_area_encounters: string;
    moves: IMoves[],
    species: { name: string; url: string; },
    sprites: ISprites,
    stats: IStats[],
    types: ITypes[],
    past_types: IPastTypes[]
}

export interface IForms {
    name: string;
    url: string;
}

export interface ISprites {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
    other: IOther;
    versions: IVersions;
}

export interface IGameIndices {
    game_index: number;
    version: {
        name: string;
        url: string;
    }
}

export interface IHeldItems {
    item: { name: string; url: string; };
    version_details: IVersionDetails[]
}

export interface IVersionDetails {
    rarity: number;
    version: {
        name: string;
        url: string;
    }
}

export interface IAbilities {
    is_hidden: boolean;
    slot: number;
    ability: {
        name: string;
        url: string;
    }
}

export interface IStats {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    }
}

export interface IMoves {
    move: {
        name: string;
        url: string;
    },
    version_group_details: IVersionGroupDetails[]
}

export interface ITypes {
    slot: number;
    type: {
        name: string;
        url: string;
    }
}

export interface IPastTypes {
    generation: {
        name: string;
        url: string;
    },
    types: [
        {
            slot: number;
            type: {
                name: string;
                url: string;
            }
        }
    ]
}

export interface IVersions {
    [generationKey: string]: {
        [key: string]: {
            back_default?: string;
            back_female?: string;
            back_shiny?: string;
            back_shiny_female?: string;
            front_default?: string;
            front_female?: string;
            front_shiny?: string;
            front_shiny_female?: string;
        }
    }
};

export interface IVersionGroupDetails {
    level_learned_at: number;
    version_group: {
        name: string;
        url: string;
    },
    move_learn_method: {
        name: string;
        url: string;
    }
}

export interface IOther {
    [key: string]: {
        front_default?: string;
        front_female?: string;
        front_shiny?: string;
        front_shiny_female?: string;
    }
}