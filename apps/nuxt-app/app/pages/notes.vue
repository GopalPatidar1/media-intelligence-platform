<template>
    <div class="container">
        <h1>Notes App</h1>

        <!-- 🔍 Search -->
        <input v-model="searchText" placeholder="Search Note" />

        <!-- ➕ Add Note -->
        <input v-model="note" placeholder="Enter note" />
        <button @click="addNote">Add</button>

        <!-- 📋 Notes List -->
        <ul>
            <li v-for="(n, i) in filteredNotes" :key="i">
                {{ n }}
                <button @click="removeNote(i)">❌</button>
            </li>
        </ul>
    </div>
</template>
<script setup>

const searchText = ref("")
const note = ref("")
const notes = ref([])


onMounted(() => {
    const stored = localStorage.getItem("notes")
    if (stored) {
        notes.value = JSON.parse(stored)
    }
})


watch(notes, (newNotes) => {
    localStorage.setItem("notes", JSON.stringify(newNotes))
}, { deep: true })


const addNote = () => {
    if (!note.value.trim()) return
    notes.value.push(note.value)
    note.value = ""
}


const removeNote = (index) => {
    notes.value.splice(index, 1)
}


const filteredNotes = computed(() => {
    return notes.value.filter(n =>
        n.toLowerCase().includes(searchText.value.toLowerCase())
    )
})
</script>

<style>
.container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 300px;
    margin: 40px auto;
}

input {
    padding: 8px;
    font-size: 14px;
}

button {
    padding: 6px 10px;
    cursor: pointer;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
}
</style>