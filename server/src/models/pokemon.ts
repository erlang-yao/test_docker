import { Type, Stats, Move, PokemonData } from '../types';
import { SPECIES, DEFAULT_SPECIES, COMMON_MOVES, TYPE_MOVES } from '../data/species';

export class Pokemon {
  name: string;
  species: string;
  type: Type;
  level: number;
  stats: Stats;
  exp: number;
  maxExp: number;
  moves: Move[];

  constructor(species: string, level: number) {
    const def = SPECIES[species] ?? DEFAULT_SPECIES;
    this.name = species;
    this.species = species;
    this.type = def.type;
    this.level = level;
    this.exp = 0;
    this.maxExp = 100;

    const bs = def.baseStats;
    this.stats = {
      hp: bs.hp + level * 3,
      maxHp: bs.maxHp + level * 3,
      attack: bs.attack + level,
      defense: bs.defense + level,
      speed: bs.speed + level,
    };

    this.moves = [];
    this.initMoves(def);
  }

  private initMoves(def: import('../data/species').SpeciesDef): void {
    this.moves.push({ ...COMMON_MOVES[0] });
    this.moves.push({ ...COMMON_MOVES[1] });

    const typeMove = TYPE_MOVES[this.type];
    if (typeMove) {
      this.moves.push({ ...typeMove });
    }

    if (def.specialMove) {
      this.moves.push({ ...def.specialMove });
    }
  }

  isFainted(): boolean {
    return this.stats.hp <= 0;
  }

  toData(): PokemonData {
    return {
      name: this.name,
      species: this.species,
      type: this.type,
      level: this.level,
      stats: { ...this.stats },
      exp: this.exp,
      maxExp: this.maxExp,
      moves: this.moves.map(m => ({ ...m })),
    };
  }

  static fromData(data: PokemonData): Pokemon {
    const p = Object.create(Pokemon.prototype);
    p.name = data.name;
    p.species = data.species;
    p.type = data.type;
    p.level = data.level;
    p.stats = { ...data.stats };
    p.exp = data.exp;
    p.maxExp = data.maxExp;
    p.moves = data.moves.map(m => ({ ...m }));
    return p;
  }
}
