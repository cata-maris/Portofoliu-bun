// hamburger
  const togglebtn = document.getElementsByClassName('btn-toggle')[0];
  const links = document.getElementsByClassName('navbar-li')[0];
  const bars = document.getElementsByClassName('span') [0];
  togglebtn.addEventListener('click', () => {
    links.classList.toggle('activ');
    bars.classList.toggle('activ');
    
    
  })
// smooth scrolling

$('#navbar a, .btn').on('click', function(event) {
  if (this.hash !== '') {
    event.preventDefault();

    const hash = this.hash;

    $('html, body').animate(
      {
        scrollTop: $(hash).offset().top - 100
      },
      1300
    );
  }
});