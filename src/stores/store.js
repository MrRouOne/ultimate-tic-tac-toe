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
    gameWithBot: null,
    isBotMotion: false,
    singleField: [],
    hoveredIndexes: [],
    swapSign() {
        this.sign = this.sign === 'cross' ? 'circle' : 'cross'
        this.signToArrays = this.signToArrays === this.defaultCrossSign ? this.defaultCircleSign : this.defaultCrossSign
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
    fillSingleField() {
        this.singleField = []
        const dimension = this.fieldSize * this.fieldSize
        for (let i = 0; i < dimension; i++) {
            this.singleField[i] = {}
            this.singleField[i].field = Array(dimension).fill([])
            this.singleField[i].sign = null
        }
    },

    setFieldSize(val = this.fieldSize) {
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
        this.hoveredIndexes = []
        this.isBotMotion = false
        this.fillSingleField()
    },

    botMotion() {
        const randomIndexes = this.gameWithBot === 'light'
            ? this.getRandomIndexesInSingleField()
            : this.getBestBotMove()
        if (randomIndexes !== null) {
            this.setSignToSingleField(randomIndexes[0], randomIndexes[1], false);
        }
    },

    getBestBotMove() {
        const activeIndexes = this.getActiveFieldIndex();
        let clonedField = JSON.parse(JSON.stringify(this.singleField));

        for (let mainIndex of activeIndexes) {
            for (let subIndex = 0; subIndex < this.fieldSize * this.fieldSize; subIndex++) {
                if (this.isMoveValid(mainIndex, subIndex, clonedField)) {
                    return [mainIndex, subIndex];
                }
                clonedField = JSON.parse(JSON.stringify(this.singleField))
            }
        }

        return this.getRandomIndexesInSingleField();
    },

    isMoveValid(mainIndex, subIndex, clonedField) {
        if (!Array.isArray(this.singleField[mainIndex].field[subIndex])) {
            return false;
        }

        clonedField[mainIndex].field[subIndex] = this.defaultCircleSign;
        const botWins = this.checkWin(clonedField[mainIndex].field, subIndex, this.defaultCircleSign);
        if (botWins) {
            return true;
        }

        clonedField[mainIndex].field[subIndex] = this.defaultCrossSign;
        const opponentWins = this.checkWin(clonedField[mainIndex].field, subIndex, this.defaultCrossSign);
        return !!opponentWins;
    },


    getRandomIndexesInSingleField() {
        let stack = {}
        const activeFieldIndex = this.getActiveFieldIndex()
        for (let i = 0; i < activeFieldIndex.length; i++) {
            const randMainIndex = this.getRandomNumberExcluding(activeFieldIndex, Object.keys(stack))

            stack[randMainIndex] = []
            for (let j = 0; j < this.singleField[randMainIndex].field.length; j++) {
                const randSubIndex = this.getRandomNumberExcluding(this.getEmptyIndexes(this.singleField[randMainIndex].field, true), stack[randMainIndex])
                const cell = this.singleField[randMainIndex].field[randSubIndex]
                if (Array.isArray(cell)) {
                    return [randMainIndex, randSubIndex]
                }
                stack[randMainIndex].push(randSubIndex)
            }
        }
        return null
    },
    getRandomNumberExcluding(array, excludedNumbers) {
        const availableNumbers = array.filter(num => !excludedNumbers.includes(num));

        if (availableNumbers.length === 0) {
            return null;
        }

        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        return availableNumbers[randomIndex];
    },
    getActiveFieldIndex(obj = this.singleField, activeIndex = store.activeSubfieldIndex) {
        const activeCells = this.getEmptyIndexes(obj)
        return activeCells.includes(activeIndex) ? [activeIndex] : activeCells;
    },
    getNonActiveFieldIndex(obj = this.singleField) {
        return obj
            .map((value, index) => value.sign !== null ? index : -1)
            .filter(index => index !== -1)
    },

    getEmptyIndexes(obj = this.singleField, isArray = false) {
        if (isArray) {
            return obj
                .map((value, index) => Array.isArray(value) ? index : -1)
                .filter(index => index !== -1);
        } else {
            return obj
                .map((value, index) => value.sign === null ? index : -1)
                .filter(index => index !== -1);
        }
    },

    getArraySingleField(obj = this.singleField) {
        return Object.values(obj).map(item => item.sign !== null ? item.sign : []);
    },
    setSignToSingleField(mainIndex, subIndex, isMainField = false, value = this.signToArrays) {
        if (isMainField && this.singleField[mainIndex].sign !== null) return;
        if (!isMainField && this.singleField[mainIndex].field[subIndex].length !== 0) return;

        if (isMainField) {
            this.singleField[mainIndex].sign = value;
        } else {
            this.singleField[mainIndex].field[subIndex] = value;
        }

        this.checkWinInSingleField(isMainField, mainIndex, subIndex, value);
    },
    checkWinInSingleField(isMainField, mainIndex, subIndex, value) {
        const fieldToCheck = isMainField ? this.getArraySingleField() : this.singleField[mainIndex].field;
        const index = isMainField ? mainIndex : subIndex
        const findSign = isMainField ? this.singleField[mainIndex].sign : value;

        const drawOnly = findSign === this.defaultDrawSign && isMainField;
        const winner = this.checkWinOrDraw(fieldToCheck, index, findSign, drawOnly, isMainField);

        if (winner === 'nothing') return

        const winSign = winner === 'draw' ? this.defaultDrawSign : findSign;
        if (isMainField) {
            this.setWinner(winSign);
        } else {
            this.setSignToSingleField(mainIndex, subIndex, true, winSign);
        }
    },
    swapBotGame() {
        this.gameWithBot = this.gameWithBot === null ? 'light' : (this.gameWithBot === 'light' ? 'medium' : null)
        this.swapRestart()
    },
    setHoveredIndexes(index = null, isHovered = false) {
        this.hoveredIndexes = isHovered ? this.getActiveFieldIndex(this.singleField, index) : []
    }
})