document.addEventListener('DOMContentLoaded', () => {
    const timeEl = document.getElementById('time');
    const dateEl = document.getElementById('date');
    const toggleFormatBtn = document.getElementById('toggle-format');
    
    let is24HourFormat = true;
    
    function updateClock() {
        const now = new Date();
        
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        let ampm = '';
        
        if (!is24HourFormat) {
            ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
        }
        
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        
        const timeString = is24HourFormat 
            ? `${hours}:${minutes}:${seconds}`
            : `${hours}:${minutes}:${seconds} ${ampm}`;
        
        timeEl.textContent = timeString;
        
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = now.toLocaleDateString('es-ES', options);
    }
    
    toggleFormatBtn.addEventListener('click', () => {
        is24HourFormat = !is24HourFormat;
        updateClock();
    });
    
    updateClock();
    setInterval(updateClock, 1000);
});