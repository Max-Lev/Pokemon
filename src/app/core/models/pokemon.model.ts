import { IEncounters, IGeneration } from './pokemon-encounters.model';
import { IAbilities, IForms, IGameIndices, IHeldItems, IMoves, IPastTypes, IPokemonIdResponse, ISprites, IStats, ITypes } from './pokemon-id.model';

export interface IGetPokemonsListResponse {
    count: number;
    next: string;
    previous: string;
    results: IPokemonName[];
}

export interface IPokemonName {
    name: string;
    url: string;
}

export class PokemonsContainer {
    pokemons: PokemonModel[];
    constructor() {
        this.pokemons = [];
    }
}

export class PokemonModel implements IPokemonIdResponse {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: IAbilities[];
    forms: IForms[];
    game_indices: IGameIndices[];
    held_items: IHeldItems[];
    location_area_encounters: string;
    moves: IMoves[];
    species: { name: string; url: string; };
    sprites: ISprites;
    stats: IStats[];
    types: ITypes[];
    past_types: IPastTypes[];
    isFavorite?: boolean = false;
    disableAll?: boolean = false;
    encounters?: IEncounters[];
    version: IGeneration;
    constructor(pokemon: IPokemonIdResponse) {
        Object.assign(this, pokemon);
    }
}