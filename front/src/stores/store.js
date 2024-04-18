import {reactive} from 'vue'

export const store = reactive({
    fieldSize: 3,
    sign: 'cross',
    signToArrays: 'x',
    defaultCrossColor: '#bf1919',
    defaultCircleColor: '#167dd1',
    defaultDrawColor: '#dfc31d',
    defaultCrossSign: 'x',
    defaultCircleSign: 'o',
    defaultDrawSign: '-',
    swapSign() {
        this.sign = this.sign === 'cross' ? 'circle' : 'cross'
        this.signToArrays = this.sign === 'cross' ? this.defaultCircleSign : this.defaultCrossSign
    },
    getDefaultColorBySign(sign = this.sign) {
        return sign === 'cross' ? this.defaultCrossColor : this.defaultCircleColor
    },
    getSignWordBySign(sign) {
        return sign === this.defaultCrossSign ? 'cross' : 'circle'
    },
    getMaxNumberSignsForWin() {
        return Math.min(5, this.fieldSize)
    },
    checkWin(matrix, changedIndex, findSign) {
        const changedIndexY = Math.floor(changedIndex / this.fieldSize)
        const changedIndexX = changedIndex - changedIndexY * this.fieldSize

        return (
            this.checkWinByLine(matrix, changedIndexX, changedIndexY, findSign, true)
            || this.checkWinByLine(matrix, changedIndexX, changedIndexY, findSign, false)
            || this.checkWinByDiagonal(matrix, changedIndexX, changedIndexY, findSign, true)
            || this.checkWinByDiagonal(matrix, changedIndexX, changedIndexY, findSign, false)
        )

    },
    checkWinByLine(matrix, x, y, findSign, isHorizontal = true) {
        const startIndex = isHorizontal
            ? Math.max(x - this.getMaxNumberSignsForWin() + 1, 0)
            : Math.max(y - this.getMaxNumberSignsForWin() + 1, 0)
        const endIndex = isHorizontal
            ? Math.min(this.getMaxNumberSignsForWin() + x - 1, this.fieldSize - 1)
            : Math.min(this.getMaxNumberSignsForWin() + y - 1, this.fieldSize - 1)
        let stack = {}
        for (let i = startIndex; i <= endIndex; i++) {
            const matrixIndex = isHorizontal
                ? y * this.fieldSize + i
                : i * this.fieldSize + x
            stack[`${matrixIndex}`] = matrix[matrixIndex]
        }
        return this.checkRowBySign(stack, findSign, this.getMaxNumberSignsForWin())
    },
    checkWinByDiagonal(matrix, x, y, findSign, isDownUpDiagonal = true) {
        const diagonalLen = this.getDiagonalLenByType(x, y, isDownUpDiagonal)
        if (diagonalLen < this.getMaxNumberSignsForWin()) return false

        let stack = {}
        for (let i = 0; i < diagonalLen; i++) {
            const bottomIndexX = isDownUpDiagonal ? x - i : x + i
            const bottomIndexY = y + i
            const bottomMatrixIndex = bottomIndexX + bottomIndexY * this.fieldSize

            let setCondition = isDownUpDiagonal ? bottomIndexX >= 0 : x < this.fieldSize
            if (
                setCondition
                && bottomIndexY < this.fieldSize
                && matrix.includes(matrix[bottomMatrixIndex])
            ) {
                stack[`${bottomMatrixIndex}`] = matrix[bottomMatrixIndex]
            }

            const topIndexX = isDownUpDiagonal ? x + i : x - i
            const topIndexY = y - i
            const topMatrixIndex = topIndexX + topIndexY * this.fieldSize

            setCondition = isDownUpDiagonal ? topIndexX < this.fieldSize : topIndexX >= 0

            if (
                topIndexY >= 0
                && setCondition
                && matrix.includes(matrix[topMatrixIndex])
            ) {
                stack[`${topMatrixIndex}`] = matrix[topMatrixIndex]
            }
        }
        return this.checkRowBySign(stack, findSign, this.getMaxNumberSignsForWin())
    },
    getDiagonalLenByType(x, y, isDownUp = true) {
        return isDownUp
            ? this.getDownUpDiagonalLen(x, y)
            : this.getUpDownDiagonalLen(x, y)
    },
    getDownUpDiagonalLen(x, y) {
        const sum = x + y
        return (sum < this.fieldSize)
            ? sum + 1
            : this.fieldSize * 2 - sum - 1
    },
    getUpDownDiagonalLen(x, y) {
        const min = Math.min(x, y)
        const max = Math.max(x, y)
        return this.fieldSize - max + min
    },
    checkRowBySign(obj, sign, count) {
        let rowCount = 0;
        for (const key in obj) {
            if (obj[key] === sign) {
                rowCount++;
                if (rowCount === count) {
                    return true;
                }
            } else {
                rowCount = 0;
            }
        }
        return false;
    },
})