import {reactive} from 'vue'

export const store = reactive({
    sign: 'cross',
    swapSign() {
        this.sign = this.sign === 'cross' ? 'circle' : 'cross';
    }
})