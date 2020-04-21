import Cleanup from '@/types/Cleanup'
import {UserLevel} from '@/types/UserLevel'
import UserLevelRule from '@/types/UserLevelRule'

export default class LevelCalculator {

  static RULES: UserLevelRule[] = [
    {
      level: UserLevel.SEED,
      minCleanups: 0,
      minWeight: 0
    }, {
      level: UserLevel.SPROUT,
      minCleanups: 10,
      minWeight: 25
    }, {
      level: UserLevel.BUSH,
      minCleanups: 20,
      minWeight: 50
    }, {
      level: UserLevel.TREE,
      minCleanups: 40,
      minWeight: 100
    }
  ]

  static getUserLevelAndPercentage(cleanups: Cleanup[]): [UserLevel, number] {
    const userCleanups = cleanups.length
    const userWeight = cleanups.reduce((acc, c) => acc + c.weight, 0)

    let applyingRule
    let nextRule

    for (let i = 0; i < this.RULES.length; i++) {
      if (userCleanups >= this.RULES[i].minCleanups && userWeight >= this.RULES[i].minWeight) {
        applyingRule = this.RULES[i]
        nextRule = this.RULES[i + 1]
      }
    }

    if (!nextRule) {
      return [UserLevel.TREE, 100]
    }

    const computeCleanups = Math.min(userCleanups, nextRule.minCleanups)
    const computeWeight = Math.min(userWeight, nextRule.minWeight)

    const userPercentage = (computeCleanups + computeWeight) * 100 / (nextRule.minCleanups + nextRule.minWeight)

    return [applyingRule.level, userPercentage]
  }

}
