import { Pokemon } from './pokemon';
import { Move } from '../types';
import { getTypeEffectiveness } from '../data/type-chart';
import {
  DAMAGE_BASE_MULTIPLIER, STAB_MULTIPLIER, MIN_DAMAGE_MULTIPLIER,
  MAX_DAMAGE_MULTIPLIER, MIN_DAMAGE,
  ESCAPE_BASE_CHANCE, ESCAPE_SPEED_MULTIPLIER, ESCAPE_MIN_CHANCE, ESCAPE_MAX_CHANCE,
  CATCH_LEVEL_FACTOR_BASE, CATCH_MIN_PROBABILITY, CATCH_MAX_PROBABILITY, MASTERBALL_CATCH_RATE,
} from '../config';

function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export function calculateDamage(
  attacker: Pokemon,
  defender: Pokemon,
  move: Move,
  randomFactor: number,
): number {
  const effectiveness = getTypeEffectiveness(move.type, defender.type);
  if (effectiveness <= 0) return 0;

  const stab = move.type === attacker.type ? STAB_MULTIPLIER : 1.0;
  const clampedRandom = clamp(randomFactor, MIN_DAMAGE_MULTIPLIER, MAX_DAMAGE_MULTIPLIER);
  const baseDamage = move.power * attacker.stats.attack / defender.stats.defense * DAMAGE_BASE_MULTIPLIER;

  let damage = Math.floor(baseDamage * stab * effectiveness * clampedRandom);
  if (damage < MIN_DAMAGE) damage = MIN_DAMAGE;
  return damage;
}

export function calculateEscapeChance(playerSpeed: number, enemySpeed: number): number {
  const rawChance = ESCAPE_BASE_CHANCE + (playerSpeed - enemySpeed) * ESCAPE_SPEED_MULTIPLIER;
  return clamp(rawChance, ESCAPE_MIN_CHANCE, ESCAPE_MAX_CHANCE);
}

export function calculateCatchProbability(
  hp: number,
  maxHp: number,
  level: number,
  ballRate: number,
  isMasterBall: boolean,
): number {
  if (isMasterBall) return MASTERBALL_CATCH_RATE;
  if (maxHp <= 0) return CATCH_MIN_PROBABILITY;

  const hpRatio = hp / maxHp;
  const baseRate = (1.0 - hpRatio) * 100.0;
  const levelFactor = 1.0 / (1.0 + level * CATCH_LEVEL_FACTOR_BASE);
  const rawProbability = baseRate * levelFactor * ballRate;
  return clamp(rawProbability, CATCH_MIN_PROBABILITY, CATCH_MAX_PROBABILITY);
}
