document.addEventListener('DOMContentLoaded', () => {
    const countEl = document.getElementById('count');
    const incrementBtn = document.getElementById('increment');
    const decrementBtn = document.getElementById('decrement');
    const resetBtn = document.getElementById('reset');
    
    let count = 0;
    
    incrementBtn.addEventListener('click', () => {
        count++;
        countEl.textContent = count;
    });
    
    decrementBtn.addEventListener('click', () => {
        count--;
        countEl.textContent = count;
    });
    
    resetBtn.addEventListener('click', () => {
        count = 0;
        countEl.textContent = count;
    });
});