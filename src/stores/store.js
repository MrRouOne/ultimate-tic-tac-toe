import {reactive} from 'vue'

export const store = reactive({
    fieldSize: 3,
    winner: null,
    singleField: [],
    currentSign: 'cross',
    lastMoveIndex: null,
    hoveredIndexes: [],

    botDifficulty: 'none',
    isBotMotion: false,
    botMotionTimeout: null,

    signEnums: {
        cross: {
            mainFieldSvg: {
                path: 'M412.861,78.976c3.404-6.636,2.831-14.159-0.15-20.404c0.84-7.106-1.02-14.321-7.746-19.855 c-6.262-5.151-12.523-10.305-18.781-15.457c-11.005-9.055-28.237-11.913-38.941,0c-48.619,54.103-99.461,105.856-152.167,155.725 c-39.185-36.605-78.846-72.713-118.223-108.868c-13.82-12.693-33.824-8.71-42.519,6.411c-12.665,6.286-22.931,14.481-31.42,28.468 c-4.042,6.664-3.727,15.076,0,21.764c25.421,45.578,74.557,85.651,114.957,122.529c-5.406,4.839-10.772,9.724-16.287,14.461 c-54.43,46.742-91.144,76.399-23.029,124.325c0.919,0.647,1.856,0.504,2.789,0.882c1.305,0.602,2.557,1.026,4.004,1.264 c0.45,0.017,0.87,0.093,1.313,0.058c1.402,0.114,2.774,0.471,4.195,0.192c36.621-7.18,70.677-35.878,101.576-67.48 c30.1,29.669,62.151,58.013,97.395,74.831c8.391,4.005,18.395,1.671,24.855-3.931c10.832,0.818,20.708-5.913,25.665-15.586 c0.734-0.454,1.207-0.713,2.002-1.21c15.748-9.838,17.187-29.431,5.534-42.936c-26.313-30.492-54.284-59.478-82.798-87.95 C316.426,196.043,380.533,141.939,412.861,78.976z',
                viewVox: '0 15 415 400',
            },
            mainFieldStyle: {
                backgroundColor: 'rgba(131,13,13,0.5)',
            },
            color: '#bf1919',
            word: 'cross',
        },
        circle: {
            mainFieldSvg: {
                path: 'M79.204,179.279c1.62,0.59,3.245,1.181,4.874,1.774l1.226,0.434l1.256,0.342l2.524,0.662 c3.351,0.987,6.826,1.413,10.289,1.954c1.736,0.2,3.487,0.254,5.236,0.368l2.627,0.135c0.883,0.014,1.776-0.019,2.665-0.033 c1.805-0.006,3.489-0.185,5.229-0.304c1.704-0.174,3.391-0.383,5.067-0.63c6.661-1.053,13.085-2.81,19.289-5.286 c6.194-2.479,12.167-5.7,17.66-9.757c5.486-4.047,10.476-8.965,14.499-14.561c4.023-5.585,7.074-11.805,8.88-18.077 c0.521-1.891,1.084-3.938,1.678-6.093c0.464-2.151,0.999-4.418,1.434-6.737c0.166-1.158,0.335-2.331,0.505-3.512 c0.16-1.182,0.361-2.386,0.4-3.558c0.066-1.182,0.133-2.367,0.199-3.548l0.078-1.772c-0.003-0.58-0.028-1.15-0.045-1.723 c-0.039-1.144-0.09-2.279-0.154-3.397c-0.036-0.559-0.071-1.114-0.107-1.665c-0.051-0.544-0.141-1.065-0.215-1.591 c-0.323-2.087-0.665-4.104-1.137-5.927c-0.539-1.783-1.134-3.418-1.795-4.846c-0.336-0.711-0.665-1.384-1.052-1.972 c-0.398-0.581-0.811-1.105-1.24-1.566c0.673,2.109,1.082,4.388,1.586,6.601c0.538,2.196,0.836,4.52,1.162,6.822 c-2.191-6.781-3.963-13.099-5.761-19.457c-1.019-3.085-1.867-6.301-3.117-9.246c-0.592-1.498-1.207-2.988-1.86-4.46 c-0.662-1.464-1.451-2.835-2.242-4.219c-1.631,0.802-2.454,1.18-5.099-2.126c0.917,1.858,1.998,3.924,3.147,6.104 c0.597,1.074,1.113,2.249,1.661,3.421c0.54,1.178,1.086,2.37,1.632,3.563c2.097,4.825,3.823,9.908,4.509,14.197l-2.625,0.719 c-1.534-3.935-2.98-8.899-4.721-13.757c-0.456-1.203-0.912-2.405-1.362-3.593c-0.461-1.183-0.899-2.367-1.444-3.446 c-1.043-2.189-2.11-4.228-3.213-5.953c-0.808,0.419-2.42,1.256-3.226,1.675c-0.764,0.388-2.71-3.05-4.617-6.513 c0.949,1.734,2.419,4.31,3.813,6.933c1.312,2.672,2.623,5.344,3.497,7.123c-0.825,0.378-2.476,1.136-3.3,1.514 c-0.817,0.37-2.526-3.079-4.228-6.546c-1.585,0.8-5.022-1.647-4.028,2.092c1.638,3.373,3.388,6.699,4.766,10.152 c-1.597-3.361-3.534-6.078-5.285-8.313c-0.443-0.557-0.869-1.086-1.307-1.577c-0.458-0.484-0.908-0.937-1.347-1.361 c-0.88-0.847-1.721-1.575-2.516-2.189c-3.134-2.473-5.72-3.056-6.874-2.362c0.673,0.659,1.032,1.242,1.233,1.784 c0.182,0.548,0.197,1.057,0.219,1.562c0.041,1.012,0.074,2.011,1.339,3.354c-1.663-1.837-3.456-3.592-5.132-5.075 c1.403-0.68,2.834-1.343,1.929-3.426c-0.238-0.543-0.675-1.124-1.265-1.733c-0.589-0.612-1.403-1.117-2.289-1.697 c-0.897-0.556-1.887-1.155-2.957-1.69c-1.1-0.466-2.256-0.927-3.416-1.381c-0.581-0.223-1.159-0.461-1.74-0.668 c-0.594-0.167-1.182-0.333-1.759-0.496c-1.154-0.328-2.263-0.653-3.278-0.979c-2.056-0.527-3.766-0.959-4.709-1.579 c-1.472-0.501-2.482-0.69-3.058-0.934c-0.578-0.228-0.73-0.421-0.526-0.581c0.405-0.301,2.252-0.603,4.872-0.355 c0.657,0.05,1.363,0.105,2.108,0.162c0.744,0.073,1.537,0.108,2.331,0.299c1.599,0.318,3.313,0.686,5.058,1.083 c1.701,0.535,3.424,1.133,5.099,1.717c0.851,0.26,1.617,0.69,2.395,1.034c0.769,0.366,1.517,0.723,2.235,1.065 c-0.75-0.867-0.658-1.074-0.061-0.912c0.298,0.081,0.719,0.253,1.217,0.48c0.248,0.115,0.519,0.236,0.797,0.379 c0.268,0.16,0.549,0.329,0.837,0.502c2.308,1.383,5.052,3.066,5.528,2.399c0.518-0.745,1.041-1.488,1.321-2.393 c0.139-0.452,0.218-0.946,0.2-1.501c-0.032-0.535-0.166-1.125-0.438-1.793c-0.553-1.322-1.634-3.002-3.663-5.046 c-2.118-1.88-5.095-4.337-9.686-6.582c-2.233-1.285-1.994-2.154-1.068-2.913c0.918-0.76,2.545-1.382,2.846-2.237 c-0.966-0.326-1.909-0.729-2.901-0.978l-2.97-0.784c-1.989-0.496-3.969-1.068-6.012-1.327c-2.031-0.314-4.07-0.648-6.117-0.883 c-2.052-0.13-4.113-0.237-6.177-0.322c-8.244-0.09-16.618,0.973-24.674,3.447c-16.025,5.079-30.572,15.305-40.214,29.168 c-4.855,6.876-8.654,14.514-11.03,22.567c-2.325,8.069-3.286,16.428-2.995,24.62c0.738,16.404,6.951,32.352,17.123,44.118 C55.427,165.674,66.455,174.006,79.204,179.279z M73.036,108.653l0.016-0.996c0.002-0.333-0.013-0.668,0.059-0.99 c0.328-2.611,0.728-5.232,1.629-7.714c0.215-0.623,0.419-1.251,0.613-1.885c0.286-0.596,0.57-1.194,0.839-1.799 c0.46-1.252,1.224-2.35,1.859-3.522c0.288-0.606,0.704-1.132,1.099-1.67c0.391-0.541,0.773-1.09,1.147-1.648 c0.418-0.523,0.889-1.002,1.318-1.517l0.65-0.77l0.321-0.39l0.371-0.34c3.79-3.813,8.419-6.79,13.48-8.623 c0.305-0.149,0.629-0.242,0.958-0.317l0.975-0.265l1.944-0.569c0.67-0.1,1.337-0.212,2.004-0.335 c0.671-0.095,1.323-0.327,2.014-0.314c2.715-0.234,5.492-0.334,8.195,0.043c5.411,0.635,10.676,2.472,15.338,5.438 c7.339,4.819,12.976,12.312,15.379,20.807c0.44,2.035,0.785,4.03,1.001,5.958c0.047,0.371,0.113,0.747,0.15,1.112l0.04,1.065 l0.119,2.125c0.05,0.709-0.047,1.348-0.047,2.024l-0.022,1.001c0.003,0.338-0.004,0.669-0.064,0.973 c-0.188,1.24-0.228,2.535-0.552,3.659l-0.173,0.876c-0.043,0.299-0.106,0.586-0.213,0.848c-0.181,0.541-0.346,1.085-0.495,1.636 c-0.796,2.094-1.685,4.078-2.952,5.909c-1.289,1.819-2.818,3.567-4.652,5.224c-1.863,1.638-4.068,3.142-6.477,4.505 c-0.625,0.317-1.197,0.699-1.855,0.987l-1.935,0.92l-2.019,0.822c-0.671,0.281-1.385,0.484-2.071,0.742 c-2.786,0.935-5.697,1.647-8.497,2.065c-0.694,0.091-1.404,0.225-2.061,0.258c-0.666,0.055-1.353,0.147-1.952,0.142l-0.93,0.042 c-0.311,0.013-0.641-0.036-0.961-0.046c-0.644-0.037-1.288-0.062-1.934-0.075c-5.145-0.276-10.105-1.885-14.56-4.473 l-1.676-0.969c-0.513-0.395-1.033-0.779-1.561-1.154c-1.116-0.677-1.986-1.661-3.003-2.472c-0.532-0.386-0.911-0.925-1.368-1.386 l-1.354-1.409c-0.383-0.526-0.776-1.044-1.179-1.555c-0.395-0.516-0.852-0.993-1.152-1.573 c-2.879-4.336-4.789-9.267-5.537-14.465c-0.03-0.161-0.071-0.321-0.093-0.484l-0.023-0.496l-0.058-0.99 c-0.045-0.66-0.102-1.32-0.17-1.982L73.036,108.653z',
                viewVox: '33 30 150 160',
            },
            mainFieldStyle: {
                backgroundColor: 'rgba(14,83,136,0.5)',
            },
            color: '#167dd1',
            word: 'circle',
        },
        draw: {
            mainFieldSvg: {
                path: 'M394,154.174c-5.331-5.33-11.806-7.995-19.417-7.995H27.406c-7.611,0-14.084,2.665-19.414,7.995 C2.662,159.503,0,165.972,0,173.587v54.82c0,7.617,2.662,14.086,7.992,19.41c5.33,5.332,11.803,7.994,19.414,7.994h347.176 c7.611,0,14.086-2.662,19.417-7.994c5.325-5.324,7.991-11.793,7.991-19.41v-54.82C401.991,165.972,399.332,159.5,394,154.174z',
                viewVox: '0 0 400 400',
            },
            mainFieldStyle: {
                backgroundColor: 'rgba(163,163,19,0.7)',
            },
            color: '#dfc31d',
            word: 'draw',
        },
    },
    winEnum: {
        win: 'win',
        draw: 'draw',
        nothing: 'nothing'
    },
    botDifficultyEnum: {
        none: {
            nextDifficulty: 'light',
            word: 'none',
            style: {
                color: '#2ebacc',
            },
        },
        light: {
            nextDifficulty: 'medium',
            word: 'light',
            style: {
                color: '#2ecc71',
            },
        },
        medium: {
            nextDifficulty: 'none',
            word: 'medium',
            style: {
                color: '#cca72e',
            },
        },
    },

    // Геттеры
    getCurrentSign() {
        return this.currentSign
    },
    getSvgPathBySign(sign) {
        return this.signEnums?.[sign]?.mainFieldSvg?.path ?? ''
    },
    getSvgViewBoxBySign(sign) {
        return this.signEnums?.[sign]?.mainFieldSvg?.viewVox ?? ''
    },
    getDefaultColorBySign(sign) {
        return this.signEnums?.[sign]?.color ?? ''
    },
    getWinner() {
        return this.winner
    },
    getFieldSize() {
        return this.fieldSize
    },
    getWinIndexes() {
        const field = this.getSingleField()
        return Object.keys(field).filter(key => field[key].isWinIndex)
    },
    getLastMoveIndex() {
        return this.lastMoveIndex
    },
    getHoveredIndexes() {
        return this.hoveredIndexes
    },
    getBotDifficulty() {
        return this.botDifficulty
    },
    getIsBotMotion() {
        return this.isBotMotion
    },
    getMainFieldInSingleField() {
        return Object.values(this.getSingleField()).map(item => item.sign !== null ? item.sign : [])
    },
    getActiveMainFieldIndexes(lastMoveIndex = this.getLastMoveIndex()) {
        const activeCells = this.getIndexesByEmptyCondition()
        return activeCells.includes(lastMoveIndex) ? [lastMoveIndex] : activeCells
    },
    getSingleField(mainIndex = null, subIndex = null) {
        return mainIndex === null ? this.singleField : subIndex === null ? this.singleField?.[mainIndex] : this.singleField?.[mainIndex]?.field?.[subIndex]
    },

    // Сеттеры
    setWinner(value) {
        this.winner = value
    },
    setFieldSize(val = this.getFieldSize()) {
        this.fieldSize = val
        this.restart()
    },
    setLastMoveIndex(val) {
        this.lastMoveIndex = val
    },
    setIsBotMotion(val) {
        this.isBotMotion = val
    },
    setWinIndexes(obj, sign) {
        for (const key in obj) {
            if (obj[key] === sign && key in this.getSingleField()) {
                this.singleField[key].isWinIndex = true
            }
        }
    },
    setHoveredIndexes(index = null, isHovered = false) {
        this.hoveredIndexes = isHovered ? this.getActiveMainFieldIndexes(index) : []
    },
    fillSingleField() {
        this.singleField = []
        const dimension = Math.pow(this.getFieldSize(), 2)
        for (let i = 0; i < dimension; i++) {
            this.singleField[i] = {}
            this.singleField[i].field = Array(dimension).fill([])
            this.singleField[i].sign = null
            this.singleField[i].isWinIndex = false
        }
    },
    swapCurrentSign() {
        this.currentSign = this.getCurrentSign() === this.signEnums.cross.word
            ? this.signEnums.circle.word
            : this.signEnums.cross.word
    },
    swapBotGame() {
        this.botDifficulty = this.botDifficultyEnum?.[this.botDifficulty].nextDifficulty
        this.restart()
    },
    setSignToSingleField(mainIndex, subIndex = null, value = this.getCurrentSign()) {
        const isMainField = subIndex === null
        if (isMainField && this.getSingleField(mainIndex).sign !== null) return;
        if (!isMainField && !Array.isArray(this.getSingleField(mainIndex, subIndex))) return;

        if (isMainField) {
            this.singleField[mainIndex].sign = value
        } else {
            this.singleField[mainIndex].field[subIndex] = value
        }

        this.checkWinInSingleField(isMainField, mainIndex, subIndex, value)
    },
    moveInField(mainIndex, subIndex) {
        this.setSignToSingleField(mainIndex, subIndex)
        this.swapCurrentSign()
        this.setLastMoveIndex(subIndex)
        this.setHoveredIndexes()
    },

    restart() {
        this.currentSign = this.signEnums.cross.word
        this.winner = null
        this.lastMoveIndex = null
        this.hoveredIndexes = []
        this.isBotMotion = false
        this.fillSingleField()
        clearTimeout(this.botMotionTimeout)
        this.botMotionTimeout = null
    },

    // Чекеры
    isWinnerExist() {
        return this.getWinner() !== null
    },
    isGameWithBot() {
        return this.getBotDifficulty() !== this.botDifficultyEnum.none.word
    },

    // Хелперы
    getMaxNumberSignsForWin() {
        return Math.min(5, this.getFieldSize())
    },
    getRandomArrValueWithExcluding(array, exclude) {
        const availableNumbers = array.filter(num => !exclude.includes(num))

        if (availableNumbers.length === 0) {
            return null
        }

        const randomIndex = Math.floor(Math.random() * availableNumbers.length)
        return availableNumbers[randomIndex]
    },
    getIndexesByEmptyCondition(isEmpty = true, obj = this.getMainFieldInSingleField()) {
        return obj
            .map((value, index) => (isEmpty ? Array.isArray(value) : !Array.isArray(value)) ? index : -1)
            .filter(index => index !== -1)
    },
    getDeepClonedObj(obj) {
        return JSON.parse(JSON.stringify(obj))
    },

    // Алгоритм для победы
    checkWinOrDraw(matrix, changedIndex, findSign, isDrawOnly = false, needSetWinIndexes = false) {
        if (!isDrawOnly) {
            const isWin = this.checkWin(matrix, changedIndex, findSign, needSetWinIndexes)
            if (isWin) return this.winEnum.win
        }
        const isDraw = !matrix.some(cell => cell.length === 0)
        return isDraw ? this.winEnum.draw : this.winEnum.nothing
    },
    checkWin(matrix, changedIndex, findSign, needSetWinIndexes = false) {
        const fieldSize = this.getFieldSize()
        const changedIndexY = Math.floor(changedIndex / fieldSize)
        const changedIndexX = changedIndex - changedIndexY * fieldSize
        return (
            this.checkWinByLine(matrix, changedIndexX, changedIndexY, findSign, true, needSetWinIndexes)
            || this.checkWinByLine(matrix, changedIndexX, changedIndexY, findSign, false, needSetWinIndexes)
            || this.checkWinByDiagonal(matrix, changedIndexX, changedIndexY, findSign, true, needSetWinIndexes)
            || this.checkWinByDiagonal(matrix, changedIndexX, changedIndexY, findSign, false, needSetWinIndexes)
        )
    },
    checkWinByLine(matrix, x, y, findSign, isHorizontal = true, needSetWinIndexes = false, fieldSize = this.getFieldSize()) {
        const startIndex = isHorizontal
            ? Math.max(x - this.getMaxNumberSignsForWin() + 1, 0)
            : Math.max(y - this.getMaxNumberSignsForWin() + 1, 0)
        const endIndex = isHorizontal
            ? Math.min(this.getMaxNumberSignsForWin() + x - 1, fieldSize - 1)
            : Math.min(this.getMaxNumberSignsForWin() + y - 1, fieldSize - 1)
        let stack = {}
        for (let i = startIndex; i <= endIndex; i++) {
            const matrixIndex = isHorizontal
                ? y * fieldSize + i
                : i * fieldSize + x
            stack[`${matrixIndex}`] = matrix[matrixIndex]
        }

        const result = this.checkRowBySign(stack, findSign, this.getMaxNumberSignsForWin())
        if (result && needSetWinIndexes) this.setWinIndexes(stack, findSign)

        return result
    },
    checkWinByDiagonal(matrix, x, y, findSign, isDownUpDiagonal = true, needSetWinIndexes = false, fieldSize = this.getFieldSize()) {
        const diagonalLen = this.getDiagonalLen(x, y, isDownUpDiagonal)
        if (diagonalLen < this.getMaxNumberSignsForWin()) return false

        let stack = {}
        for (let i = 0; i < diagonalLen; i++) {
            const bottomIndexX = isDownUpDiagonal ? x - i : x + i
            const bottomIndexY = y + i
            const bottomMatrixIndex = bottomIndexX + bottomIndexY * fieldSize

            let setCondition = isDownUpDiagonal ? bottomIndexX >= 0 : x < fieldSize
            if (
                setCondition
                && bottomIndexY < fieldSize
                && matrix.includes(matrix[bottomMatrixIndex])
            ) {
                stack[`${bottomMatrixIndex}`] = matrix[bottomMatrixIndex]
            }

            const topIndexX = isDownUpDiagonal ? x + i : x - i
            const topIndexY = y - i
            const topMatrixIndex = topIndexX + topIndexY * fieldSize

            setCondition = isDownUpDiagonal ? topIndexX < fieldSize : topIndexX >= 0

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
    getDiagonalLen(x, y, isDownUp = true) {
        return isDownUp
            ? this.getDownUpDiagonalLen(x, y)
            : this.getUpDownDiagonalLen(x, y)
    },
    getDownUpDiagonalLen(x, y, fieldSize = this.getFieldSize()) {
        const sum = x + y
        return (sum < fieldSize)
            ? sum + 1
            : fieldSize * 2 - sum - 1
    },
    getUpDownDiagonalLen(x, y, fieldSize = this.getFieldSize()) {
        const min = Math.min(x, y)
        const max = Math.max(x, y)
        return fieldSize - max + min
    },
    checkRowBySign(obj, sign, count) {
        let rowCount = 0
        for (const key in obj) {
            if (obj[key] === sign) {
                rowCount++
                if (rowCount === count) {
                    return true
                }
            } else {
                rowCount = 0
            }
        }
        return false
    },

    checkWinInSingleField(isMainField, mainIndex, subIndex, value) {
        const field = this.getSingleField(mainIndex)
        const fieldToCheck = isMainField ? this.getMainFieldInSingleField() : field.field
        const index = isMainField ? mainIndex : subIndex
        const findSign = isMainField ? field.sign : value

        const drawOnly = findSign === this.signEnums.draw.word && isMainField
        const winner = this.checkWinOrDraw(fieldToCheck, index, findSign, drawOnly, isMainField)

        if (winner === this.winEnum.nothing) return

        const winSign = winner === this.winEnum.draw ? this.signEnums.draw.word : findSign
        if (isMainField) {
            this.setWinner(winSign)
        } else {
            this.setSignToSingleField(mainIndex, null, winSign)
        }
    },

    // Логика бота
    botMotion() {
        const randomIndexes = this.getBotDifficulty() === this.botDifficultyEnum.light.word
            ? this.getRandomIndexesInSingleField()
            : this.getBestBotMove()

        if (randomIndexes === null) return

        this.setIsBotMotion(true)
        this.botMotionTimeout = setTimeout(() => {
            const [randomMainIndex, randomSubIndex] = randomIndexes
            this.moveInField(randomMainIndex, randomSubIndex)
            this.setIsBotMotion(false)
        }, 500)
    },
    getBestBotMove() {
        const field = this.getSingleField()
        const activeIndexes = this.getActiveMainFieldIndexes()
        let clonedField = this.getDeepClonedObj(field)

        for (let mainIndex of activeIndexes) {
            for (let subIndex = 0; subIndex < Math.pow(this.getFieldSize(), 2); subIndex++) {
                if (this.isBestBotMoveValid(mainIndex, subIndex, clonedField)) {
                    return [mainIndex, subIndex]
                }
                clonedField = this.getDeepClonedObj(field)
            }
        }

        return this.getRandomIndexesInSingleField()
    },
    isBestBotMoveValid(mainIndex, subIndex, field) {
        if (!Array.isArray(field[mainIndex].field[subIndex])) {
            return false
        }

        field[mainIndex].field[subIndex] = this.signEnums.circle.word
        const botWins = this.checkWin(field[mainIndex].field, subIndex, this.signEnums.circle.word)
        if (botWins) {
            return true
        }

        field[mainIndex].field[subIndex] = this.signEnums.cross.word
        const opponentWins = this.checkWin(field[mainIndex].field, subIndex, this.signEnums.cross.word)
        return !!opponentWins
    },
    getRandomIndexesInSingleField() {
        const field = this.getSingleField()
        let stack = {}
        const activeFieldIndex = this.getActiveMainFieldIndexes()
        for (let i = 0; i < activeFieldIndex.length; i++) {
            const randMainIndex = this.getRandomArrValueWithExcluding(activeFieldIndex, Object.keys(stack))

            stack[randMainIndex] = []
            for (let j = 0; j < field[randMainIndex].field.length; j++) {
                const randSubIndex = this.getRandomArrValueWithExcluding(
                    this.getIndexesByEmptyCondition(true, field[randMainIndex].field),
                    stack[randMainIndex]
                )
                const cell = field[randMainIndex].field[randSubIndex]
                if (Array.isArray(cell)) {
                    return [randMainIndex, randSubIndex]
                }
                stack[randMainIndex].push(randSubIndex)
            }
        }
        return null
    },
})