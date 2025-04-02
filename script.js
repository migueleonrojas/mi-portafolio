/* ********** Menu ********** */
((d) => {
  const $btnMenu = d.querySelector(".menu-btn"),
   $menu = d.querySelector(".menu");

  $btnMenu.addEventListener("click", e => {
   $btnMenu.firstElementChild.classList.toggle("none");
   $btnMenu.lastElementChild.classList.toggle("none");
   $menu.classList.toggle("is-active");

  });

  d.addEventListener("click", e => {

   if(!e.target.matches(".menu a")) return false;

   $btnMenu.firstElementChild.classList.remove("none");
   $btnMenu.lastElementChild.classList.add("none");
   $menu.classList.remove("is-active");

  });
})(document);


/* ******* ContactForm ******** */
((d) => {
   const $form = d.querySelector(".contact-form"),
      $loader = d.querySelector(".contact-form-loader"),
      $response = d.querySelector(".contact-form-response");
   
   $form.addEventListener("submit", e => {
      e.preventDefault();
      $loader.classList.remove("none");
      fetch("https:formsubmit.co/ajax/migueleonrojas@gmail.com", {
         method: "POST",
         body: new FormData(e.target)
      })
      .then(res => res.ok ? res.json(): Promise.reject(res))
      .then(json => {
         console.log(json);
         location.hash = '#gracias';
         $form.reset();
         
      })
      .catch(err => {
         console.log(err);
         let message = err.statusText || "Ocurrió un error al enviar, intenta nuevamente-";
         $response.querySelector("h3").innerHTML = `Error ${err.status}: ${message}`;
      })
      .finally(() => {
         $loader.classList.add("none");
         setTimeout(
            () => {
               location.hash = '#close';
            }, 
            3000
         );
      });


      
   });
})(document);

/* Slider References */
const changeSlide = (direction) => {

   const d = document;

   const inputsChecks = d.querySelectorAll('input[name="slides"]');

   let currentIndexInputChecked = 0;

   inputsChecks.forEach((input, index) => {
      
      if(input.hasAttribute('checked')) {
         currentIndexInputChecked = index;
         input.removeAttribute('checked');
      } 
   });

   let newCurrentPosition = 0;

   if(direction === 'left') {
      newCurrentPosition = currentIndexInputChecked - 1;
   }

   else if(direction === 'right') {
      newCurrentPosition = currentIndexInputChecked + 1;
   }

   
   if(direction === 'right' && currentIndexInputChecked === inputsChecks.length - 1) newCurrentPosition = 0;

   if(direction === 'left' && currentIndexInputChecked === 0) newCurrentPosition = inputsChecks.length - 1;

   inputsChecks[newCurrentPosition].setAttribute('checked', true);


};
