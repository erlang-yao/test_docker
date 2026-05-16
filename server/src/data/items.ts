import { Item } from '../types';
import { STARTER_HEAL_POTION, STARTER_EXP_POTION, STARTER_REVIVE, HEAL_POTION_PERCENT, EXP_POTION_AMOUNT } from '../config';

export function createStarterItems(): Item[] {
  return [
    { name: '治疗药水', count: STARTER_HEAL_POTION, healAmount: 0, healPercent: HEAL_POTION_PERCENT, expAmount: 0, isRevive: false },
    { name: '经验药水', count: STARTER_EXP_POTION, healAmount: 0, healPercent: 0, expAmount: EXP_POTION_AMOUNT, isRevive: false },
    { name: '复活药剂', count: STARTER_REVIVE, healAmount: 0, healPercent: 0, expAmount: 0, isRevive: true },
  ];
}
