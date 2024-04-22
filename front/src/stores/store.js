import {reactive} from 'vue'

export const store = reactive({
    fieldSize: 3,
    winner: null,
    winIndexes: [],
    activeSubfieldIndex: null,
    sign: 'cross',
    signToArrays: 'x',
    defaultCrossColor: '#bf1919',
    defaultCircleColor: '#167dd1',
    defaultDrawColor: '#dfc31d',
    defaultCrossSign: 'x',
    defaultCircleSign: 'o',
    defaultDrawSign: '-',
    restart: false,
    swapSign() {
        this.sign = this.sign === 'cross' ? 'circle' : 'cross'
        this.signToArrays = this.sign === 'cross' ? this.defaultCircleSign : this.defaultCrossSign
    },
    getDefaultColorBySign(sign = this.sign) {
        const values = {
            cross: this.defaultCrossColor,
            circle: this.defaultCircleColor,
            draw: this.defaultDrawColor,
        };
        return values[sign]
    },
    getSignWordBySign(sign) {
        const values = {
            [this.defaultDrawSign]: 'draw',
            [this.defaultCrossSign]: 'cross',
            [this.defaultCircleSign]: 'circle',
        };
        return values[sign] ?? sign
    },
    getMaxNumberSignsForWin() {
        return Math.min(5, this.fieldSize)
    },
    checkWinOrDraw(matrix, changedIndex, findSign, isDrawOnly = false, needSetWinIndexes = false) {
        if (!isDrawOnly) {
            const isWin = this.checkWin(matrix, changedIndex, findSign, needSetWinIndexes)
            if (isWin) return 'win';
        }
        const isDraw = !matrix.some(cell => cell.length === 0);
        return isDraw ? 'draw' : 'nothing'
    },
    checkWin(matrix, changedIndex, findSign, needSetWinIndexes = false) {
        const changedIndexY = Math.floor(changedIndex / this.fieldSize)
        const changedIndexX = changedIndex - changedIndexY * this.fieldSize

        return (
            this.checkWinByLine(matrix, changedIndexX, changedIndexY, findSign, true, needSetWinIndexes)
            || this.checkWinByLine(matrix, changedIndexX, changedIndexY, findSign, false, needSetWinIndexes)
            || this.checkWinByDiagonal(matrix, changedIndexX, changedIndexY, findSign, true, needSetWinIndexes)
            || this.checkWinByDiagonal(matrix, changedIndexX, changedIndexY, findSign, false, needSetWinIndexes)
        )
    },
    checkWinByLine(matrix, x, y, findSign, isHorizontal = true, needSetWinIndexes = false) {
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

        const result = this.checkRowBySign(stack, findSign, this.getMaxNumberSignsForWin())
        if (result && needSetWinIndexes) this.setWinIndexes(stack, findSign)

        return result
    },
    checkWinByDiagonal(matrix, x, y, findSign, isDownUpDiagonal = true, needSetWinIndexes = false) {
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

        const result = this.checkRowBySign(stack, findSign, this.getMaxNumberSignsForWin())
        if (result && needSetWinIndexes) this.setWinIndexes(stack, findSign)

        return result
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
    setWinner(value) {
        this.winner = value
    },
    setWinIndexes(obj, sign) {
        this.winIndexes = Object.entries(obj)
            .filter(([key, value]) => value === sign)
            .map(([key, value]) => key)
    },
    setFieldSize(val) {
        this.fieldSize = val
        this.swapRestart()
    },
    swapRestart() {
        this.restart = !this.restart
        this.winner = null
        this.winIndexes = []
        this.activeSubfieldIndex = null
        this.sign = 'cross'
        this.signToArrays = 'x'
    }
})