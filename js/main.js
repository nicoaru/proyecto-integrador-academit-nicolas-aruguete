
// Manejo del Modal del index //
// Manejo del Modal del index //

const collageModal = document.getElementById('collageModal');
const collageCloseModalBtn = document.getElementById('closeModalBtn')
const collageModalImg = document.querySelector('#collageModal img')
const collageImgDivs = document.querySelectorAll('.collageRow img');

const showModal = (imgUrl) => {
    collageModal.children[1].children[0].src = imgUrl;
    collageModal.dataset.show = 'true';
}

const closeModal = () => {
    collageModal.dataset.show = 'false';
}

collageImgDivs.forEach(elem => {
    const imgUrl = elem.src;
    elem.onclick = () => showModal(imgUrl);
})

collageCloseModalBtn.onclick = closeModal;