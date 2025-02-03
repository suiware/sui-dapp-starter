/**
 * Convert the numeric emoji index to the unicode representation of the corresponding animal emoji.
 *
 * Animal emojis are represented by the range [1F400-1F43F] https://apps.timwhitlock.info/unicode/inspect/hex/1F400-1F43F
 * The corresponding demo Move package chooses a number from the range [1,64] randomly,
 * and we convert it to the corresponding animal emoji.
 *
 * @param index
 * @returns
 */
export const numToAnimalEmoji = (index: number) => {
  const lowestRangeCode = Number('0x1F400')
  const codePoint = lowestRangeCode + (index - 1)
  return String.fromCodePoint(codePoint)
}
