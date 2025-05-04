document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentIndex = 0;
    
    function showImage(index) {
        galleryItems.forEach((item, i) => {
            item.style.display = i === index ? 'block' : 'none';
        });
    }
    
    function updateButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === galleryItems.length - 1;
    }
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        showImage(currentIndex);
        updateButtons();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        showImage(currentIndex);
        updateButtons();
    });
    

    showImage(0);
    updateButtons();

    function handleResize() {
        if (window.innerWidth < 600) {

            galleryItems.forEach(item => {
                item.style.display = 'block';
            });
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {

            showImage(currentIndex);
            prevBtn.style.display = 'inline-block';
            nextBtn.style.display = 'inline-block';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
});