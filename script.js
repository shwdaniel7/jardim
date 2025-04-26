document.addEventListener('DOMContentLoaded', function() {

    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = musicToggle.querySelector('i'); // Pega o ícone dentro do botão
    const backgroundMusic = document.getElementById('background-music');
    let isMusicPlaying = false;

    // Função para tocar ou pausar a música de fundo
    function toggleMusic() {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicIcon.classList.remove('fa-pause'); // Troca ícone para Play
            musicIcon.classList.add('fa-play');
            musicToggle.setAttribute('aria-label', 'Tocar Música');
        } else {
            // Tenta tocar a música (pode falhar se o usuário não interagiu com a página ainda)
            backgroundMusic.play().then(() => {
                // Sucesso ao tocar
                musicIcon.classList.remove('fa-play'); // Troca ícone para Pause
                musicIcon.classList.add('fa-pause');
                musicToggle.setAttribute('aria-label', 'Pausar Música');
            }).catch(error => {
                // Falha ao tocar (comum em autoplay bloqueado)
                console.log("Autoplay bloqueado. O usuário precisa clicar para iniciar a música.", error);
                // Mantém o ícone de Play, pois a música não começou
                isMusicPlaying = !isMusicPlaying; // Inverte o estado mesmo assim para a próxima tentativa
            });
        }
        isMusicPlaying = !isMusicPlaying; // Inverte o estado
    }

    // Adiciona o evento de clique ao botão
    musicToggle.addEventListener('click', toggleMusic);

    const sections = document.querySelectorAll('.tela'); //

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.2
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
            }
        });
    };

    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        intersectionObserver.observe(section);
    });

});
