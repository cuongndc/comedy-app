import {acceptHMRUpdate, defineStore} from 'pinia'
import {ref} from 'vue'

export const useCategoryStore = defineStore('category', () => {
    /**
     * Current named of the user.
     */
    const cateSelected = ref('')
    const setCateSelected = (cate: string) => {
        cateSelected.value = cate
    }

    return {
        setCateSelected,
        cateSelected,
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot))